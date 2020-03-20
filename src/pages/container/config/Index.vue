<template>
    <div >
        <sp-card>
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button plain icon="el-icon-refresh" @click="refreshConfig"></el-button>
                    <el-button type="primary" plain @click="save"
                               icon="el-icon-circle-plus">保存配置
                    </el-button>
                </div>
            </div>
        </sp-card>

        <sp-card >
            <el-tabs value="wechat" v-if="form">
                <el-tab-pane name="site" label="站点配置">
                    <site-config v-model="form.site"></site-config>
                </el-tab-pane>
                <el-tab-pane name="wechat" label="微信配置">
                    <wechat-config v-model="form.wechat"></wechat-config>
                </el-tab-pane>
            </el-tabs>
            <div style="text-align: center;margin-top: 50px" v-else>
                <small>抱歉,配置加载失败</small>
            </div>
        </sp-card>

    </div>
</template>

<script>
    import SiteConfig from "./SiteConfig";
    import SpCard from "../../../components/SpCard";
    import WechatConfig from "./WechatConfig";

    export default {
        name: "Index",
        components: {WechatConfig, SpCard, SiteConfig},
        data() {
            return {
                form: null
            }
        },
        computed: {},
        mounted() {
            this.refreshConfig()
        },
        methods: {
            insertQQGroup() {
                this.form.qq_group.push({name: '', url: ''})
            },
            deleteQQGroup(index) {
                this.form.qq_group.splice(index, 1)
            },
            refreshConfig() {
                this.$http.get('/admin/config').then(
                    res => {
                        this.form = res
                    }
                )
            },

            save() {
                this.$http.post('/admin/config', this.form).then(
                    () => {
                        this.refreshConfig()
                        this.$notify.success('配置更新完成')
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>