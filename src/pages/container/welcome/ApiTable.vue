<template>
    <div v-loading="loading">
        <el-table :data="data" border :height="height">
            <el-table-column label="api" prop="api"></el-table-column>
            <el-table-column label="访问数量" prop="count"></el-table-column>
            <el-table-column label="平均响应时间" prop="avg"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "ApiTable",
        props: {
            width: {
                type: String,
                default: '',
            },
            height: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                loading: true,
                data: []
            }
        },
        created() {
            this.$http.get('/admin/api-access-record/api').then(
                res => {
                    this.data = res.map(item => {
                        item.count =  number_to_simple_chinese(item.count)+'次'
                        item.avg = parseFloat(item.avg).toFixed(2) + 'ms'
                        return item
                    })
                    this.loading = false
                }
            )
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>