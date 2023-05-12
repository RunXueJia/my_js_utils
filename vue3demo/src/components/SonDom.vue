<template>
  <div class="son">
    <h3>子组件</h3>
    <button @click="add">num+1</button>
    <div>num : {{ num }}</div>
  </div>
</template>
<script setup>
import {
  inject,
  defineProps,
  defineEmits,
  defineExpose,
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
} from "vue";
const utils = inject("$utils");
defineProps({
  num: {
    type: Number,
    required: true,
  },
});
const name = ref('静香')
const emit = defineEmits(["add"]);
const add = utils.debounce(() => {
  emit("add");
});

defineExpose({name})
</script>