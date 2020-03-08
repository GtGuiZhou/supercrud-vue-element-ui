<template>
    <div class="sp-card">
        <div class="sp-card-header" v-if="$slots.header || title">
            <slot name="header">
                <div class="sp-card-title">{{title}}</div>
            </slot>
        </div>
        <div class="sp-card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SpCard",
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
    .sp-card{
        border: 1px solid #e6e6e6;
        background-color: white;
        margin-bottom: 10px;
    }

    .sp-card-body{
        padding: 10px;
    }

    .sp-card-header{
        border-bottom: 1px solid #e6e6e6;
    }

    .sp-card-title{
        font-weight: bold;
        font-size: 16px;
        margin: 10px 10px;
    }
</style>