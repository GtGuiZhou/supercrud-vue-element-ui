export default {
    // 上下文，用来告诉field是表格还是表单
    context: {
      type: String,
      default: 'table'
    },
    field: {
        type: Object,
        default: () => ({
            name: '',
            comment: '',
            type: 'text'
        })
    }
}
