// 导入请求数据总的函数
import { request } from 'network/request.js'
// 获取详情页面请求的数据
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid,
        }
    })

}
// 获取推荐的参数
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
// 创建一个类 用来保存商品详情信息的         
export class Goods {
    constructor(itemInfo, columns, service) {
        //商品标题
        this.title = itemInfo.title;
        // 商品的描述
        this.desc = itemInfo.desc;
        // 商品的价格
        this.price = itemInfo.price;
        // 商品的原价
        this.oldPrice = itemInfo.oldPrice;
        // 打几折  或者是不是新品的标志
        this.discount = itemInfo.discountDesc;
        // 动态绑定一个背景
        this.discountBgColor = itemInfo.discountBgColor;
        // 销量 收藏 快递
        this.columns = columns;

        this.services = service;
        // console.log(this.service);
        // 真实的价格
        this.realPrice = itemInfo.lowNowPrice
    }
}
// 在创建一个类用来保存店铺的信息
export class Shop {
    constructor(shopInfo) {
        this.shopLogo = shopInfo.shopLogo
    }

}