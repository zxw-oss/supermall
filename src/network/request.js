// 导入axios模块
import axios from 'axios'

// 导出个函数
export function request(config) {
    // axios.create({}) 创建axios
    // 如果还有其他的接口  还可以再创建个实例
    // 通过
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // axios拦截器 

    // 请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        // console.log(err);
    })


    // 响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
        // 返回的是params对象  其他地方可以通过.then来调用
}