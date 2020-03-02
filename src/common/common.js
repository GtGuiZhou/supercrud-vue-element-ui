
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
