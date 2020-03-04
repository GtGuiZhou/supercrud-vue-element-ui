<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <sp-card class="admin-info">
                    <div style="text-align: center">
                        <img class="avatar" :src="admin.avatar?admin.avatar:'image/avatar.png'">
                        <div class="username">{{admin.username}}</div>
<!--                        <div v-if="admin.role" class="warning-color">-{{admin.root === 'yes'?'超级管理员':admin.role.name}}-</div>-->
                        <el-tag v-if="admin.role" type="warning" effect="plain">- {{admin.root === 'yes'?'超级管理员':admin.role.name}} -</el-tag>
                    </div>
                    <el-form label-position="top">
                        <el-form-item label="邮箱" >
                            <label>{{admin.email?admin.email:'暂无'}}</label>
                            <el-button type="info" @click="updateEmail" size="small" style="float: right" plain>修改</el-button>
                        </el-form-item>
                        <el-form-item label="手机号" >
<!--                            <el-input disabled v-model="admin.phone"  @click="updatePhone"></el-input>-->
                            <label>{{admin.phone?admin.phone:'暂无'}}</label>
                            <el-button type="info" @click="updateEmail" size="small" style="float: right" plain>修改</el-button>
                        </el-form-item>
                    </el-form>
                </sp-card>
            </el-col>

            <el-col :span="18" >
                <sp-card>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane name="loginRecord" label="登录记录">
                            <el-table :data="loginRecord" border height="500px">
                                <el-table-column label="ip" prop="ip"></el-table-column>
                                <el-table-column label="地址" prop="address"></el-table-column>
                                <el-table-column label="登录时间" prop="create_time" ></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </sp-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import SpCard from "../../components/SpCard";
    import {mapState} from 'vuex'
    export default {
        name: "Auth",
        components: {SpCard},
        data() {
            return {
                loginRecord: [],
                activeTab: 'loginRecord'
            }
        },
        computed: {
            ...mapState({admin:state => state.admin})
        },
        created() {
            this.$http.get('/admin/login-record').then(
                res => {
                    this.loginRecord = res
                }
            )
        },
        methods: {
            updatePhone(){

            },

            updateEmail(){}

        }
    }
</script>

<style scoped>
    .admin-info{
        color: #8c939d;
    }

    .avatar{
        width: 104px;
        height: 104px;
        border-radius: 50px;
    }

    .username{
        margin: 7px 0;
        color: rgba(0,0,0,.85);
        font-size: 25px;
        line-height: 28px;
        font-weight: bold;
    }


</style>