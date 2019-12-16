<template>
    <div v-loading="loadingData" class="container">
        <div class="range between">
            <div>
                <el-button plain icon="el-icon-refresh" @click="refresh"></el-button>
                <el-button type="primary" plain @click="insertRow" v-if="isAuth('insert')">新增</el-button>
                <el-button type="danger" plain @click="deleteSelection" :disabled="selection.length < 1" v-if="isAuth('delete')">删除选中
                </el-button>
            </div>
            <div>
                <el-input style="width: 300px" v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                <el-button type="success" plain>搜索</el-button>
                <el-button type="warning" plain>筛选</el-button>
            </div>
        </div>

        <div class="range table">
            <el-table ref="singleTable" :data="tableData" border highlight-current-row style="width: 100%" >
                <el-table-column
                        v-if="tableConfig.selection"
                        type="selection"
                        width="55">
                </el-table-column>

                <template v-for="field in fields">
                    <slot :name="'table-col-' + field.name">
                        <el-table-column
                                v-if="!isHideField(field.name)"
                                :key="field.name"
                                :prop="field.name"
                                :label="field.comment?field.comment:field.name">
                        </el-table-column>
                    </slot>
                </template>

                <el-table-column label="操作" width="200" v-if="tableConfig.actionColumn">
                    <template slot-scope="scope">
                        <el-button type="warning" plain @click="editRow(scope.row)" v-if="isAuth('edit')">编辑</el-button>
                        <el-button type="danger" plain @click="deleteRow([scope.row])" v-if="isAuth('delete')">删除</el-button>
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

    </div>
</template>

<script>
    // import Field from "./fields/field";
    export default {
        name: "CrudIndex",
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
                    selection: true,
                    actionColumn: true,
                    auth: ['insert','delete','edit'],
                    hideFields: [],
                    baseUrl: '',
                    getUrl: '',
                    insertUrl: '',
                    editUrl: '',
                    deleteUrl:''
                }
                for (let key in this.table) {
                    _default[key] = this.table[key]
                }
                return _default
            },
            baseUrl() {
                return this.tableConfig.baseUrl
            },
            getUrl() {
                return this.baseUrl + this.tableConfig.getUrl + '/page/' + this.pagingIndex + '/size/' + this.pagingSize
            },
            insertUrl() {
                return this.baseUrl + this.tableConfig.insertUrl
            },
            editUrl(){
                return this.baseUrl + this.tableConfig.editUrl
            },
            deleteUrl(){
                return this.baseUrl + this.tableConfig.deleteUrl
            }
        },
        data() {
            return {
                tableData: [
                    {date: '2019/12/15 16:49:51', name: '郭涛', address: '贵州 毕节'},
                    {date: '2019/12/15 16:49:51', name: '郭涛', address: '贵州 毕节'},
                    {date: '2019/12/15 16:49:51', name: '郭涛', address: '贵州 毕节'},
                ],
                selection: [],
                searchContent: '',
                pagingIndex: 1,
                pagingSize: 10,
                pagingTotal: 0,
                loadingData: false
            }
        },
        methods: {
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
            insertRow() {

            },
            deleteRow(row) {
                return row
            },
            editRow(row) {
                return row
            },
            deleteSelection() {

            },
            setPagingIndex(index){
                this.pagingIndex = index
                this.refresh()
            },
            setPagingSize(size){
                this.pagingSize = size
                this.refresh()
            },

            // 组件方法
            isHideField(fieldName) {
                return this.tableConfig.hideFields.some(item => {
                    return item === fieldName
                })
            },
            // 其他
            isAuth(authName){
                return this.tableConfig.auth.some(item => authName === item)
            }
        }
    }
</script>

<style scoped>
    .range {
        border: 1px solid #e6e6e6;
        /*border-radius: 5px;*/
        margin: 10px ;
        padding: 10px;
    }

    .table{
        overflow: auto;
        height: 500px;
    }

    .container{
        display: flex;
        flex-direction: column;
        /*flex-wrap: wrap;*/
    }

</style>
