<template>
    <div>
        <sp-header title="腾讯云"></sp-header>
        <el-form label-width="120px">
            <el-form-item label="存储区域">
                <el-input v-model="value.qcloud.region"></el-input>
            </el-form-item>
            <el-form-item label="云存储账号">
                <el-input v-model="value.qcloud.secret_id"></el-input>
            </el-form-item>
            <el-form-item label="云存储秘钥">
                <el-input v-model="value.qcloud.secret_id"></el-input>
            </el-form-item>
            <el-form-item label="通讯协议">
                <el-input v-model="value.qcloud.schema"></el-input>
            </el-form-item>
            <el-form-item label="存储桶">
                <el-input v-model="value.qcloud.bucket"></el-input>
            </el-form-item>
        </el-form>

        <sp-header title="阿里云"></sp-header>
        <el-form label-width="120px">
            <el-form-item label="存储区域">
                <el-input v-model="value.aliyun.region"></el-input>
            </el-form-item>
            <el-form-item label="云存储账号">
                <el-input v-model="value.aliyun.secret_id"></el-input>
            </el-form-item>
            <el-form-item label="云存储秘钥">
                <el-input v-model="value.aliyun.secret_id"></el-input>
            </el-form-item>
            <el-form-item label="通讯协议">
                <el-input v-model="value.aliyun.schema"></el-input>
            </el-form-item>
            <el-form-item label="存储桶">
                <el-input v-model="value.aliyun.bucket"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import SpHeader from "../../../components/SpHeader";
    import configMixin from "./configMixin";

    export default {
        mixins: [configMixin],
        name: "CloudStoreConfig",
        components: {SpHeader},
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>