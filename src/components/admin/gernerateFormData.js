let gernerateFormData = fields => {
    let form = {}
    fields.forEach(field => {
        form[field.name] = field.default?field.default:''
    })
    return form
}

export default gernerateFormData