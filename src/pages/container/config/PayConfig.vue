<template>
    <div>
        <sp-header title="微信支付"></sp-header>
        <el-form label-width="80px">
            <el-form-item label="app_id">
                <el-input v-model="value.wechat.app_id"></el-input>
            </el-form-item>
            <el-form-item label="mch_id">
                <el-input v-model="value.wechat.mch_id"></el-input>
            </el-form-item>
            <el-form-item label="key">
                <el-input v-model="value.wechat.key"></el-input>
            </el-form-item>
            <el-form-item label="cert_path">
                <el-input v-model="value.wechat.cert_path"></el-input>
            </el-form-item>
            <el-form-item label="key_path">
                <el-input v-model="value.wechat.key_path"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import configMixin from "./configMixin";
    import SpCard from "../../../components/SpCard";
    import SpHeader from "../../../components/SpHeader";

    export default {
        name: "PayConfig",
        components: {SpHeader, SpCard},
        mixins: [configMixin],
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>