<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <sp-card class="admin-info">
                    <div style="text-align: center">
                        <img class="avatar" :src="admin.avatar?admin.avatar:'image/avatar.png'">
                        <div class="username">{{admin.username}}</div>
                        <!--                        <div v-if="admin.role" class="warning-color">-{{admin.root === 'yes'?'超级管理员':admin.role.name}}-</div>-->
                        <el-tag v-if="admin.role" type="warning" effect="plain">- {{admin.root ===
                            'yes'?'超级管理员':admin.role.name}} -
                        </el-tag>
                    </div>

                    <label><small>邮箱</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input v-model="admin.email" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="updateEmail" size="mini" plain>修改</el-button>
                        </el-col>
                    </el-row>
                    <label><small>手机号</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input v-model="admin.phone" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="updatePhone" size="mini" plain>修改</el-button>
                        </el-col>
                    </el-row>
                    <label><small>密码</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input v-model="newPassword" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="updatePassword" size="mini" plain>修改</el-button>
                        </el-col>
                    </el-row>
                </sp-card>
            </el-col>

            <el-col :span="18">
                <sp-card>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane name="loginRecord" label="登录记录">
                            <login-record></login-record>
                        </el-tab-pane>
                    </el-tabs>
                </sp-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import SpCard from "../../../components/SpCard";
    import {mapState} from 'vuex'
    import LoginRecord from "./LoginRecord";

    export default {
        name: "Auth",
        components: {LoginRecord, SpCard},
        data() {
            return {
                newPassword: '',
                activeTab: 'loginRecord'
            }
        },
        computed: {
            ...mapState({admin: state => state.admin})
        },
        created() {

        },
        methods: {
            updatePhone() {
                this.$http.put('admin/phone', {phone: this.admin.phone}).then(
                    () => {
                        this.$notify.success('修改完成')
                    }
                )
            },

            updateEmail() {
                this.$http.put('admin/email', {password: this.admin.email}).then(
                    () => {
                        this.$notify.success('修改完成')
                    }
                )
            },

            updatePassword() {
                this.$http.put('admin/password', {password: this.newPassword}).then(
                    () => {
                        this.$notify.success('修改完成')
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .admin-info {
        color: #8c939d;
    }

    .avatar {
        width: 104px;
        height: 104px;
        border-radius: 50px;
    }

    .username {
        margin: 7px 0;
        color: rgba(0, 0, 0, .85);
        font-size: 25px;
        line-height: 28px;
        font-weight: bold;
    }


</style>