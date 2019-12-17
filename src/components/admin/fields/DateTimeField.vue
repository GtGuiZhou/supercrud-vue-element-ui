<template>
    <el-date-picker
            v-model="formData[field.name]"
            type="datetime"
            placeholder="选择日期时间">
    </el-date-picker>
</template>

<script>
    import fieldProps from './fieldProps'
    import fieldComputed from './fieldComputed'

    export default {
        name: "DateTimeColumn",
        props: {
            ...fieldProps
        },
        computed: {
            ...fieldComputed
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
