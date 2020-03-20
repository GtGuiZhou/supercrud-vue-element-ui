<template>
    <div style="padding: 8px">
        <div style="background-color: white;padding: 8px;">
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button plain icon="el-icon-refresh" @click="refreshConfig"></el-button>
                    <el-button type="primary" plain @click="save"
                               icon="el-icon-circle-plus">保存配置
                    </el-button>
                </div>
            </div>
        </div>


        <el-form label-width="70px" style="background-color: #fff;margin-top: 8px;padding: 8px">
            <el-form-item prop="name" label="站点名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="备案号">
                <el-input v-model="form.beian"></el-input>
            </el-form-item>
            <el-form-item prop="fee" label="logo">
                <sp-upload-image image-width="300px" image-height="150px" v-model="form.logo"></sp-upload-image>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import SpUploadImage from "../../../components/SpUploadImage";

    export default {
        name: "Index",
        components: {SpUploadImage},
        data() {
            return {
                form: {
                    name: '',
                    logo: '',
                    qq: '',
                    email: '',
                    sina_url: '',
                    sina_name: '',
                    qq_group: []
                }
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