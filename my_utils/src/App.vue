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
    <div @click="alert">dianji</div>
  </div>
</template>
<script>
import {debounce,throttle} from '../../myUtils'
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
     console.log(this.$utils)
  },
  mounted() {
    const dif = new Date().getTimezoneOffset()*60*1000
    console.log(this.$utils.getTime(+new Date()+dif));
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
    alert:throttle(function(){
      this.$utils.alertText('11111111111111')
    },1500)
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
  transform: translateY();
}
i {
  color: black;
}
div {
  color: black;
 
}
@keyframes aaa {
  
}
</style>
