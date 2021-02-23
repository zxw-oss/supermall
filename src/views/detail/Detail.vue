<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-image-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :param-info="itemParams" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recomends" ref="recomend"/>
    </scroll>
     <!-- 组件不能监听click事件  如果要使用必须加上native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'

import DetailSwiper from './childComps/DetailSwiper'
// 引入商品详情的组件
import DetailBaseInfo from './childComps/DetailBaseInfo'
// 引入滚动组件
import Scroll from 'components/common/scroll/Scroll.vue'
// 引入店铺信息的组件
import DetailShopInfo from './childComps/DetailShopInfo'
// 引入详情的信息组件
import DetailImageInfo from './childComps/DetailImageInfo'
// 引入衣服尺寸组件
import DetailParamsInfo from './childComps/DetailParamsInfo'
// 引入用户评价的组件
import DetailCommentInfo from './childComps/DetailCommentInfo'
// 引入请求detail页面的数据请求的js文件
import {getDetail,Goods,getRecommend} from 'network/detail.js'
// 引入商品列表的组件  因为推荐的数据结构与商品列表一致
import GoodsList from 'components/content/goods/GoodsList'
// 引入混入的模块
import {itemListenerMixin,backTopMixin} from 'common/mixin'
// 引入加入购物车的组件
import DetailBottomBar from './childComps/DetailBottomBar'

import {debounce} from 'common/utils/utils'
// 引入返回顶部的组件

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    
    
    
  },
  mixins:[itemListenerMixin,backTopMixin],
  
  data(){
    return {
      iid:null,
      // 定义一个空数组用来存顶部轮播的图片
      topImages:[],
      goodsInfo:{},
      shopInfo:{},
      detailInfo:{},
      itemParams:{},
      commentInfo:{},
      // 定义一个变量用来保存 推荐的数据 数据是Object 还是Array 根据后台数据来定
      recomends:[],
      //保存所有的Top Y的值
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      
    }
  },
  created(){
    // 获取到gooslistitem 通过params传进来的id
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 1.获取iid请求的详情数据
    getDetail(this.iid).then(res=>{
      const data = res.result;
      console.log(res);
      // 2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages);


      // 3.创建商品对象
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 4.取出店铺信息
      this.shopInfo = data.shopInfo
      // 5获取详情的信息
      this.detailInfo = data.detailInfo
      // 6.取出参数信息
      this.itemParams = data.itemParams
      // 7.取出评论信息
      // 判断当前数据中有没有评论信息
      if ((data.rate.cRate !== 0)) {
        // 有的话取出一条
        this.commentInfo = data.rate.list[0]
      }

    // 4.给getThemeTopY赋值用于防抖的操作
    //联动效果
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recomend.$el.offsetTop)

      // 给他加一个最大值
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    })
      // 第一次获取   :  值不对
      // 原因this.$refs.params.$el 根本就没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el. offsetTop)
      // this.themeTopYs.push(this.$refs.comment.  $el.offsetTop)
      // this.themeTopYs.push(this.$refs.recomend. $el.offsetTop)
  
      // console.log(this.themeTopYs);

      // this.$nextTick(()=>{
         // 获取各个组件的高度
        //  第二次获取  :   值不对
        // 原因:  图片没有计算在内   图片还没有加载完成 
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el. offsetTop)
      // this.themeTopYs.push(this.$refs.comment.  $el.offsetTop)
      // this.themeTopYs.push(this.$refs.recomend. $el.offsetTop)

      // console.log(this.themeTopYs);
      // })
    })
    // 3.获取详情页面的推荐的参数
    getRecommend().then(res=>{
      // console.log(res);
      // 保存数据
      this.recomends = res.data.list
    })
    


  },
   // 4.监听详情的图片加载完成
  methods:{
    imageLoad(){
      // this.$refs.scroll.refresh()
      this.newRefresh()
        // 等图片加载完成在获取组件的高度
      this.getThemeTopY()
      //  this.$nextTick(()=>{
        //  获取各个组件的高度
        //  第二次获取  :   值不对
        // 原因:  图片没有计算在内   图片还没有加载完成 
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el. offsetTop)
      // this.themeTopYs.push(this.$refs.comment.  $el.offsetTop)
      // this.themeTopYs.push(this.$refs.recomend. $el.offsetTop)

      // console.log(this.themeTopYs);
      // })
      
    },
    titleClick(index){
      console.log(index);
      // 点击对应的小标题 滚动到对应的模块处
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    // 获取详情页面滚动的位置
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
        // console.log(position);
        const positionY = - position.y
        // 2.再与主题中的值进行对比
        // 多加一个值
        // [0, 12626, 13908, 14110,Number.Max_VALUE]



        // positionY 再 0 - 12626 之间 index = 0
        // positionY 再 =12626 - 13908 之间 index = 1
        // positionY 再 13908 - 14110 之间 index = 2
        // 超过14110(大于等于14110) index = 3
        // for(let i = 0 ;i < this.themeTopYs.length;i++){
        //   if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
        //     console.log(i);
        //   }
        // }
        let length = this.themeTopYs.length
        for(let i = 0 ;i < length - 1;i++){
          if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            

            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // if ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 &&  positionY > this.themeTopYs[i])) {
          //   // console.log(i);
          //   this.currentIndex = i;
          //   // console.log(this.currentIndex);
          //   // 把当前的currentIndex 赋值给nav bar的currentIndex
          //   // 这样就能实现联动效果
          //   this.$refs.nav.currentIndex = this.currentIndex

          // 代码优化

          }
        
      
      },
      // 加入购物车的方法
      addToCart(){
        // console.log('------');
        //1. 获取购物车需要展示的信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.dec = this.goodsInfo.title
        product.price = this.goodsInfo.realPrice
        // 2将商品加入到购物车页面


        // this.$store.cartList.push(product)
        // actions 的提交方式是dispatch
        this.$store.dispatch('addCart',product)

      }
      
  },
  mounted(){
    
    
    
  },
  // 生命周期函数 页面销毁后调用
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  updated(){
   
  }
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 2;
    background-color: #fff;
    height: 100vh;
    /* height: 100%; */
  }

  .detail-nav {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
       /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0; */
  }
</style>