<template>
    <div>
        <sp-crud-template :url="url" :form="form" >
            <template v-slot:table>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column align="center" label="超级管理员" v-auth="['put-admin/admin/<id>/password']" >
                    <sp-switch slot-scope="{row}" v-model="row.root" :url="`/admin/admin/${row.id}/root`" ></sp-switch>
                </el-table-column>
                <el-table-column  label="角色">
                    <template slot-scope="{row}">{{row.role ? row.role.name: ''}}</template>
                </el-table-column>
            </template>
            <template  v-slot:table-action-before="{row}">
                <el-button   type="warning" plain size="mini" @click="updatePassword(row)" v-auth="['put-admin/admin/<id>/password']">修改密码</el-button>
            </template>
            <template v-slot:form="{sForm,mode}">
                <el-form-item :prop="mode === 'insert'?'username':''"  label="用户名">
                    <el-input v-model="sForm.username" :disabled="mode === 'update'"></el-input></el-form-item>
                <el-form-item prop="password" label="密码" v-if="mode === 'insert'">
                    <el-input v-model="sForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="role_id" label="角色">
                    <el-select v-model="sForm.role_id" filterable>
                        <el-option
                                v-for="item in roleArray"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </template>
        </sp-crud-template>
    </div>
</template>

<script>
    import SpCrudTemplate from "../../../components/SpCrudTemplate";
    import SpSwitch from "../../../components/SpSwitch";

    export default {
        name: "Index",
        components: {SpSwitch, SpCrudTemplate},
        data() {
            return {
                // where: {pid: 0},
                url: '/admin/admin',
                roleArray: [],
                form: {
                    name: ''
                }
            }
        },
        computed: {},
        mounted() {
            this.refreshRole()
        },
        methods: {
            refreshRole(){
                this.$http.get('/admin/role/all').then(
                    res => {
                        this.roleArray = res
                    }
                )
            },

            updatePassword(row){
                this.$prompt("请输入新密码",`修改${row.username}的密码`).then(
                    ({value,action}) => {
                        if (action === 'confirm'){
                            this.$http.put(`/admin/admin/${row.id}/password`,{newPassword: value}).then(
                                () => {
                                    this.$notify.success('修改成功')
                                }
                            )
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>