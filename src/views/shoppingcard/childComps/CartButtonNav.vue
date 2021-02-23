<template>
<!-- 底部工具栏部分 -->
  <div class="button-nav">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calclate">
      去结算:({{checkLength}})
    </div>
  </div>
  
</template>
<script>
//引入点击选中的组件
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name:"CartButtonNav",
  components:{
    CheckButton
    
  },
  computed:{
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item =>{
        return item.checked
        // reduce()数组的方法是  计算数组元素相加后的总和
      }).reduce((preValue,item)=>{
        return preValue + item.price * item.count
      },0).toFixed(2)//这里设置了初始值
    },
  
  checkLength(){
    return this.$store.state.cartList.filter(item => item.checked).length
  }
  }
}
</script>
<style scoped>
.button-nav{
 height: 40px; 
 background-color: #fff;
 position: relative;
 /* bottom: 40px; */
 line-height: 40px;
 display: flex;

}
.check-content{
  display: flex;
  /* line-height: 40px; */
  /* 侧轴对其方式 */
  align-items: center;
  margin-left: 10px;
  width: 60px;
  
}
.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
  
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calclate{
  width: 80px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>