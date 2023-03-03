<template>
  <div> 
      <div @click="full">全屏</div>
      <div ref="fulDiv" style="width: 100px; height: 100px; background-color: #eee;">
        <div @click="exit">退出</div>
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
<style lang="scss" scoped>

</style>
