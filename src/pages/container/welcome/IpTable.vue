<template>
    <div v-loading="loading">
        <div style="text-align: center">ip访问分布</div>
        <el-table :data="data" border :height="height">
            <el-table-column label="ip" prop="ip"></el-table-column>
            <el-table-column label="访问数量" prop="count"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "IpTable",
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
            this.$http.get('/admin/api-access-record/ip').then(
                res => {
                    this.data = res.map(item => {
                        item.count =  number_to_simple_chinese(item.count)
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