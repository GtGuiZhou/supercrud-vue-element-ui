<template>
    <div class="container">
        <div class="range between">
            <div>
                <el-button plain icon="el-icon-refresh" @click="refresh"></el-button>
                <el-button type="primary" plain @click="insertRow" v-if="isAuth('insert')" icon="el-icon-circle-plus">
                    新增
                </el-button>
                <el-button type="danger" plain @click="deleteSelection" :disabled="selection.length < 1"
                           icon="el-icon-delete-solid"
                           v-if="isAuth('delete')">删除选中
                </el-button>
            </div>
            <div>
                <el-input style="width: 300px" v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                <el-button type="success" plain icon="el-icon-search">搜索</el-button>
                <el-button type="warning" plain icon="el-icon-s-operation">筛选</el-button>
            </div>
        </div>

        <div class="range">
            <el-table
                    @sort-change="sortChange"
                    v-loading="loadingData"
                    @selection-change="onSelectionChange"
                    height="500"
                    ref="singleTable" :data="tableData" border highlight-current-row style="width: 100%">
                <el-table-column

                        v-if="tableConfig.selection"
                        type="selection"
                        width="55">
                </el-table-column>

                <template v-for="field in fields">
                    <slot :name="'table-col-' + field.name">
                        <el-table-column
                                sortable="custom"
                                :formatter="field.formatter"
                                :width="field.width"
                                v-if="isHideField(field.name)"
                                :key="field.name"
                                :prop="field.name"
                                :label="field.comment?field.comment:field.name"

                        >
                        </el-table-column>
                    </slot>
                </template>

                <el-table-column label="操作" width="180" v-if="tableConfig.actionColumn">
                    <template slot-scope="scope">
                        <el-button type="warning" plain @click="editRow(scope.row)" v-if="isAuth('edit')"
                                   icon="el-icon-edit" size="mini">编辑
                        </el-button>
                        <el-button type="danger" plain @click="deleteRow(scope.row)" v-if="isAuth('delete')"
                                   icon="el-icon-delete" size="mini">删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="range" style="text-align: center">
            <el-pagination
                    @size-change="size => setPagingSize(size)"
                    @current-change="index => setPagingIndex(index)"
                    :current-page="pagingIndex"
                    :page-sizes="[10, 20, 50, 100, 'all']"
                    :page-size="pagingSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagingTotal">
            </el-pagination>
        </div>

        <el-dialog :modal="false"  :visible.sync="visualForm">
            <div slot="title" style="border-bottom: 1px solid #e6e6e6;padding-bottom: 10px"><i  class="el-icon-document"/>{{formTitle}}</div>
            <crud-form :submit="formSubmit" :form-config="formConfig" :form-data="formData" :url="formUrl" :fields="fields" @submit-success="refresh"></crud-form>
            <div slot="footer" class="form-footer">
<!--                这里用云的动漫图-->
                <img src="../../assets/form_footer.jpg">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import Field from "./fields/field";
    import CrudForm from "./CrudForm";

    export default {
        name: "CrudIndex",
        components: {CrudForm},
        // components: {Field},
        props: {
            insertForm: {
                type: Object,
                default: () => ({})
            },
            editForm: {
                type: Object,
                default: () => ({})
            },
            table: {
                type: Object,
                default: () => ({})
            },
            fields: {
                default: []
            }
        },
        computed: {
            tableConfig() {
                let _default = {
                    pk: 'id',
                    selection: true,
                    actionColumn: true,
                    auth: ['insert', 'delete', 'edit'],
                    hideFields: [],
                    baseUrl: '',
                    getUrl: '',
                    insertUrl: '',
                    editUrl: '',
                    deleteUrl: ''
                }
                for (let key in this.table) {
                    _default[key] = this.table[key]
                }
                return _default
            },
            primaryFieldName () {
               return this.tableConfig.pk
            } ,
            baseUrl() {
                return this.tableConfig.baseUrl
            },
            getUrl() {
                return this.baseUrl + this.tableConfig.getUrl + '/page/' + this.pagingIndex + '/size/' + this.pagingSize
            },
            insertUrl() {
                return this.baseUrl + this.tableConfig.insertUrl
            },
            editUrl() {
                return this.baseUrl + this.tableConfig.editUrl
            },
            deleteUrl() {
                return this.baseUrl + this.tableConfig.deleteUrl + '/' + this.deleteRowIds
            }
        },
        data() {
            return {
                tableData: [],
                selection: [],
                searchContent: '',
                pagingIndex: 1,
                pagingSize: 10,
                pagingTotal: 0,
                loadingData: false,
                deleteRowIds: '',
                visualForm: false,
                formTitle: '',
                formUrl: '',
                formData: {},
                formConfig: {},
                formSubmit: null,
                order: {},
                where: {}
            }
        },
        mounted() {
            this.refresh()
        },
        methods: {
            // 刷新数据
            async refresh() {
                this.loadingData = true
                try {
                    const res = await this.$http.get(this.getUrl)
                    window.console.log(res)
                    this.tableData = res.data
                    this.pagingTotal = res.total
                } finally {
                    this.loadingData = false
                }
            },
            // 新增一行数据
            insertRow() {
                this.formTitle = '新增'
                this.formUrl = this.insertUrl
                this.formConfig = this.insertForm
                this.formSubmit = formData => {
                    return this.$http.post(this.insertUrl,formData)
                }
                this.visualForm = true
                let row = {}
                // 构造表单数据
                this.fields.forEach(field => {
                    // 填入默认值
                    row[field.name] = 'default' in field ? field.default : ''
                })
                this.formData = row
            },

            // 编辑指定行数据
            editRow(row) {
                this.formTitle = '编辑'
                this.formConfig = this.editForm
                this.formData = JSON.parse(JSON.stringify(row))
                this.formSubmit = formData => {
                    return this.$http.put(this.editUrl + '/' + this.formData[this.primaryFieldName],formData)
                }
                this.visualForm = true
            },

            // 删除指定行
            deleteRow(row) {
                this.deleteRowIds = row[this.primaryFieldName]
                return this.$http.delete(this.deleteUrl)
            },
            // 删除选中行
            deleteSelection() {
                this.deleteRowIds = this.selection.map(item => item[this.primaryFieldName]).join(',')
                return this.$http.delete(this.deleteUrl)
            },
            // 设置当前数据分页
            setPagingIndex(index) {
                this.pagingIndex = index
                this.refresh()
            },
            // 设置分页数据大小
            setPagingSize(size) {
                this.pagingSize = size
                this.refresh()
            },
            // 选中行改变
            onSelectionChange(selection) {
                this.selection = selection
            },
            // 排序改变
            sortChange(column,prop,order){
                order = order === 'descending' ? 'desc' : 'asc'
                this.order[prop] = order
            },

            // 组件方法
            isHideField(fieldName) {
                return !this.tableConfig.hideFields.some(item => {
                    return item === fieldName
                })
            },
            // 其他
            isAuth(authName) {
                return this.tableConfig.auth.some(item => authName === item)
            }
        }
    }
</script>

<style scoped>
    .range {
        border: 1px solid #e6e6e6;
        /*border-radius: 5px;*/
        margin:  10px 10px 0 10px;
        padding: 10px;
    }


    .container {
        display: flex;
        flex-direction: column;
        /*flex-wrap: wrap;*/
    }

    .form-footer{
        position: relative;
    }

    .form-footer img{
        position: absolute;
        height: 50px;
        width: 100%;
        bottom: 0;
        left: 0;
    }
</style>
