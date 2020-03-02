<template>
    <div>
        <el-input readonly v-model="value" style="width: 300px;margin-right: 5px"></el-input>
        <el-button type="primary" plain @click="selectFile" :loading="loading">选择文件</el-button>
        <input ref="input" multiple type="file" style="display: none" @change="uploadFile">
    </div>
</template>

<script>
    export default {
        name: "SpUploadFile",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                required: true
            },
            accept: {
                type: String,
                default: 'image/*'
            }
        },
        data() {
            return {
                loading: false,
                url: '/api/file/upload'
            }
        },
        computed: {},
        methods: {
            selectFile() {
                if (!this.disabled)
                    this.$refs.input.click()
            },

            async uploadFile(e) {
                this.loading = true
                let file = e.target.files[0]
                let form = new FormData()
                form.append('file', file)
                try {
                    let res = await this.$http.post(this.url, form)
                    this.$emit('input', res)
                } finally {
                    this.loading = false
                }

            }
        }
    }
</script>

<style scoped>
    .uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .uploader:hover {
        border-color: #409EFF;
    }

    .uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .avatar {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>