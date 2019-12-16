<template>
    <el-input v-model="formData[field.name]" placeholder="请输入内容"></el-input>
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
