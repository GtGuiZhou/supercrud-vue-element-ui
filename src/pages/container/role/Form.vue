<template>
    <el-form>
        <el-form-item prop="pid" label="父角色">
            <br>
            <el-tree style="height: 200px;overflow-y: auto" @node-click="clickRoleNode"  default-expand-all node-key="id" :data="roleList" :props="{children:'children',label:'name'}" >
                <div class="custom-tree-node"  slot-scope="{node,data}">
                    <label>{{node.label}}</label>
                    <el-radio style="float: right" :label="data.id" v-model="form.pid">选中</el-radio>
                </div>
            </el-tree>
        </el-form-item>
        <el-form-item prop="name" label="名字">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="包含规则">
            <br>
            <el-tree
                    ref="ruleTree"
                    :default-checked-keys="checkRule"
                    style="height: 200px;overflow-y: auto"  default-expand-all node-key="id"   show-checkbox :data="ruleList" :props="{children:'children',label:'name'}" >
                <div slot-scope="{node,data}">
                    <i v-if="data.is_menu ==='yes'" class="el-icon-menu"></i><label>{{node.label}}</label>
                </div>
            </el-tree>
        </el-form-item>
        <el-form-item>
            <div style="text-align: center">
                <el-button type="primary" :loading="submitLoading" @click="submit">提 交</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import FormMixin from '../../../mixin/admin/form'
    export default {
        name: "RoleForm",
        mixins: [
          FormMixin
        ],
        data() {
            return {
                checkRule: [],
                ruleList: [],
                roleList:[],
                form: {
                    name: '',
                    pid: '',
                    rules: []
                }
            }
        },
        watch:{
          "form.pid": function (val) {
                this.refreshRuleList(val)
          }
        },
        mounted() {
            this.refreshRoleList();
        },
        methods: {
            clickRoleNode(node){
                this.form.pid = node.id
            },

            setPid(pid){
                this.form.pid = pid
                return this
            },

            setCheckRule(rules){
                this.checkRule = rules
                return this
            },

            submitBefore(){
              this.form.rules =  this.$refs.ruleTree.getCheckedKeys()
            },

            refreshRuleList(roleId){
                this.$http.get('/admin/childrenRole/' + roleId + '/rulesTree').then(
                    res => {
                        this.ruleList = res
                    }
                )
            },

            refreshRoleList(){
                this.$http.get('/admin/childrenrole').then(
                    res => {
                        this.roleList = [res]
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>