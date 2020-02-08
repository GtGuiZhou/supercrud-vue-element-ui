<template>
    <div>
<!--        <img class="background-image" src="../../assets/admin/login-background.jpg">-->
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-on:keypress.enter="onSubmit">
            <el-card class="login-card">
                <h2 class="title">登录</h2>
                <el-form-item prop="username" label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="form.password" show-password ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="验证码">
                    <div style="display: flex;align-items: center;justify-content: space-between" >
                        <el-input placeholder="请输入图形验证码的内容" v-model="form.captcha" @change="onSubmit()" style="width: 200px"></el-input>
                        <img style="border-radius: 5px;cursor: pointer" ref="captcha" src="/api/captcha/image" @click="refreshCaptcha">
                    </div>
                </el-form-item>
                <div style="text-align: center">
                    <el-button type="primary" @click="onSubmit" style="width: 300px">登陆系统</el-button>
                </div>
            </el-card>
        </el-form>

        <div class="footer">
            <!--            Power by <a href="http://www.guotao.pro">GtGuiZhou</a>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                rules: {
                    username: [{required: true,message: '必须填写用户名'}],
                    password: [{required: true,message: '必须填写密码'}],
                },
                form: {
                    username: 'superadmin',
                    password: 'cs123456'
                }
            }
        },
        methods: {
            refreshCaptcha(){
                this.$refs.captcha.setAttribute('src','/api/captcha/image?rand=' + Math.random())
            },

            onSubmit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$http.post('/admin/login',this.form).then(
                            res => {
                                localStorage.setItem('adminUsername',res.username)
                                this.$router.replace('/admin')
                            }
                        ).catch(
                            () => {
                                this.refreshCaptcha()
                            }
                        )
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .background-image{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .login-card {
        position: relative;
        z-index: 9999;
        width: 500px;
        margin: 100px auto;
    }

    .footer{
        text-align: center;
        width: 100%;
        color: gray;
    }

    .title{
        color: gray;
        margin: 20px;
        text-align: center;
    }

    .footer a{
        text-decoration: none;
        color: black;
    }
</style>


