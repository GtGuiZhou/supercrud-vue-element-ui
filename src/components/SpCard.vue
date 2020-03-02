<template>
    <div class="sp-card">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "SpCard",
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>
    .sp-card{
        padding: 10px;
        border: 1px solid #e6e6e6;
        background-color: white;
        margin-bottom: 10px;
    }
</style>