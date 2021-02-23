<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>
<script>
//引入scroll组件
import Scroll from 'components/common/scroll/Scroll'
import {mapGetters} from 'vuex'
// 引入CartListItem 组件
import CartListItem from './CartListItem'


export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
   
    
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated(){
    // 进来时刷新一下
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px)
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>