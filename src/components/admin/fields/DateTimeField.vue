<template>
    <div >
        <el-table-column
                :prop="field.name"
                :label="tableLabel">
        </el-table-column>
    </div>
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
