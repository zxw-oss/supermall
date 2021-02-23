<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 具名插槽 -->
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
data(){
  return {
    // isactive:true,
   
  }
},
computed:{
  isactive(){
    // 判断当前活跃的path等不等于我传进来的path
    return this.$route.path.indexOf(this.path) !== -1
  },
   activeStyle(){
    //  判断当前是否为激活状态 如果是加上color  如果没有激活 不加颜色
    return this.isactive? {color:this.activecolor} : {}
  }
},
 props:{
      path:String,
      activecolor:{
        type:String,
        default:'red'
      }
    },
methods:{
  itemClick(){
    this.$router.push(this.path)
    // console.log(this.path);
    console.log('aaaaaa');
  }
},

}
</script>

<style>
  
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  
</style>


