<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 修复上拉加载更多的bug 报错
// import BScroll from '@better-scroll/core'
// import Pullup from '@better-scroll/pull-up'
// BScroll.use(Pullup)

// 修复滑动的bug
import BScroll from 'better-scroll'
// import BScroll from '@better-scroll/core'
// import ObserveDom from '@better-scroll/observe-dom'
// BScroll.use(ObserveDom)
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    // 上拉加载更多   因为有的页面不一定用上拉加载更多  有的又需要 所以这里动态决定一下
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
    } 
  },
  mounted(){
    // 这里不建议用document去拿数据 如果其他组件里面也有 此时你就不知道拿的是哪个

    /* 创建Bscroll对象 */
    this.scroll = new BScroll(this.$refs.wrapper,{
      //  observeDOM: true,
       click:true,
       
       probeType:this.probeType,
       pullUpLoad:this.pullUpLoad
    })

    // 监听滚动的位置 
    if(this.probeType === 2 || this.probeType === 3){
      // console.log('进来了');
    this.scroll.on('scroll',(position)=>{
      // console.log(position);

      // 获取到实时的位置后传给 父组件(Home.vue)L
      // 谁需要给谁  所以给他传出去
      this.$emit('scroll',position)
    })
    }


    // 监听Scroll滚动到底部
    if(this.pullUpLoad){
       // 判断pullUpLoad 为ture的时候才监听
    this.scroll.on('pullingUp',()=>{
      // console.log('aaaaaa');
      // 现在是在scroll里面  上拉加载更多是在首页做的 需要把这个事件传到首页里面
     this.$emit('pullingUp')
     
    })
    }
     
    
    
  },
  methods:{
    scrollTo(x, y, time=300){
    // 判断这里能否获取scroll对象 能就执行后面的代码
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      // console.log('-------');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getscrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
 
</style>