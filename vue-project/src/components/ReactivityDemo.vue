<template>
  <div class="demo">
    <h2>Vue 3 Reactivity Demo</h2>
    <button :class="{ 'red-button': isTooBig }" @click="counter++">
      {{ counter }}
    </button>
    <p class="note">Open the console to see computed caching vs re-render logs.</p>
  </div>
</template>

<script setup>
import { computed, onUpdated, ref } from 'vue';

const counter = ref(0);

// Teacher Comment: computed caches until its deps change, so the class binding
// only re-evaluates when counter crosses the threshold.
const isTooBig = computed(() => {
  const result = counter.value > 10;
  console.log('[computed:isTooBig] evaluating ->', result);
  return result;
});

onUpdated(() => {
  console.log('[component updated] DOM patch applied for counter', counter.value);
});
</script>

<style scoped>
.demo {
  padding: 16px;
  background: #f6f8fb;
  border-radius: 10px;
  display: inline-block;
}
button {
  padding: 12px 18px;
  border-radius: 8px;
  border: none;
  background: #1976d2;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}
button:hover {
  background: #115293;
}
.red-button {
  background-color: #ff4444;
  color: white;
}
.note {
  margin-top: 8px;
  color: #51607a;
}
</style>
