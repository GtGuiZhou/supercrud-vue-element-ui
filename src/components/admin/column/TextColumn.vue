<template>
    <div>{{row[field.name]}}</div>
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
