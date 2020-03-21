<template>
    <div>
        <sp-crud-template :visual-import="false" :visual-export="false" :visual-export-all="false"
                          ref="crud" :url="url" :form="form" :where="where" table-action-width="340px">
            <template v-slot:table>
                <el-table-column prop="name" label="角色名称"></el-table-column>
            </template>
            <template v-slot:form="{sForm}">
                <el-form-item prop="name" label="角色名称">
                    <el-input v-model="sForm.name"></el-input>
                </el-form-item>
            </template>
            <template v-slot:table-action-before="{row}">
                <el-button type="primary" plain size="small" @click="updateMenu(row)" >菜单管理</el-button>
                <el-button type="primary" plain size="small" @click="updateRule(row)" >规则管理</el-button>
            </template>
        </sp-crud-template>

        <el-dialog
                :modal-append-to-body="false"
                :title="selectedRowName + '-菜单管理'"
                :visible.sync="visualMenu"
                v-if="visualMenu"
        >
            <sp-form
                    @submit-success="$refs.crud.refreshTable"
                    btn-position="center" :visual-clear-btn="false" :url="updateMenuUrl" method="put" :form="menuForm"
                    label-width="0px">
                <sp-card>
                    <el-tree
                            ref="menuTree"
                            node-key="path"
                            :default-checked-keys="defaultCheckMenu"
                            :data="menuList"
                            show-checkbox
                            @check-change="handleCheckChange"
                    >
                    </el-tree>
                </sp-card>
            </sp-form>
        </el-dialog>


        <el-dialog
                :modal-append-to-body="false"
                :title="selectedRowName + '-规则管理'"
                :visible.sync="visualRule"
                v-if="visualRule"
        >
            <sp-form
                    @submit-success="$refs.crud.refreshTable"
                    :submit-before="saveRuleBefore" btn-position="center" :visual-clear-btn="false"
                    :url="updateRuleUrl" method="put" :form="ruleForm" label-width="0px">
                <sp-card style="max-height: 500px;overflow-y: auto">
                    <sp-card v-for="(rules,group) in ruleTreeCheck" :key="group">
                        <div>
                            <label style="font-weight: bold;color: #e6a23c">{{group}}</label>
                            <span style="float: right">
                                <el-link @click="selectAllRule(group,true)" type="primary" >全选</el-link>
                                &nbsp;&nbsp;
                                <el-link @click="selectAllRule(group,false)" type="info" >全不选</el-link>
                            </span>
                        </div>
                        <el-checkbox  v-for="(rule,index) in rules" :key="index" v-model="rule.checked" @change="$forceUpdate()">{{rule.name}}</el-checkbox>
                    </sp-card>
                </sp-card>
            </sp-form>
        </el-dialog>
    </div>
</template>

<script>
    import SpCrudTemplate from "../../../components/SpCrudTemplate";
    import router from "../../../router/router";
    import {array_to_tree} from "../../../common/common";
    import SpForm from "../../../components/SpForm";
    import SpCard from "../../../components/SpCard";


    export default {
        name: "Index",
        components: { SpCard, SpForm, SpCrudTemplate},
        data() {
            return {
                where: {pid: 0},
                url: '/admin/role',
                form: {
                    name: '',
                },
                updateMenuUrl: '',
                menuForm: {
                    menu: []
                },
                visualMenu: false,
                updateRuleUrl: '',
                ruleForm: {
                    rule: []
                },
                ruleTree: {},
                ruleTreeCheck: {},
                visualRule: false,
                defaultCheckMenu: [],
                selectedRowName: ''
            }
        },
        computed: {
            menuList() {
                let root = router.find(item => item.name === 'admin-app')
                let menu = root.children.filter(node => {
                    return node.menu
                })

                menu = array_to_tree(menu, 'root', 'name', 'parent')

                return menu
            }
        },
        mounted() {
            this.$http.get('/admin/rule').then(
                res => {
                    this.ruleTree = res
                }
            )
        },
        methods: {


            selectAllRule(group,status) {
                this.ruleTreeCheck[group] = this.ruleTreeCheck[group].map(rule => {
                    rule.checked = status
                    return rule
                })
            },

            updateMenu(row) {
                this.selectedRowName = row.name
                this.updateMenuUrl = `/admin/role/${row.id}/menu`
                // 设置该角色已经拥有的菜单
                this.defaultCheckMenu = row.menu instanceof Array ? row.menu.map(node => {
                    return node.path
                }) : []
                this.visualMenu = true
            },

            saveRuleBefore() {
                this.ruleForm.rule = []
                for (let group in this.ruleTreeCheck) {
                    this.ruleTreeCheck[group].forEach(rule => {
                        if (rule.checked) {
                            this.ruleForm.rule.push({rule: rule.rule})
                        }
                    })
                }
            },

            updateRule(row) {
                this.selectedRowName = row.name
                this.updateRuleUrl = `/admin/role/${row.id}/rule`
                this.visualRule = true
                // 设置该角色已拥有的规则
                this.ruleTreeCheck = JSON.parse(JSON.stringify(this.ruleTree))
                for (let group in this.ruleTreeCheck) {
                    this.ruleTreeCheck[group] = this.ruleTreeCheck[group].map(rule => {
                        rule.checked = row.rule.findIndex(item => item.rule === rule.rule) >= 0
                        return rule
                    })
                }
            },


            handleCheckChange() {
                this.menuForm.menu = this.$refs.menuTree.getCheckedNodes(false, true).map(node => {
                    return {path: node.path}
                })
            },
        }
    }
</script>

<style scoped>

</style>