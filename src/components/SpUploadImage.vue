<template>
    <div>
        <div class="uploader" @click="selectFile" :style="{width:imageWidth,height:imageHeight}">
            <img v-if="value.length > 0" :src="value" class="avatar">
            <i v-else class="el-icon-plus uploader-icon"></i>
            <input ref="input" multiple type="file" style="display: none" @change="uploadFile">
        </div>
    </div>
</template>

<script>
    export default {
        name: "SpUploadImage",
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            imageWidth: {
                type: String,
                default: '178px'
            },
            imageHeight: {
                type: String,
                default: '178px'
            },
            accept: {
                type: String,
                default: 'image/*'
            }
        },
        data() {
            return {
                url: '/api/file/upload'
            }
        },
        computed: {},
        methods: {
            selectFile() {
                if (!this.disabled)
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