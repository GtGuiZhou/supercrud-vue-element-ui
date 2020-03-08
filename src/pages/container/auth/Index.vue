<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <sp-card title="个人信息" class="admin-info">
                    <div style="text-align: center">
                        <img class="avatar" :src="admin.avatar?admin.avatar:'image/avatar.png'">
                        <div class="username">{{admin.username}}</div>
                        <div v-if="admin.role" class="warning-color">-{{admin.root ===
                            'yes'?'超级管理员':admin.role.name}}-
                        </div>
                    </div>
                    <label><small>邮箱</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input disabled v-model="admin.email" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="selectUpdatePolicyType('email',admin.email)"
                                       size="mini" plain>修改
                            </el-button>
                        </el-col>
                    </el-row>
                    <label><small>手机号</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input disabled v-model="admin.phone" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="selectUpdatePolicyType('phone',admin.phone)" size="mini"
                                       plain>修改
                            </el-button>
                        </el-col>
                    </el-row>
                    <label><small>密码</small></label>
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <el-input  disabled v-model="newPassword" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" @click="selectUpdatePolicyType('password',admin.password)"
                                       size="mini" plain>修改
                            </el-button>
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

        <!--        用v-if来防止上一次表单内容对下一次表单造成影响-->
        <el-dialog
                title="请选择验证类型"
                :visible.sync="visualUpdatePolicy"
                v-if="visualUpdatePolicy"
                :modal-append-to-body='false'
                width="400px"
        >
            <div><el-button style="width: 100%;text-align: left"   @click="updatePolicy('password')" plain icon="el-icon-arrow-right">使用密码进行修改</el-button></div>
            <div><el-button style="width: 100%;text-align: left" v-if="admin.email"  @click="updatePolicy('email')" plain icon="el-icon-arrow-right">使用邮箱验证码进行修改</el-button></div>
            <div><el-button style="width: 100%;text-align: left" v-if="admin.phone"  @click="updatePolicy('phone')" plain icon="el-icon-arrow-right">使用手机验证码进行修改</el-button></div>
        </el-dialog>
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
                activeTab: 'loginRecord',
                visualUpdatePolicy: false,
                policyForm: { // 修改密码，邮箱，手机号用到的表单
                    credentials_type: '',
                    credentials_value: '',
                    update_type: '',
                    update_value: ''
                }
            }
        },
        computed: {
            ...mapState({admin: state => state.admin})
        },
        created() {

        },
        methods: {
            selectUpdatePolicyType(update_type, update_value) {
                this.policyForm.update_type = update_type
                this.policyForm.update_value = update_value
                this.visualUpdatePolicy = true
            },

            updatePolicy(credentials_type) {
                this.visualUpdatePolicy = false
                this.policyForm.credentials_type = credentials_type
                let title = '未知'
                switch (credentials_type) {
                    case 'password':
                        title = '请输入老密码'
                        break
                    case 'email':
                        title = '请输入邮箱验证码'
                        break
                    case 'phone':
                        title = '请输入手机验证码'
                        break
                }
                // 校验凭证
                this.$prompt("请输入", title).then(
                    ({value, action}) => {
                        if (action === 'confirm') {
                            this.policyForm.update_value = value
                            this.$http.get(`/admin/policy-check/${this.policyForm.credentials_type}/${this.policyForm.credentials_value}`, this.policyForm).then(
                                () => {
                                    this.$notify.success('校验成功')
                                }
                            )
                        }
                    }
                ).then(
                    // 保存修改
                    () => {
                        this.$prompt("请输入修改内容", '请输入修改内容').then(
                            ({value, action}) => {
                                if (action === 'confirm') {
                                    this.policyForm.update_value = value
                                    this.$http.put(`/admin/policy`, this.policyForm).then(
                                        () => {
                                            this.$notify.success('修改成功')
                                        }
                                    )
                                }
                            }
                        )
                    }
                )
            },
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