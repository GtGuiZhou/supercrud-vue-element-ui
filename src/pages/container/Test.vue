<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column
                    prop="username"
                    label="用户名"
            ></el-table-column>
            <el-table-column
                    prop="password"
                    label="密码"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                tableData: [
                    {username: 'admin',password: '123456'}
                ]
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>