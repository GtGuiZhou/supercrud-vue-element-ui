<template>
    <el-cascader
            v-model="formData[field.name]"
            :options="options"
            :props="field.props?field.props:{}"
            clearable></el-cascader>
</template>

<script>
    import fieldProps from './fieldProps'

    export default {
        name: "CascaderField",
        props: {
            ...fieldProps
        },
        data() {
            return {}
        },
        computed:{
            options() {
                return this.field.options ? this.field.options : []
            },
            labelName(){
                return this.field.labelName ? this.field.labelName : 'label'
            },
            valueName(){
                return this.field.valueName ? this.field.valueName : 'value'
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
