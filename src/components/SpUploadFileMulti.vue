<template>
    <div>
        <div><el-button v-if="allowUpload" type="primary" plain @click="selectFile">选择文件</el-button></div>
        <div class="image-list">
            <div v-for="(url,index) in value" :key="index" class="avatar-box" :style="{width:imageWidth,height:imageHeight}">
                <span>{{url}}</span>
                <i class="uploader-icon el-icon-delete-solid" @click="deleteImage(index)"></i>
            </div>
        </div>
        <input ref="input" type="file" multiple style="display: none" @change="uploadFile">
    </div>
</template>

<script>
    export default {
        name: "SpUploadFileMulit",
        props: {
            value: {
                type: Array,
                required: true
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
                default: '*/*'
            },
            max: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                url: '/api/file/upload/multi'
            }
        },
        computed: {
            allowUpload() {
                return this.max < 1 || this.value.length < this.max
            }
        },
        methods: {
            deleteImage(index){
                this.value.splice(index,1)
                this.$emit('input',this.value)
            },

            selectFile() {
                if (!this.allowUpload) return
                this.$refs.input.click()
            },

            uploadFile(e) {
                let files = e.target.files
                if(files.length + this.value.length > this.max) {
                    this.$notify.error('文件数量超过限制')
                    return
                }
                let form = new FormData()
                for(let file of files){
                    form.append('file[]', file)
                }
                this.$http.post(this.url, form).then(
                    res => {
                        this.$emit('input',res.concat(this.value))
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .image-list{
        display: flex;
        flex-wrap: wrap;
    }

    .avatar {
        width: 100%;
        height: 100%;
    }

    .avatar-box{
        position: relative;
        margin: 5px 5px 0 0;
    }

    .uploader-icon {
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 28px;
        color: #8c939d;
        justify-content: center;
        display: flex;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,.3);
        align-items: center;
        cursor: pointer;
    }

</style>