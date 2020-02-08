import {Form, FormItem, Input, Radio} from 'element-ui'
import warpFields from "./warpFields";
import RadioField from "./fields/RadioField";

export default {
    props: {
        fields: {
            type: Array,
            required: true
        },
        props: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Array,
            default: () => []
        },
        hidden: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        componentsMap: {
            'text': Input, // 这个一定不要删除，默认情况下为该组件
            'radio': RadioField,
        },
    }),
    computed: {
        normalizedFields() {
            return warpFields(this.fields)
        },
    },
    methods: {
        createFormItem(field, createElement) {
            field = JSON.parse(JSON.stringify(field))
            let component = this.componentsMap[field.type] ? this.componentsMap[field.type] : this.componentsMap['text']
            return createElement(component, field.formItemParams)
        },
        createFormItemWarp(field, formItem, createElement) {
            field = JSON.parse(JSON.stringify(field))
            if (!field.formItemWarpParams.props)
                field.formItemWarpParams.props = {}
            let props = field.formItemWarpParams.props
            props.prop = field.name // 强制默认
            props.label = props.label ? props.label : field.comment // 自动设置标签名
            props.disabled = this.disabled.indexOf(field.name) >= 0
            return createElement(FormItem, field.formItemWarpParams, [formItem])
        },
    },
    render: function (createElement) {
        let fieldItems = []
        for (let field of this.normalizedFields) {
            // 隐藏字段渲染
            if (this.hidden.indexOf(field.name) >= 0) continue;
            // 渲染字段
            let formItem = this.createFormItem(field, createElement)
            fieldItems.push(this.createFormItemWarp(field, formItem, createElement))
        }

        return createElement(Form, {props: this.props}, fieldItems)
}
}
