<template>
  <div @click="copy">12445</div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    console.log(this.$utils)
  },
  mounted() {
    const obj = { id: 1, name: '张飞' }
    const obj2 = this.$utils.clone(obj)
    obj2.name = '关羽'
    console.log(obj, obj2)
  },
  computed: {},
  watch: {},
  methods: {
    copy() {
      this.$utils.copyInto(`
         123
         456
      `)
    },
  },
}
</script>
<style lang="scss" scoped>
div {
  color: #000;
}
i {
  color: #000;
}
</style>
