<template>
    <div >
        <sp-card>
            <el-button type="primary" @click="insert(rootRule)">添加规则</el-button>
        </sp-card>

        <div class="tree">
            <el-table
                    :data="rulesTree"
                    style="width: 100%;margin-bottom: 20px;height: 500px"
                    row-key="id"
                    border
                    default-expanded-all
                    :tree-props="{children: 'children'}">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="rule" label="规则"></el-table-column>
                <el-table-column prop="is_menu" label="菜单"></el-table-column>
                <el-table-column prop="icon" label="图标">
                    <template slot-scope="scope"><i :class="scope.row.icon"></i></template>
                </el-table-column>
                <el-table-column prop="order" label="排序"></el-table-column>
                <el-table-column label="操作" width="400">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.is_menu === 'yes'" type="primary" size="mini" plain
                                   @click="insert(scope.row)">添加子规则
                        </el-button>
                        <el-button v-if="scope.row.is_menu === 'yes'" type="success" size="mini" plain
                                   @click="insertCrud(scope.row)">添加增删查改
                        </el-button>
                        <el-button type="warning" size="mini" plain @click="update(scope.row,scope.$index)">编 辑
                        </el-button>
                        <el-button type="danger" size="mini" plain @click="_delete(scope.row)">删 除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>


        <el-dialog
                :title="formTitle"
                :visible.sync="visualForm"
                :append-to-body="true"
        >
            <rule-form v-if="visualForm" ref="form" @finish="formFinish"></rule-form>
        </el-dialog>
    </div>
</template>

<script>
    import RuleForm from "./Form";
    import SpCard from "../../../components/SpCard";

    export default {
        name: "Rule",
        components: {SpCard, RuleForm},
        data() {
            return {
                formTitle: '',
                visualForm: false,
                props: {
                    label: 'name',
                    children: 'children'
                },
                rule: {
                    pid: '',
                    name: '',
                    icon: '',
                    rule: '',
                    is_menu: 'no'
                },
                visualInsertForm: false,
                visualUpdateForm: false,
                filterText: '',
                rulesTree: [],
                url: '/admin/rule',
            }
        },
        computed: {
            rootRule() {
                return {id: 0, name: '根规则'}
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.refreshTable()
        },
        methods: {
            refreshTable() {
                this.$http.get('/admin/rule').then(
                    res => {
                        this.rulesTree = res
                    }
                )
            },

            filterMenuTree(treeList) {

                let result = []
                for (let tree of treeList) {
                    if (tree.is_menu === 'yes') {
                        let children = tree.children.length ? this.filterMenuTree(tree.children) : []
                        if (children.length > 0) {
                            result.push({
                                id: tree.id,
                                name: tree.name,
                                is_menu: tree.is_menu,
                                children
                            })
                        } else {
                            result.push({
                                id: tree.id,
                                name: tree.name,
                                is_menu: tree.is_menu,
                            })
                        }

                    }
                }

                return result
            },

            clickInsertRule(rule) {
                this.form = rule
            },

            clickUpdateRule() {
            },

            formFinish() {
                this.visualForm = false
                this.refreshTable()
                this.$refreshMenu()
            },

            _delete(row) {
                this.$http.delete('/admin/rule/' + row.id).then(
                    () => {
                        this.refreshTable()
                        this.$refreshMenu()
                    }
                )
            },

            insertCrud(row) {
                this.$prompt('请输入控制器名称', '提示').then(
                    async ({value}) => {
                        let controller = value
                        await this.$http.post('/admin/rule', {pid: row.id, rule: controller + '/insert', name: '增加'})
                        await this.$http.post('/admin/rule', {pid: row.id, rule: controller + '/delete', name: '删除'})
                        await this.$http.post('/admin/rule', {pid: row.id, rule: controller + '/read', name: '指定读'})
                        await this.$http.post('/admin/rule', {pid: row.id, rule: controller + '/index', name: '批量读'})
                        await this.$http.post('/admin/rule', {pid: row.id, rule: controller + '/update', name: '修改'})
                        this.refreshTable()
                    }
                )
            },

            insert(row) {
                this.visualForm = true
                this.formTitle = '新增'
                this.$nextTick(() => {
                    this.$refs.form.setPid(row.id).setRequest('post', '/admin/rule').setFinishCallback(this.formFinish)
                })
            },

            update(row) {
                this.visualForm = true
                this.formTitle = '编辑'
                this.$nextTick(() => {
                    this.$refs.form.setRequest('put', '/admin/rule/' + row.id).setPid(row.id).setForm(row).setFinishCallback(this.formFinish)
                })
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            }
        }
    }
</script>

<style scoped>

    .tree {
        width: 100%;
        height: 300px;
        /*padding: 10px;*/
        /*overflow-x: auto;*/
        /*overflow-y: auto;*/
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>