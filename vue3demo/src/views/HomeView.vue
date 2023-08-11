<template>
  <div class="home">
    <h2>home</h2>
    <div class="content">
      <p>这是内容</p>
      <button @click="add">num+1</button>
      <button @click="getAnswer()">连接</button>
      <div>num :{{ num }}</div>
      <div v-if="showSonName">Son_Dom.value.name:{{ name }}</div>
      <span v-for="(item, index) in list" :key="index">{{ item }}</span>
      <div class="box">
        <SonDom :num="num" @add="add" ref="Son_Dom" />
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  inject,
  onUnmounted,
} from "vue";
import { test } from "@/requset/test.js";
import SonDom from "@/components/SonDom.vue";
const utils = inject("$utils");
const Son_Dom = ref();
const showSonName = ref(false);
const name = computed(() => {
  return Son_Dom.value.name || "";
});
const list = ref([1, 2, 3, 4, 5]);
onMounted(() => {
  utils.alertText("首页加载");
  console.log(utils);
  showSonName.value = true;
  console.log(name.value);
});
onUnmounted(() => {
  utils.alertText("首页退出");
});
//父子组件通信
const num = ref(0);
const add = () => {
  num.value++;
};
const fullScreenFn = (dom) => {
  const el = document.querySelector(dom);
  utils.fullScreen.full(el);
};
const getAnswer = () => {
  const liu = test();
  liu.addEventListener("message", function ({ data }) {
    console.log(data);
  });
  liu.stream();
};
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
