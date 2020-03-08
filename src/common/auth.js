export default (state,rules) => {
    if (!state || !state.admin) return
    let admin = state.admin
    rules = rules instanceof Array ? rules : [rules]
    if (admin.root === 'yes') return true
    if (!rules.every(item => admin.rule.find(rule => {
        const flag = rule.rule === item
        if(!flag){
            // window.console.log('当前管理员未含有：' + item)
        }
        return flag
    }))) {
        return false
    }
    return  true
}