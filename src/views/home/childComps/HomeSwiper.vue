<template>
  <swiper>
       <swiper-item v-for="item in banners" :key="">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
       </swiper-item>
     </swiper>
</template>

<script>
// 导入轮播图的组件
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  data(){
    return{
      isLoad:false
        
      }
    },
  components:{
    Swiper,
    SwiperItem  
  },
  
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods:{
    imageLoad(){
      if (!this.isLoad) {
        // 还没有加载的时候
        // 为了不让HomeSwiper多次调用
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
      // console.log('----');
      // 发送事件去主页
      
    }
  }
}
</script>
<style scoped>

</style>