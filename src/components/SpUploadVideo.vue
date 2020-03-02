<template>
    <div>
        <div>
            <el-button type="primary" plain @click="selectFile">选择视频</el-button>
        </div>
        <video v-if="value.length > 0" :src="value" class="avatar" controls="controls" :style="{width:videoWidth,height:videoHeight}"></video>
        <input ref="input" multiple type="file" style="display: none" @change="uploadFile">
    </div>
</template>

<script>
    export default {
        name: "SpUploadVideo",
        props: {
            value: {
                type: String,
                required: true
            },
            accept: {
                type: String,
                default: 'video/*'
            },
            videoWidth: {
                type: String,
                default: '200px'
            },
            videoHeight: {
                type: String,
                default: '150px'
            },
        },
        data() {
            return {
                url: '/api/file/upload'
            }
        },
        computed: {},
        methods: {
            selectFile() {
                this.$refs.input.click()
            },

            uploadFile(e) {
                let file = e.target.files[0]
                let form = new FormData()
                form.append('file', file)
                this.$http.post(this.url, form).then(
                    res => {
                        this.$emit('input', res)
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .uploader {
        display: inline-block;

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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px dashed #d9d9d9;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>