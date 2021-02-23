<template>
  
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
        
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  
</template>
<script>
//导入轮播图的组件
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  
  name:"DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
        topImages:{
          type:Array,
          default(){
            // 默认值
            return []
          }
        }
      },
  // updated(){
  //   console.log(this.topImages);
  //   // console.log('sssss');
  // }
  
}
</script>
<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>