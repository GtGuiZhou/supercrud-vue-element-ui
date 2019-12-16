<template>
    <div id="fullscreen">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "FullScreen",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
 #fullscreen{
     position: fixed;
     width: 100%;
     height: 100%;
     left: 0;
     right: 0;
 }
</style>
