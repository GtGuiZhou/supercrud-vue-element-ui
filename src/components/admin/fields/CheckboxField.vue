<template>
    <div>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="value" :disabled="disabled" @change="handleCheckedChange">
            <el-checkbox v-model="value" :label="option" v-for="option in options" :key="option"></el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<script>
    import fieldProps from './fieldProps'

    export default {
        name: "CheckboxField",
        props: {
            ...fieldProps
        },
        data() {
            return {
                checkAll: false
            }
        },
        computed: {
            value: {
                get() {
                    return this.formData[this.field.name].split(',')
                },
                set(val) {
                    val = val.filter(item => item)
                    this.formData[this.field.name] = val.join(',')
                }
            },
            options() {
                return this.field.options ? this.field.options : []
            },
            labelName() {
                return this.field.labelName ? this.field.labelName : 'label'
            },
            valueName() {
                return this.field.valueName ? this.field.valueName : 'value'
            }
        },
        methods: {
            handleCheckAllChange() {
                if (this.checkAll){
                    this.value = this.options
                } else {
                    this.value = []
                }
            },
            handleCheckedChange() {
                this.checkAll = this.options.length === this.value.length
            }
        }
    }
</script>

<style scoped>

</style>
