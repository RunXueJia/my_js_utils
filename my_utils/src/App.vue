<template>
  <div>
    <div @click="full">全屏</div>
    <div
      ref="fulDiv"
      style="
        width: 100px;
        height: 100px;
        background-color: #eee;
        position: relative;
      "
    >
      <div class="son"></div>
      <div style="position: absolute; left: 2px" @click="exit">退出</div>
    </div>
  </div>
</template>
<script>
import {debounce} from '../../myUtils'
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
     console.log(this.$utils)
  },
  mounted() {
    // const time = new Date()
    console.log(this.$utils.getTime('Mon, 06 Mar 2023 10:51:11 GMT'));
    //  const arr =[ { id: 1, name: '张飞' },{ id:2, name: '关羽' }]
    // const arr2 = this.$utils.clone(arr)
    // arr2[1].name = '关羽1'
    // console.log(arr, arr2)
    // console.log(this.myFunction()[0]);
  },
  computed: {},
  watch: {},
  methods: {
    full: debounce(function(){
      this.$utils.fullScreen.full(this.$refs.fulDiv)
    })  ,
    exit() {
      this.$utils.fullScreen.exit();
    },
    // myFunction() {
    //   var str = "The rain in SPAIN stays mainly in the plain";
    //   var n = str.match(/ain/);
    //   return n;
    // },
  },
};
</script>
<style scoped>
.son {
  height: 100%;
  width: 100%;
  background: skyblue;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid red;
  box-sizing: border-box;
  transition: all 0.5s;
}
i {
  color: black;
}
div {
  color: black;
}
</style>
