const fieldDefault = {
    name: '',
    comment: '',
    disable: [], //update,insert,table
    hidden: [],//update,insert,table
    type: 'text',
    validate: [],
    props: {},
    // 创建表单项的参数,参考:https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
    formItemParams: {},
    // 用于包裹表单项的参数
    formItemWarpParams: {}
}

let warpFields = fields => {
    fields = JSON.parse(JSON.stringify(fields))
    fields.map(field => {
        for (let key in fieldDefault){
            if (!(key in field)) field[key] = fieldDefault[key]
        }

        if(!field.comment) field.comment = field.name
        return field
    })

    return fields
}

export default warpFields