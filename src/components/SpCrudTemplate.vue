<template>
    <div>
        <sp-card v-if="visualToolBar">
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button plain icon="el-icon-refresh" @click="refreshTable" v-if="visualRefreshBtn"></el-button>
                    <el-button
                            v-if="visualInsertBtn"
                            type="primary" plain @click="insert"
                            icon="el-icon-circle-plus">
                        新增
                    </el-button>
                    <slot name="toolbar-left"></slot>
                </div>
                <div v-if="visualSearch">
                    <slot name="toolbar-right"></slot>
                    <el-input style="width: 250px" v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                    <el-button type="success" plain icon="el-icon-search" @click="search">搜索</el-button>
                </div>
            </div>
        </sp-card>

        <!--表格-->
        <el-table
                style="margin: 10px 0;height: 450px;overflow-y: auto"
                :data="tableData"
                border
                starpe
                :selection="selection"
        >
            <slot name="table"></slot>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <slot name="table-action-before"></slot>
                    <el-button v-if="visualTableUpdateBtn" type="warning" size="mini" plain
                               @click="update(scope.row.id,scope.row)">编 辑
                    </el-button>
                    <el-button v-if="visualTableDeleteBtn" type="danger" size="mini" plain
                               @click="_delete(scope.row.id)">删 除
                    </el-button>
                    <slot name="table-action-after"></slot>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <sp-card style="text-align: center">
            <el-pagination
                    @size-change="setPagingSize"
                    @current-change="setPagingIndex"
                    :current-page="pageIndex"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal">
            </el-pagination>
        </sp-card>


<!--        用v-if来防止上一次表单内容对下一次表单造成影响-->
        <el-dialog
                :title="formTitle"
                :visible.sync="visualForm"
                v-if="visualForm"
                :append-to-body="true"
        >
            <el-form :model="submitForm" ref="form" :width="formWidth" :label-width="formLabelWidth">
                <slot name="form" v-bind:sForm="submitForm"></slot>
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
                }
            },
            form: {
                type: Object,
                default: () => {
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
            formWidth: {
                type: String,
                default: '700px'
            },
            formLabelWidth: {
                type: String,
                default: '80px'
            }
        },
        data() {
            return {
                tableData: [],
                formTitle: '',
                visualForm: false,
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 0,
                pageSizes: [10, 20, 50],
                searchContent: '',
                submit: null,
                submitForm: {},
                submitLoading: false
            }
        },
        computed: {},
        created() {
            this.refreshTable = this.$debounce(this.refreshTable,500)
        },
        mounted() {
            this.refreshTable()
        },
        methods: {
            clearSubmitForm(){
                window.console.log(this.$refs.form)
                this.$refs.form.resetFields()
            },

            async refreshTable() {
                let where = JSON.stringify(this.where)
                this.$http.get(this.url + `?page=${this.pageIndex}&size=${this.pageSize}&search=${this.searchContent}&where=${where}`).then(
                    res => {
                        this.tableData = res.data
                        this.pageTotal = res.total
                    }
                )
            },

            insert() {
                this.submitForm = JSON.parse(JSON.stringify(this.form))
                this.visualForm = true
                this.formTitle = '新增'
                this.submit = async () => {
                    try {
                        this.submitLoading = true
                        await this.$http.post(this.url, this.submitForm)
                        this.visualForm = false
                        this.refreshTable()
                        this.$notify.success('新增成功')
                    }finally {
                        this.submitLoading = false
                    }
                }
            },

            update(id, row) {
                this.submitForm = JSON.parse(JSON.stringify(row))
                this.visualForm = true
                this.formTitle = '编辑'
                this.submit = async () => {
                    try {
                        this.submitLoading = true
                        await this.$http.put(this.url + '/' + id, this.submitForm)
                        this.visualForm = false
                        this.refreshTable()
                        this.$notify.success('修改完成')
                    }finally {
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