<template>
    <div>
        <el-select v-model="value.credentials_type" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <div v-if="value.credentials_type === 'password'">
            <el-input v-model="value.credentials_value" placeholder="请输入老密码"></el-input>
        </div>
        <div v-if="value.credentials_type === 'phone'">
            <el-input placeholder="请输入手机号码"></el-input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountPolicy",
        props: {
            value: {
                type: Object,
                require: true
            },
        },
        data() {
            return {
                options: [
                    {label:'通过密码修改',value: 'password'},
                    {label:'通过邮箱验证码修改',value: 'email'},
                    {label:'通过手机验证码修改',value: 'phone'},
                ]
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>