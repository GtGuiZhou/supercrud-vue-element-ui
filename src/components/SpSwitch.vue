<template>

    <el-switch
            @change="submit"
            :value="value"
            :active-value="activeValue"
            :inactive-value="inactiveValue"
            :active-text="activeText"
            :inactive-text="inactiveText"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
    </el-switch>

</template>

<script>
    export default {
        name: "SpSwitch",
        props: {
            url: {
                type: String
            },
            value: {
                required: true
            },
            activeValue: {
                default: 'yes'
            },
            inactiveValue: {
                default: 'no'
            },
            activeText: {
                type: String,
                default: '是'
            },
            inactiveText: {
                type: String,
                default: '否'
            },
            activeColor: {
                type: String,
                default: '#13ce66'
            },
            inactiveColor: {
                type: String,
                default: '#ff4949'
            },
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            submit(status) {
                this.$emit('input',status)
                if (this.url) {
                    this.$http.put(this.url, {status}).then(
                        () => {
                            this.$notify.success('修改成功')
                        }
                    ).catch(
                        () => {
                            this.value = !this.value
                            this.$notify.error('修改失败')
                        }
                    )
                }
            }
        }
    }
</script>

<style scoped>

</style>