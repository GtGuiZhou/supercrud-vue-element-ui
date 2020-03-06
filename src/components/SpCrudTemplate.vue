<template>
    <div>
        <sp-card v-if="visualToolBar">
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button  plain icon="el-icon-refresh" @click="refreshTable" v-if="visualRefreshBtn"></el-button>
                    <el-button
                            v-auth="isAuth?['get-'+authUrl]:[]"
                            v-if="visualInsertBtn"
                            type="primary" plain @click="insert"
                            icon="el-icon-circle-plus">
                        新增
                    </el-button>
<!--                    todo: 批量删除-->
                    <slot name="toolbar-left"></slot>
                </div>
                <div v-if="visualSearch">
                    <slot name="toolbar-right"></slot>
                    <el-input style="width: 250px" v-model="searchContent" placeholder="请输入搜索内容" @keypress.enter.native="search"></el-input>
                    <el-button type="success" plain icon="el-icon-search" @click="search">搜索</el-button>
                </div>
            </div>
        </sp-card>

        <!--表格-->
        <el-table
                style="margin-bottom: 10px;overflow-x: auto"
                height="450px"
                :data="tableData"
                border
                starpe
                :selection="selection"
                v-loading="tableLoading"
        >
            <slot name="table"></slot>
            <el-table-column label="操作" v-if="visualActionColumn">
                <template slot-scope="scope">
                    <slot name="table-action-before" v-bind:row="scope.row" v-bind:$index="scope.$index" v-bind:store="scope.store" v-bind:column="scope.column"></slot>
                    <el-button v-if="visualTableUpdateBtn" type="warning" size="mini" plain
                               v-auth="isAuth?['put-'+authUrl+'/<id>']:[]"
                               @click="update(scope.row.id,scope.row)">编 辑
                    </el-button>
                    <el-button v-if="visualTableDeleteBtn" type="danger" size="mini" plain
                               v-auth="isAuth?['delete-'+authUrl+'/<id>']:[]"
                               @click="_delete(scope.row.id)">删 除
                    </el-button>
                    <slot name="table-action-after" v-bind:row="scope.row" v-bind:$index="scope.$index" v-bind:store="scope.store" v-bind:column="scope.column"></slot>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <sp-card style="text-align: center">
            <slot name="page" v-bind:page="{pageIndex,pageSizes,pageSize,pageTotal}">
                <el-pagination
                        @size-change="setPagingSize"
                        @current-change="setPagingIndex"
                        :current-page="pageIndex"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageTotal">
                </el-pagination>
            </slot>
        </sp-card>


        <!--        用v-if来防止上一次表单内容对下一次表单造成影响-->
        <el-dialog
                :title="formTitle"
                :visible.sync="visualForm"
                v-if="visualForm"
                :modal-append-to-body='false'

        >
            <el-form :model="submitForm" ref="form" :width="formWidth" :label-width="formLabelWidth">
                <slot name="form" v-bind:sForm="submitForm" v-bind:mode="formMode"></slot>
                <el-form-item>
                    <el-button :loading="submitLoading" type="primary" plain @click="submit">提 交</el-button>
                    <el-button type="warning" plain @click="clearSubmitForm">清 空</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import SpCard from "./SpCard";

    export default {
        name: "SpCrudTemplate",
        components: {SpCard},
        props: {
            selection: {
                type: Boolean,
                default: false
            },
            url: {
                type: String,
                required: true
            },
            pk: {
                type: String,
                default: 'pk'
            },
            where: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            form: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            visualTableUpdateBtn: {
                type: Boolean,
                default: true
            },
            visualTableDeleteBtn: {
                type: Boolean,
                default: true
            },
            visualRefreshBtn: {
                type: Boolean,
                default: true
            },
            visualInsertBtn: {
                type: Boolean,
                default: true
            },
            visualSearch: {
                type: Boolean,
                default: true
            },
            visualToolBar: {
                type: Boolean,
                default: true
            },
            visualActionColumn: {
                type: Boolean,
                default: true
            },
            formWidth: {
                type: String,
                default: '700px'
            },
            formLabelWidth: {
                type: String,
                default: '80px'
            },
            isAuth: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                tableData: [],
                visualForm: false,
                formMode: '', // insert,update
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 0,
                pageSizes: [10, 20, 50],
                searchContent: '',
                submit: null,
                submitForm: {},
                submitLoading: false,
                tableLoading: false
            }
        },
        computed: {
            formTitle() {
                if (this.formMode === 'insert') return '添加'
                if (this.formMode === 'update') return '更新'
                return ''
            },
            authUrl(){
                if (this.url.indexOf('/') === 0){
                    return this.url.slice(1,this.url.length)
                }
                return  this.url
            }
        },
        created() {

        },
        mounted() {
            this.refreshTable()
        },
        methods: {
            clearSubmitForm() {
                // window.console.log(this.$refs.form)
                this.$refs.form.resetFields()
            },

            async refreshTable() {
                this.tableLoading = true
                let where = JSON.stringify(this.where)
                this.$http.get(this.url + `?page=${this.pageIndex}&size=${this.pageSize}&search=${this.searchContent}&where=${where}`).then(
                    res => {
                        this.tableLoading = false
                        this.tableData = res.data
                        this.pageTotal = res.total
                    }).catch(
                    () => {
                        this.tableLoading = false
                    }
                )
            },

            insert() {
                this.submitForm = JSON.parse(JSON.stringify(this.form))
                this.visualForm = true
                this.formMode = 'insert'
                this.submit = async () => {
                    try {
                        this.submitLoading = true
                        await this.$http.post(this.url, this.submitForm)
                        this.visualForm = false
                        this.refreshTable()
                        this.$notify.success('新增成功')
                    } finally {
                        this.submitLoading = false
                    }
                }
            },

            update(id, row) {
                this.submitForm = JSON.parse(JSON.stringify(row))
                this.visualForm = true
                this.formMode = 'update'
                this.submit = async () => {
                    try {
                        this.submitLoading = true
                        await this.$http.put(this.url + '/' + id, this.submitForm)
                        this.visualForm = false
                        this.refreshTable()
                        this.$notify.success('修改完成')
                    } finally {
                        this.submitLoading = false
                    }
                }
            },
            async _delete(id) {
                await this.$http.delete(this.url + '/' + id)
                this.refreshTable()
                this.$notify.success('删除成功')
            },
            setPagingSize(size) {
                this.pageSize = size
                this.refreshTable()
            },
            setPagingIndex(index) {
                this.pageIndex = index
                this.refreshTable()
            },
            formFinish() {
                this.visualForm = false
                this.refreshTable()
            },
            search() {
                this.refreshTable()
            }
        }
    }
</script>

<style scoped>

</style>