<template>
    <div>
        <sp-header title="微信支付"></sp-header>
            <el-form label-width="60px">
                <el-form-item label="app_id">
                    <el-input v-model="value.pay.app_id"></el-input>
                </el-form-item>
                <el-form-item label="mch_id">
                    <el-input v-model="value.pay.mch_id"></el-input>
                </el-form-item>
                <el-form-item label="key">
                    <el-input v-model="value.pay.key"></el-input>
                </el-form-item>
                <el-form-item label="key">
                    <el-input v-model="value.pay.cert_path"></el-input>
                </el-form-item>
                <el-form-item label="key">
                    <el-input v-model="value.pay.key_path"></el-input>
                </el-form-item>
            </el-form>

        <sp-header title="微信公众号"></sp-header>
        <el-form label-width="60px">
            <el-form-item label="app_id">
                <el-input v-model="value.official.app_id"></el-input>
            </el-form-item>
            <el-form-item label="secret">
                <el-input v-model="value.official.secret"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import configMixin from "./configMixin";
    import SpCard from "../../../components/SpCard";
    import SpHeader from "../../../components/SpHeader";

    export default {
        name: "WechatConfig",
        components: {SpHeader, SpCard},
        mixins: [configMixin],
        props: {
            value: {
                type: Object,
                default: () => {
                    return {
                        pay: {
                            app_id: '',
                            mch_id: '',
                            key: '',
                            cert_path: '',
                            key_path: '',
                        },
                        official: {
                            app_id:'',
                            secret: '',
                        }
                    }
                }
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>