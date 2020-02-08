export default {
    data(){
        return {
            form: {},
            submitLoading: false,
            httpMethod: 'post',
            url:'',
            finishCallback: null
        }
    },
    methods: {
        setRequest(method,url){
            this.httpMethod = method
            this.url = url
            return this
        },
        setForm(form){
            form = JSON.parse(JSON.stringify(form))
            this.form = form
            return this
        },
        getForm(){
            return this.form
        },
        async submit(){
            try {
                if (this.submitBefore) this.submitBefore()
                this.submitLoading = true
                await this.$http[this.httpMethod](this.url, this.form)
                if (this.finishCallback){
                    this.finishCallback()
                }
                this.$notify.success('提交成功')
            } finally {
                this.submitLoading = false
            }
        },
        setFinishCallback(callback){
            this.finishCallback = callback
            return this
        }
    }
}