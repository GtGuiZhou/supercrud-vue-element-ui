import axios from 'axios'

// const urlParams = 'XDEBUG_SESSION_START=18855'
const urlParams = ''


// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (urlParams) {
        if (config['url'].indexOf('?') > 0) {
            config['url'] += '&' + urlParams
        } else {
            config['url'] += '?' + urlParams
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    return response.data.data;
}, function (error) {
    window.console.error("--------------------------- request error ---------------------------")
    window.console.error(error)
    const status = error.response.status
    switch (status) {
        case 500:
            service.errMsg("服务器内部错误")
            break;
        case 401:
            service.err401()
            break
        case 404:
            service.errMsg('请求资源不存在')
            break
    }

    return Promise.reject(error);
});


service.upload = (url, file) => {
    let formData = new FormData();
    formData.append('file', file)
    return service.post(url, formData)
}


service.err401 = () => {
    window.console.warn('---------- axios 请求错误401未被重写 --------')
}

service.errMsg = (msg) => {
    window.console.warn('---------- axios 请求错误消息未被重写 --------')
    window.console.error(msg)
}

export default service