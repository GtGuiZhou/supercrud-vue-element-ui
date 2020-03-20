<template>
    <div style="border-bottom: 1px solid #e6e6e6;padding-bottom: 5px;margin: 10px 0">
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "SpHeader",
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

    .title{
        color: rgb(121, 187, 255) ;
        font-weight: bold;
    }
</style>