|
h.jkipjn .m
<template>
    <div style="padding: 8px;">
        <div style="margin-bottom: 8px;padding: 8px;background-color: white">
            <el-button type="primary" @click="insert(rootRole)">添加角色</el-button>
        </div>

        <div class="tree">
            <el-table
                    :data="rolesTree"
                    style="width: 100%;margin-bottom: 20px;overflow-y: scroll"
                    row-key="id"
                    border
                    default-expand-all
                    :tree-props="{children: 'children'}">
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.is_menu === 'yes'" type="success" size="mini" plain
                                   @click="insert(scope.row)">添加子角色
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
            <rule-form v-if="visualForm" ref="form" ></rule-form>
        </el-dialog>
    </div>
</template>

<script>
    import RuleForm from "./Form";
    export default {
        name: "Rule",
        components: {RuleForm},
        data() {
            return {
                rootRole: {},
                formTitle: '',
                visualForm: false,
                filterText: '',
                rolesTree: [],
                url: '/admin/childrenRole',
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
                this.$http.get(this.url).then(
                    res => {
                        this.rootRole = res
                        this.rolesTree = res.children
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
                this.$http.delete(this.url + '/' + row.id).then(
                    () => {
                        this.refreshTable()
                        this.$refreshMenu()
                    }
                )
            },

            async insert(row) {
                this.visualForm = true
                this.formTitle = '新增'
                this.$nextTick(() => {
                    this.$refs.form.setPid(row.id).setRequest('post', this.url).setFinishCallback(this.formFinish)
                })
            },

            async update(row) {
                this.visualForm = true
                this.formTitle = '编辑'
                this.$nextTick(async () => {
                    let checkRule = await this.$http.get(this.url + '/' + row.id + '/rulesList')
                    checkRule = checkRule.map(rule => rule.id)
                    this.$refs.form.setRequest('put', this.url +'/' + row.id)
                        .setFinishCallback(this.formFinish)
                        .setPid(row.id).setForm(row).setCheckRule(checkRule)
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