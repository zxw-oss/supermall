<template>
  <div class="tab-control">
   <div v-for="(item,index) in titles" :key="" class="tab-control-item" 
  :class="{active:index===currentIndex}"  @click="itemClick(index)">
     <span>{{item}}</span>
   </div>
  </div>

</template>


<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      // 把当前点击的index 赋值给currentIndex 这样就可以点击哪个让哪个变色
      this.currentIndex = index;
      // 把当前点击的index传出去
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
   text-align: center;
   font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
  
}
.active{
  color: red;
  
}
.active span{
  border-bottom: 3px solid red;
  padding: 5px;
}
</style>