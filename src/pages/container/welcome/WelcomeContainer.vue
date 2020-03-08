<template>
    <div>
        <slot>
            <div style="margin-top: 100px">
                <div style="text-align: center">
                    <div class="welcome">欢迎使用 SuperCrud</div>
                    <div class="author">
                        <small>Power By GtGuiZhou</small><br>
                        <small> Copyright © 2019 GtGuiZhou. All Rights Reserved. GtGuiZhou 版权所有 </small>
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "WelcomeContainer",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
    .welcome {
        color: black;
        font-size: 64px;
    }

    .author {
        color: gray;
    }
</style>
