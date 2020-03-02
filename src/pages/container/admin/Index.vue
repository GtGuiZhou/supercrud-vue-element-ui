<template>
    <div>
        <sp-crud-template :url="url" :form="form">
            <template v-slot:table>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="role.name" label="所属角色"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
            </template>
            <template v-slot:form="{sForm}">
                <el-form-item prop="role_id" label="所属角色">

                    <el-tree style="height: 150px;overflow-y: auto" @node-click="node => treeNodeClick(node,sForm)"
                             default-expand-all node-key="id" :data="roleList"
                             :props="{children:'children',label:'name'}">
                        <div class="custom-tree-node" slot-scope="{node,data}">
                            <label>{{node.label}}</label>
                            <el-radio style="float: right" :label="data.id" v-model="sForm.role_id">选中</el-radio>
                        </div>
                    </el-tree>

                </el-form-item>
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="sForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="sForm.password"></el-input>
                </el-form-item>
            </template>
        </sp-crud-template>
    </div>
</template>

<script>
    import table from '../../../mixin/admin/table'
    import AdminForm from "./Form";
    import SpCard from "../../../components/SpCard";
    import SpCrudTemplate from "../../../components/SpCrudTemplate";

    export default {
        name: "Rule",
        components: {SpCrudTemplate, SpCard, AdminForm},
        mixins: [table],
        data() {
            return {
                url: '/admin/childrenAdmin',
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
            treeNodeClick(node,form){
                // window.console.log(node)
              form.role_id = node.id
            },

            refreshRoleList() {
                this.$http.get('/admin/childrenrole').then(
                    res => {
                        this.roleList = res.children
                    }
                )
            },
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