<template>
    <div>
        <el-form  :model="form" ref="form" :width="width" :label-width="labelWidth">
            <slot></slot>
            <el-form-item :style="{textAlign:btnPosition}">
                <el-button v-if="visualSubmitBtn" :loading="submitLoading" type="primary" plain @click="submit">提 交</el-button>
                <el-button v-if="visualClearBtn" type="warning" plain @click="clearSubmitForm">清 空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SpForm",
        props: {
            url: {
              type: String,
              required: true
            },
            form: {
                type: Object,
                required: true
            },
            method: {
                type: String,
                default: 'post'
            },
            width: {
                type: String,
                default: '700px'
            },
            labelWidth: {
                type: String,
                default: '80px'
            },
            visualClearBtn:{
                type: Boolean,
                default: true
            },
            visualSubmitBtn:{
                type: Boolean,
                default: true
            },
            btnPosition:{
                type: String,
                default: 'left'
            },
            submitBefore: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                submitLoading: false
            }
        },
        computed: {},
        methods: {
            async submit(){
                try {
                    if (this.submitBefore) this.submitBefore()
                    this.submitLoading = true
                    let res = await this.$http[this.method](this.url,this.form)
                    this.$notify.success('提交完成')
                    this.$emit("submit-success",res)
                }catch (e) {
                    this.$emit("submit-fail",e)
                }finally {
                    this.submitLoading = false
                }
            },

            clearSubmitForm() {
                // window.console.log(this.$refs.form)
                this.$refs.form.resetFields()
            },
        }
    }
</script>

<style scoped>

</style>