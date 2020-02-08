<template>
    <el-form>
        <el-form-item prop="role_id" label="所属角色">
            <br>
            <el-tree style="height: 150px;overflow-y: auto" @node-click="clickRoleNode"  default-expand-all node-key="id" :data="roleList" :props="{children:'children',label:'name'}" >
                <div class="custom-tree-node"  slot-scope="{node,data}">
                    <label>{{node.label}}</label>
                    <el-radio style="float: right" :label="data.id" v-model="form.role_id">选中</el-radio>
                </div>
            </el-tree>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input v-model="form.password"></el-input>
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
        name: "AdminForm",
        mixins: [
          FormMixin
        ],
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    role_id: ''
                },
                roleList: []
            }
        },
        mounted() {
            this.refreshRoleList();
        },
        methods: {
            clickRoleNode(node){
                this.form.role_id = node.id
            },

            refreshRoleList(){
                this.$http.get('/admin/childrenrole').then(
                    res => {
                        this.roleList = res.children
                    }
                )
            },

            setRoleId(roleId){
                this.form.role_id = roleId
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