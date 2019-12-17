<template>
    <el-form ref="form" :model="formData" :rules="rules" :label-width="getConfig('labelWidth','80px')">
        <template v-for="field in fields">
            <el-form-item
                    v-if="isHideField(field.name)"
                    :prop="field.name"
                    :key="field.name"
                    :label="field.comment?field.comment:field.name">
                <field :form-data="formData" :field="field"></field>
            </el-form-item>
        </template>
        <el-form-item>
            <el-button v-loading="submitLoading" type="primary" @click="onSubmit" icon="el-icon-s-promotion">提 交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Field from "./fields/field";

    export default {
        name: "CrudForm",
        components: {Field},
        props: {
            submit: {
                type: Function,
                required: true
            },
            formData: {
                type: Object,
                required: true
            },
            formConfig: {
                type: Object,
                default: () => ({})
            },
            fields: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                submitLoading: false
            }
        },
        computed: {
          rules () {
              let rules = {}
              this.fields.forEach(({name}) => {
                  let valid = this.getConfig('validate',false)
                  if (!(name in rules)){
                      rules[name] = []
                  }
                  if (valid){
                      rules[name].push(valid)
                  }
              })
              return rules
          }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate(async valid => {
                    if (valid) {
                        // 验证成功
                        this.submitLoading = true
                        try {
                            await this.submit(this.formData)
                            this.$emit('submit-success')
                        } catch (e) {
                            this.$emit('submit-fail')
                        } finally {
                            this.submitLoading = false
                        }
                    } else{
                        return  false
                    }
                })
            },
            // 组件方法
            isHideField(fieldName) {
                const hideFields = this.getConfig('hideFields', [])
                return !hideFields.some(item => {
                    return item === fieldName
                })
            },
            // 其他
            getConfig(configName, _default) {
                if (configName in this.formConfig) {
                    return this.formConfig[configName]
                } else {
                    return _default
                }
            }
        }
    }
</script>

<style scoped>
    .range {
        border: 1px solid #e6e6e6;
    }
</style>
