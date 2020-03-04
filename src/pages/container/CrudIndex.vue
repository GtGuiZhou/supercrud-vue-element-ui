<template>
    <div>
        <sp-crud-template :url="url" :form="form">
            <template v-slot:table>
                <el-table-column></el-table-column>
            </template>
            <template v-slot:form="{sForm}">
                <el-form-item ></el-form-item>
            </template>
        </sp-crud-template>
    </div>
</template>

<script>
    import SpCrudTemplate from "../../components/SpCrudTemplate";
    export default {
        name: "Index",
        components: {SpCrudTemplate},
        data() {
            return {
                url: '',
                form: {

                }
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>