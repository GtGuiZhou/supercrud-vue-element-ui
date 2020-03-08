<template>
    <div>
        <sp-crud-template :url="url" :form="form"
                          :visual-table-update-btn="false" :visual-insert-btn="false" :visual-table-delete-btn="false"
        >
            <template v-slot:table>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="create_time" label="注册时间"></el-table-column>
            </template>
            <template  v-slot:table-action-before="{row}">
                <el-button   type="warning" plain size="mini" @click="updatePassword(row)" v-auth="['put-admin/user/<id>/password']">修改密码</el-button>
            </template>
            <template v-slot:form="{sForm,mode}">
                <el-form-item :prop="mode === 'insert'?'username':''"  label="用户名">
                    <el-input v-model="sForm.username" :disabled="mode === 'update'"></el-input></el-form-item>
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
                url: '/admin/user',
                roleArray: [],
                form: {
                    name: ''
                }
            }
        },
        computed: {},
        methods: {
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