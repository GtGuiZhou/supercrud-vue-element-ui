export default {
    field: {
        type: Object,
        default: () => ({
            name: '',
            comment: '',
            type: 'text'
        })
    },
    formData: {
        type: Object,
        default: () => ({})
    }
}
