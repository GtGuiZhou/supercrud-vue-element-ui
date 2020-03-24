<template>
    <div>
        <sp-header title="微信公众号"></sp-header>
        <el-form label-width="80px">
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
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>