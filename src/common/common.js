
export function debounce(fn,wait) {
    let timer = null;
    return function () {
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this,args)
        },wait)
    }
}

export function throttle(fn,wait) {
    let flag = false
    return function () {
        if(flag) return
        flag = true
        fn.apply(this,arguments)
        setTimeout(() => {
            flag = false
        },wait)
    }
}


export function array_to_tree(arr, rootNodeCase = 0, pkField = 'id', parentField = 'pid', childrenFiled = 'children')
{
    arr = arr.map(node => {
        node[childrenFiled] = arr.filter(item => {
            return item[parentField] === node[pkField]
        })
        return node
    })

    return arr.filter(node => {
        return node[parentField] === rootNodeCase
    })
}