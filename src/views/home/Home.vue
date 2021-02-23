<template>
  
   <div id="home">
     <!-- 针对这个插件绑定个class用来改背景颜色 -->
     <!-- 在中间插槽里面放个内容 -->
     <nav-bar class="home-nav">
       <div slot="center">购物街</div>
     </nav-bar>

     <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control"
     v-show="isTabFixed"
     ></tab-control>


     <scroll class="content" 
     ref="scroll" :probe-type= "3"
     @scroll="contentScroll"
     
     :pull-up-load="true" 
     @pullingUp="loadMore"
     >
     <!-- :pull-up-load="true" 是外交动态传进去的 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>


      <recommend-view :recommends="recommends"></recommend-view>
      <reature-view></reature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    
     </scroll>
     <!-- 组件不能监听click事件  如果要使用必须加上native修饰符 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
   </div>
  
</template>

<script>


import HomeSwiper from './childComps/HomeSwiper'
// 导入RecommendView组件
import RecommendView from './childComps/RecommendView'
import ReatureView from './childComps/FeatureView'
// 引入goods列表的组件
import GoodsList from 'components/content/goods/GoodsList'
import GoodsItem from 'components/content/goods/GoodsItem'

// 导入公共组件部分
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import {getHomeMultidata,getHomeGoods} from 'network/home'
import Scroll from 'components/common/scroll/Scroll.vue'
// 引入返回顶部的组件
import BackTop from 'components/content/backTop/BackTop.vue'

// 导入防抖函数
// import {debounce} from 'common/utils/utils.js'

// 引入混入的模块
import {itemListenerMixin} from 'common/mixin'




// 引入轮播图的组件
// import Swiper from 'components/common/swiper/Swiper'

// import SwiperItem from 'components/common/swiper/SwiperItem'


export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    ReatureView,
    TabControl,
    GoodsList,
    GoodsItem,
    Scroll,
    BackTop
    
    
  },
  mixins:[itemListenerMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      // 模拟请求数据的方式
      // goods里面包含 流行,精选,新款的数据
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      //定义一个变量用来存传入的类型
      // 默认为pop
      currentType:'pop',
      isShowBackTop:false,
      // 声明一个变量用来存tabControl距离顶部的距离
      taboffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
   
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
 
  activated(){
    // activated  deactivated  有keep-alive时才有用
  this.$refs.scroll.scrollTo(0,this.saveY)
  // 进来时对页面进行一下刷新
  this.$refs.scroll.refresh()
  console.log(this.saveY);
    // console.log('页面激活时调用的');
  },
  deactivated(){
    // console.log('离开页面时调用的');
    // 在scroll组件有封装
    this.saveY = this.$refs.scroll.getscrollY()
console.log(this.saveY);
    // 2.取消全局事件的监听
    this.$bus.$off('itemImgListener',this.itemImgListener)
  },
  created(){
    // 这里调用下面获取数据的方法
    this.getHomeMultidata()
    // .then(res=>{
    //   console.log(res);
    // })
    // 调用下面面的方法
    // 调用三次 每次传不一样的值  ,,一次获取三个的数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
    //1. 图片加载完成的事件监听
    // 调用防抖函数
    // 往下面的防抖函数里传入两个参数 
    // 这里的refresh的返回值就是下面 return的结果
    // let newRefresh = debounce(this.$refs.scroll.refresh,500)

    // // 对监听事件进行保存
    // this.itemImgListener = ()=>{
    //   // console.log('........');
    //   //获取scroll下的refresh方法
    //   // this.$refs.scroll.refresh()
    //   newRefresh()
    // }
    
    // // 组件一创建好就对图片的加载进行事件的监听
    // this.$bus.$on('itemImageLoad',this.itemImgListener)

  
  },
  // 定义方法
  methods:{
    // 事件监听的请求
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //  让两个的小的导航栏 选中的状态保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
       backClick(){
      // 获取滚动的组件对象   在调用组件对象里的scroll属性  在吊scrollTo

      // 这样写太麻烦 不容易阅读  去返回顶部的组件内封装一下
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      // 直接获取组件调用组件里的scrollTo的方法
      this.$refs.scroll.scrollTo(0,0,500)
      
    },
    // 通过子向父传参 把position传出来
    // 监听事件的滚动
    contentScroll(position){
      // console.log(position);
      // this.position.y < 1000
      // 判断快速回到顶部是显示
      this.isShowBackTop = (-position.y) > 1000
      

      // 决定tabControl是否吸顶  
      this.isTabFixed = (-position.y) > this.taboffsetTop
      // console.log(position.y);

      // console.log(this.isTabFixed);
    },
    loadMore(){
      // console.log('上拉加载更多...');
    // 这里是对谁上拉加载更多??????
      // 直接调用封装好的 获取数据的方法 把当前currentType(当前点击的是谁 流行 新款 精选) 传进去
      this.getHomeGoods(this.currentType)

      // console.log('上拉加载更多');
    },
    swiperImageLoad(){
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop


      // console.log(this.$refs.tabControl2.$el.offsetTop);
      // 打印
    }
    ,
    getHomeMultidata(){
      // 请求多个数据
      // 这里是个函数 调用过后就会被回收,,所以我们在data里面定义变量保存数据
      getHomeMultidata().then(res =>{
      // console.log(res);
      // 获取banner里面的list数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      })
    },
    // 获取新款 流行 精选的数据
    getHomeGoods(type){
      // 获取当方式的页码
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
      // console.log(res);
      // 三个点的语法  将三个点后面的数组 一个一个取出来
      //经过push添加到另外一个数组中
      // 把获取的data中的list数据全部取出来 放到对应的list数组中
       this.goods[type].list.push(...res.data.list)
      //  
       this.goods[type].page += 1;

      //  调用一个方法 finishPullUp 可以下拉更多次
      // 第一个scroll是组件  第二个scroll为属性 
      // this.$refs.scroll.scroll.finishPullUp()


      // 完成上拉加载更多
      this.$refs.scroll.finishPullUp()
      

      })
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    
    position: relative;
  }
  .home-nav{
    background-color: pink;
    color: white;

    /* 在我们使用浏览器的原生进行滚动时用这样的方法设置吸顶 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0; */
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
 
  .content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    
   
  }
  
  
</style>