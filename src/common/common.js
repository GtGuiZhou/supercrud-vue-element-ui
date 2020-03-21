export function debounce(fn, wait) {
    let timer = null;
    return function () {
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

export function throttle(fn, wait) {
    let flag = false
    return function () {
        if (flag) return
        flag = true
        fn.apply(this, arguments)
        setTimeout(() => {
            flag = false
        }, wait)
    }
}


export function array_to_tree(arr, rootNodeCase = 0, pkField = 'id', parentField = 'pid', childrenFiled = 'children') {
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

export function array_group_count(array, groupField) {
    let map = {}
    for (let item of array) {
        if (map[item[groupField]] === undefined) map[item[groupField]] = 0
        map[item[groupField]]++
    }
    return Object.keys(map).map(key => {
        let res = {}
        res[groupField] = key
        res.count = map[key]
        return res
    })
}


export function number_to_simple_chinese(value) {
    const unit = ['千','万', '十万', '百万', '千万', '亿','十亿','百亿','千亿','兆']
    if(value < 1000) {
        return value
    }
    const transfer = (scale, index) => {
        if (value < (scale * 100) || index === unit.length - 1) {
            return (value / scale).toFixed(2) + unit[index]
        } else {
            return transfer(scale * 10, index + 1)
        }
    }
    return transfer(1000, 0)
}

export function upload_file(callback,multiple = '',accept='') {
    let node = document.createElement('input')
    node.type = 'file'
    node.style.display = 'none'
    node.accept = accept
    node.multiple = multiple
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(node)
    node.click()
    node.onchange = e => {
        let files = e.currentTarget.files
        if(multiple !== 'multiple'){
            callback(files[0])
        } else {
            callback(files)
        }
        body.removeChild(node)
    }
}