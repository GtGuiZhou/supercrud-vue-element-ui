export default {
    data () {
        return {
            primaryFieldName: 'id',
            tableData: [],
            formTitle: '',
            visualForm: false,
            url: '',
            pageIndex: 1,
            pageSize: 10,
            pageTotal: 0,
            pageSizes: [10,20,50],
            searchContent: ''
        }
    },
    mounted(){
      this.refreshTable()
    },
    methods: {
        async refreshTable(){
            this.$http.get(this.url + `?page=${this.pageIndex}&size=${this.pageSize}&search=${this.searchContent}`).then(
                res => {
                    this.tableData = res.data
                    this.pageTotal = res.total
                }
            )
        },
        insertBefore(){},
        async insert(){
            this.visualForm = true
            this.formTitle = '新增'
            this.$nextTick(() => {
                this.insertBefore()
                this.$refs.form.setRequest('post', this.url).setFinishCallback(this.formFinish)
            })
        },
        updateBefore(id,row){},
        async update(id,row){
            this.visualForm = true
            this.formTitle = '编辑'
            this.$nextTick(() => {
                this.updateBefore(id,row)
                this.$refs.form.setRequest('put', this.url + '/' + id).setForm(row).setFinishCallback(this.formFinish)
            })
        },
        async _delete(id){
            await this.$http.delete(this.url + '/' + id)
            this.refreshTable()
            this.$notify.success('删除成功')
        },
        setPagingSize(size){
            this.pageSize = size
            this.refreshTable()
        },
        setPagingIndex(index) {
            this.pageIndex = index
            this.refreshTable()
        },
        formFinish(){
            this.visualForm = false
            this.refreshTable()
        },
        search(){
            this.refreshTable()
        }

    }
}