<template>
  <div>
   
    <nav-bar>
      
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="back"></div>

      
      <div slot="center" 
            class="title">
        <div v-for="(item,index) in titles" :key="item.index" 
        class="title-item"
        :class="{active:index === currentIndex}"
        @click="titleClick(index)"
        >{{item}}</div>
      </div>
      
    </nav-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'Dateil',
  components:{
    NavBar
    
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      // console.log('aaaa');
      this.currentIndex = index;
      // 把当前点击事件的index发送出去

      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
      // 两种返回模式
      // this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
 .title{
   display: flex;
   justify-content: space-evenly;
 }
 .title-item{
   font-size: 13px;
 }
 .active{
   color: hotpink;
 }
 .back{
   margin-top: 10px;
 }
</style>