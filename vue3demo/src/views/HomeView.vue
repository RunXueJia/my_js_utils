<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <button @click="add">+1</button> <span>{{num}}</span>
  </div>
</template>


<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { ref ,inject ,onMounted } from "vue";
const num = ref(3);
const add = ()=> {
  num.value++
}
const utils = inject('$utils')
console.log(utils);
onMounted(()=>{
  utils.alertText('加载')
})
</script>