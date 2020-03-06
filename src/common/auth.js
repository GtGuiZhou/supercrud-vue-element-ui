export default (admin,rules) => {
    rules = rules instanceof Array ? rules : [rules]
    if (admin.root === 'yes') return true
    if (!admin.role || !rules.every(item => admin.role.rule.find(rule => rule.rule === item))) {
        return false
    }
    return  true
}