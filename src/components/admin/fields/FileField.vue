<template>
    <div>
        <el-button
                :disabled="disabled"
                icon="el-icon-upload"
                plain type="success" @click="selectFile" v-if="visualUploadBtn" :loading="uploadBtnLoading">点击上传
        </el-button>
        <input :accept="config.accept" hidden ref="selectFile" :multiple="config.multiple" type="file" @change="upload" />
        <div>
            <!--            <viewer :images="images" style="display: flex;justify-content: left;margin: 10px 0">-->
            <div    v-for="(url,index) in images"
                    :key="url"
                    class="image"
                    :style="{width:config.imgWidth,height:config.imgHeight}"
            >
                <img
                        style="width: 100%;height: 100%"
                        :src="config.mode === 'image'?url:fileIcon">
                <div class="cross" @click="handleDelete(index)">
                    <i class="el-icon-error"></i>
                </div>
            </div>
            <!--            </viewer>-->
        </div>
    </div>
</template>

<script>
    import FileIcon from '../../../assets/file-field-icon.png'
    import fieldProps from './fieldProps'

    export default {
        name: "FileField",
        props: {
            ...fieldProps
        },
        data() {
            return {
                fileList: [],
                fileIcon: FileIcon,
                uploadBtnLoading: false
            }
        },
        computed: {
            value: {
                get() {
                    return this.formData[this.field.name]
                },
                set(val) {
                    this.formData[this.field.name] = val
                }
            },
            images () {
                if (this.value){
                    return this.value.split(',')
                } else {
                    return  []
                }
            },

            visualUploadBtn() {
                return this.config.maxNumber <= 0 || this.config.maxNumber > this.images.length
            },
            config() {
                let _default = {
                    imgWidth: '80px',
                    imgHeight: '80px',
                    mode: 'file',
                    maxNumber: 0,
                    minNumber: 0,
                    maxSize: 0,
                    minSize: 0,
                    accept: '',
                    multiple: false
                }
                for (let key in this.field) {
                    _default[key] = this.field[key]
                }
                return _default
            }
        },
        methods: {
            selectFile() {
                this.$refs.selectFile.click()
            },
            async upload(e) {
                try {
                    this.uploadBtnLoading = true
                    let {files} = e.target;
                    if (files.length < 1) {
                        return
                    }
                    // 检测文件数量
                    if (this.config.maxNumber > 0 && this.config.maxNumber < files.length + this.images.length) {
                        this.$notify.error('文件上传数量不能超过：' + this.maxNumber)
                        return;
                    }
                    if (this.config.minNumber > 0 && this.config.minNumber > files.length + this.images.length) {
                        this.$notify.error('文件上传数量不能超过：' + this.minNumber)
                        return;
                    }

                    files = files.length === 1 ? [files[0]] : [].slice.call(files);

                    // 检测文件大小
                    let form = new FormData()
                    let uploadFlag = false
                    files.forEach(file => {
                        if (this.maxSize > 0 && file.size > this.maxSize) {
                            this.$notify.error(file.name + '大小超过最大限制')
                            return
                        }

                        if (this.minSize > 0 && file.size < this.minSize) {
                            this.$notify.error(file.name + '大小低于最小限制')
                            return
                        }
                        uploadFlag = true
                        form.append('file[]', file)
                    })

                    if (uploadFlag) {
                        let res = await this.$http.uploads(form)
                        this.value += res.join(',')
                    }

                } finally {
                    this.uploadBtnLoading = false
                    // 清空Input里面的内容
                    if (this.$refs.selectFile) {
                        this.$refs.selectFile.value = ''
                    }

                }
            },

            handleDelete(index) {
                let arr = this.value.split(',')
                arr.splice(index,1)
                this.value = arr.join(',')
            }
        }
    }
</script>

<style scoped>
    .cross {
        position: absolute;
        right: 2px;
        top: 2px;
    }

    .image{
        position: relative;
        display: inline-block;
        line-height: 0;
        margin: 5px 5px 5px 0;
    }
</style>
