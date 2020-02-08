<template>
    <el-form ref="form">
        <template v-for="field in normalizedFields">
            <el-form-item
                    v-if="!isHiddenField(field)"
                    :prop="field.name"
                    :key="field.name"
                    :label="field.comment">
                <field :disabled="isDisableField(field)" :form-data="formData" :field="field"></field>
            </el-form-item>
        </template>

        <el-form-item>
            <el-button :loading="submitLoading" type="primary" @click="insert" icon="el-icon-s-promotion"
                       v-if="mode === 'insert'">添 加
            </el-button>
            <el-button :loading="submitLoading" type="primary" @click="update" icon="el-icon-s-promotion"
                       v-if="mode === 'update'">更 新
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Field from "./fields/field";
    import warpFields from "./warpFields";

    export default {
        name: "SpForm",
        components: {Field},
        props: {
            mode: {
                type: String,
                required: true
            },
            formData: {
                type: Object,
                required: true
            },
            fields: {
                type: Array,
                default: () => []
            },
            url: {
                type: String,
                default: ''
            }
        },
        computed: {
            normalizedFields() {
                return warpFields(this.fields)
            },
        },
        data() {
            return {
                ready: false,
                submitLoading: false
            }
        },
        methods: {
            isHiddenField(field) {
                return field.hidden.indexOf(this.mode) >= 0
            },
            isDisableField(field) {
                return field.disable.indexOf(this.mode) >= 0
            },
            async insert() {
                this.submitLoading = true
                try {
                    await this.$http.post(this.url, this.form)
                } finally {
                    this.submitLoading = false
                }
            },
            async update() {
                this.submitLoading = true
                try {
                    await this.$http.put(this.url, this.form)
                } finally {
                    this.submitLoading = false
                }
            },
        }
    }
</script>

<style scoped>

</style>