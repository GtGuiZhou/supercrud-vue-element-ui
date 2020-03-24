<template>
    <div>
        <sp-card>
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button size="mini" icon="el-icon-refresh" @click="refreshConfig"></el-button>
                    <el-button type="primary" size="mini" @click="save"
                               icon="el-icon-plus">保存配置
                    </el-button>
                </div>
            </div>
        </sp-card>

        <sp-card >
            <el-tabs value="site" >
                <el-tab-pane name="site" label="站点配置" class="config-pane">
                    <site-config v-model="form.site"></site-config>
                </el-tab-pane>
                <el-tab-pane name="wechat" label="微信配置">
                    <wechat-config v-model="form.wechat"></wechat-config>
                </el-tab-pane>
                <el-tab-pane name="cloudstore" label="云存储">
                    <cloud-store-config v-model="form.cloudstore.driver"></cloud-store-config>
                </el-tab-pane>
                <el-tab-pane name="pay" label="支付">
                    <pay-config v-model="form.pay"></pay-config>
                </el-tab-pane>
            </el-tabs>
        </sp-card>

    </div>
</template>

<script>
    import SiteConfig from "./SiteConfig";
    import SpCard from "../../../components/SpCard";
    import WechatConfig from "./WechatConfig";
    import CloudStoreConfig from "./CloudStoreConfig";
    import {deep_merge} from "../../../common/common";
    import PayConfig from "./PayConfig";

    export default {
        name: "Index",
        components: {PayConfig, CloudStoreConfig, WechatConfig, SpCard, SiteConfig},
        data() {
            return {
                form: {
                    site: {
                        name: '',
                        logo: '',
                        beian: ''
                    },
                    cloudstore:{
                        driver:{
                            aliyun: {
                                region: '',
                                bucket: '',
                                schema: '',
                                secret_id: '',
                                secret_key: ''
                            },
                            qcloud: {
                                region: '',
                                bucket: '',
                                schema: '',
                                secret_id: '',
                                secret_key: ''
                            },
                        }
                    },
                    wechat: {
                        official: {
                            app_id: '',
                            secret: '',
                        }
                    },
                    pay: {
                        wechat: {
                            app_id: '',
                            mch_id: '',
                            key: '',
                            cert_path: '',
                            key_path: '',
                        },
                    }
                }
            }
        },
        computed: {},
        mounted() {
            this.refreshConfig()
        },
        methods: {
            refreshConfig() {
                this.$http.get('/admin/config').then(
                    res => {
                        this.form = deep_merge(this.form,res)
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
    .config-pane{
        overflow-y: auto;
        height: 300px
    }
</style>