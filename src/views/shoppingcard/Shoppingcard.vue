<template>
  
   <div class="cart">
     <!-- 商品的导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
     <!-- 商品的列表 -->
     <cart-list/>
     <!-- 小结部分 -->
     <cart-button-nav/>
   </div>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
// 引入商品列表的组件
import CartList from './childComps/CartList'
// 引入vuex的方法一个转换方法
import {mapGetters} from 'vuex'
// 引入底部的总结
import CartButtonNav from './childComps/CartButtonNav'

export default {
  name: 'Shoppingcard',
  components:{
    NavBar,
    CartList,
    CartButtonNav
   
    
    
  },
  //这样直接获取getters里面的方法
  computed:{
    // 把cartLength直接转换成计算属性
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: pink;
  color: #fff;

}
.cart{
  height: 100vh;
}

</style>>
 
  



