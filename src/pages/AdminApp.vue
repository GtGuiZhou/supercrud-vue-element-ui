<template>
    <div>
        <router-view></router-view>
        <el-dialog title="登录提醒" :visible.sync="visualLoginConfirm" >
            <div style="text-align: center">
                <i class="iconfont icon-baoqian" style="color: #409EFF;font-size: 64px"></i>
                <h2>当前位置需要登录，请先登录</h2>
                <router-link to="/admin/login">
                    <el-button type="primary" >跳转登录</el-button>
                </router-link>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI);
    export default {
        name: "AdminApp",
        data() {
            return {
                visualLoginConfirm: false
            }
        },
        created(){
            // 重写401错误处理方法
            this.$http.err401 = () => {
                this.visualLoginConfirm = true
            }

            // 重写错误消息处理方法
            this.$http.errMsg = msg => {
                this.$notify.error(msg)
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
