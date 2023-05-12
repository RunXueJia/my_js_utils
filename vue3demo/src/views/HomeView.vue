<template>
  <div class="home">
    <h2>home</h2>
    <div class="content">
      <p>这是内容</p>
      <button @click="add">num+1</button>
      <div>num :{{ num }}</div>
      <div>Son_Dom.value.name:{{name}}</div>
      <div class="box">
        <SonDom :num='num' @add ='add' ref="Son_Dom"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs, computed, onMounted, inject,onUnmounted } from "vue";
import SonDom from "@/components/SonDom.vue";
const utils = inject("$utils");
const Son_Dom = ref()
const name = ref()
onMounted(() => {
  utils.alertText("首页加载");
  console.log(Son_Dom.value.name);
  name.value = Son_Dom.value.name
});
onUnmounted(()=>{
   utils.alertText("首页退出");
})
//父子组件通信
const num = ref(0);
const add = ()=>{
  num.value++
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  .box {
    width: 500px;
    height: 300px;
    border: 2px solid skyblue;
  }
}
</style>