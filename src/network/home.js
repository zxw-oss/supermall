// 引入axios

import { request } from './request';

// 首页所有的请求全部放在这里
// 如果用default只能导出一次
// 使用函数的形式导出   当请求很多的时候 可以导出对应的请求
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
// 这里请求的是首页 流行,精选,新款的数据
export function getHomeGoods(type, page) {
    return request({
        // 请求http://123.207.32.32:8000/home/data数据
        // 并且传进去type(pop  news shell)
        // page  是页码
        url: 'home/data',
        params: {
            type,
            page
        }
    })
}