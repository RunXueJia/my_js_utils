<template>
  <div> 
      <div @click="full">全屏</div>
      <div ref="fulDiv" style="width: 100px; height: 100px; background-color: #eee;position: relative;transition: all 0.5s;">
        <!-- <div class="son"></div> -->
        <div style="position: absolute;left:2px" @click="exit">退出</div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    full(){
      this.$utils.fullScreen.full(this.$refs.fulDiv)
    },
    exit(){
      this.$utils.fullScreen.exit()
    }
  },
}
</script>
<style  scoped>
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
  div {
    color: black;
  }
</style>

