export default {

    // payload 是额外传进来的参数
    addCart(context, payload) {

        // 方法二 查找之前的数组中是否有该商品  find()方法
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if (oldProduct) {
            // oldProduct.count += 1
            context.commit('addCounter', oldProduct)
        } else {
            payload.count = 1
                // state.cartList.push(payload)
            context.commit('addToCart', payload)
        }
    }
}