<template>
  <div class="goods">
    <!-- 获取得到的goods的信息  遍历出每个对象传递给goodsItem进行展示 -->
    <goods-item v-for="(item,index) in goods" :key="item.index" :goodsItem="item"></goods-item>
   <!-- {{goods}} -->
  </div>
</template>



<script>
// 引入goodsItem
import GoodsItem from './GoodsItem'

export default {
  name:'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsItem
    
  }
}
</script>

<style scoped>
 .goods{
   display:flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
 }

</style>