<template>
    <div>
        <crud-index :table="table" :fields="fields"></crud-index>
    </div>
</template>

<script>
    import CrudIndex from "../../components/admin/CrudIndex";
    export default {
        name: "crud",
        components: {CrudIndex},
        data() {
            return {
                table: {
                    baseUrl: '/crud'
                },
                fields: [
                    {name: 'date',type: 'datetime'},
                    {name: 'name'},
                    {name: 'address'},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>
