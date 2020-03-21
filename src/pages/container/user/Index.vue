<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6" >
                <div class="new-add">
                    <label>总用户数</label>
                    <span>{{preview.total}}</span>
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="new-add">
                    <label>本月新增</label>
                    <span>{{preview.month_total}}</span>
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="new-add">
                    <label>本周新增</label>
                    <span>{{preview.week_total}}</span>
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="new-add">
                    <label>今日新增</label>
                    <span>{{preview.day_total}}</span>
                </div>
            </el-col>
        </el-row>
        <sp-crud-template :url="url" :form="form"
                          :visual-import="true"
                          :visual-table-update-btn="false" :visual-insert-btn="false" :visual-table-delete-btn="false"
        >
            <template v-slot:table>
                <el-table-column prop="avatar" label="头像" width="72">
                    <el-avatar :size="50" shape="square" :src="row.avatar" slot-scope="{row}"></el-avatar>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column align="center" label="封号" v-if="$auth(['put-admin/user/<id>/lock'])">
                    <sp-switch slot-scope="{row}" v-model="row.lock" :url="`/admin/user/${row.id}/lock`"></sp-switch>
                </el-table-column>
                <el-table-column prop="create_time" label="注册时间"></el-table-column>
            </template>
            <template v-slot:table-action-before="{row}">
                <el-button type="warning" plain size="mini" @click="updatePassword(row)"
                           v-auth="['put-admin/user/<id>/password']">修改密码
                </el-button>
            </template>
            <template v-slot:form="{sForm,mode}">
                <el-form-item :prop="mode === 'insert'?'username':''" label="用户名">
                    <el-input v-model="sForm.username" :disabled="mode === 'update'"></el-input>
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
                url: '/admin/user',
                roleArray: [],
                form: {
                    name: ''
                },
                preview: {
                    total:0,
                    month_total: 0,
                    week_total: 0,
                    day_total: 0
                }
            }
        },
        computed: {},
        created() {
            this.$http.get('/admin/user/preview').then(
                res => {
                    this.preview = res
                }
            )
        },
        methods: {
            updatePassword(row) {
                this.$prompt("请输入新密码", `修改${row.username}的密码`).then(
                    ({value, action}) => {
                        if (action === 'confirm') {
                            this.$http.put(`/admin/user/${row.id}/password`, {newPassword: value}).then(
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
    .new-add{
        margin: 10px 0;
        padding: 10px;
        background-color: #F2F6FC;
    }

    .new-add span{
        color: #F56C6C;
        float: right;
    }
</style>