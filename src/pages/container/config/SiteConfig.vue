<template>
    <div>
        <el-form label-width="70px" style="background-color: #fff;margin-top: 8px;padding: 8px">
            <el-form-item prop="name" label="站点名称">
                <el-input v-model="value.name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="备案号">
                <el-input v-model="value.beian"></el-input>
            </el-form-item>
            <el-form-item prop="fee" label="logo">
                <sp-upload-image image-width="300px" image-height="150px" v-model="value.logo"></sp-upload-image>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import configMixin from "./configMixin";
    import SpUploadImage from "../../../components/SpUploadImage";

    export default {
        name: "SiteConfig",
        mixins: [configMixin],
        components: { SpUploadImage},
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>