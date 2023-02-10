<template>
  <div></div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$utils);
  },
  mounted () {
    const obj = { id: 1, name: '张飞' }
    const obj2 = this.$utils.clone(obj)
    obj2.name = '关羽'
    console.log(obj, obj2);
  },
  computed: {
  },
  watch: {
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
</style>
