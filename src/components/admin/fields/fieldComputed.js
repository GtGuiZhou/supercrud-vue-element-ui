export default {
    tableLabel () {
        const field = this.field
        return field.comment?field.comment:field.name
    }
}
