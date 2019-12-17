<template>
    <el-input v-model="formData[field.name]" placeholder="请输入内容"></el-input>
</template>

<script>
    import fieldProps from './columnProps'

    export default {
        name: "TextColumn",
        props: {
            ...fieldProps
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
