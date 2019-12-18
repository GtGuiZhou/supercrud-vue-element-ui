import TextColumn from "./TextColumn";
import fieldProps from './columnProps'
import FileColumn from "./FileColumn";

export default {
    props: {
        ...fieldProps
    },
    data: () => ({
        componentsMap: {
            'text': TextColumn, // 这个一定不要删除，默认情况下为该组件
            'file' : FileColumn
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
                field: this.field,
                row: this.row
            }
        }, this.$slots.default)
    }
}
