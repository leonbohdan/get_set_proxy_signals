<template>
  <main class="page">
    <header>
      <h1>Evolution of Reactivity - Vue 3 Demo</h1>
      <p>Open console to observe computed caching and DOM patch logs.</p>
    </header>
    <section>
      <ReactivityDemo />
    </section>
  </main>
</template>

<script setup>
import ReactivityDemo from './components/ReactivityDemo.vue';
</script>

<style scoped>
.page {
  font-family: Arial, sans-serif;
  padding: 24px;
  color: #1f2a44;
  background: #f6f8fb;
  min-height: 100vh;
}
header {
  margin-bottom: 16px;
}
h1 {
  margin: 0 0 6px;
}
p {
  margin: 0;
}
</style>
