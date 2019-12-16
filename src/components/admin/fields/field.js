import DateTimeColumn from "./DateTimeField";
import TextColumn from "./TextField";
import fieldProps from './fieldProps'

export default {
    props: {
        ...fieldProps
    },
    data: () => ({
        componentsMap: {
            'text': TextColumn, // 这个一定不要删除，默认情况下为该组件
            'datetime': DateTimeColumn,
        },
    }),
    render: function (createElement) {
        let type = this.field.type
        type = type ? type : 'text'
        let component
        if (type in this.componentsMap) {
            component = this.componentsMap[type]
        } else {
            component = this.componentsMap['text']
        }
        return createElement(component, {
            props: {
                index: this.index,
                field: this.field,
                formData: this.formData
            }
        }, this.$slots.default)
    }
}
