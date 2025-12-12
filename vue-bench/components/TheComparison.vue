<script setup>
import { computed, defineComponent, reactive, ref } from 'vue';
import useBench from '../composables/useBench';

// Teacher's Notes:
// - reactive(): wraps the object in a Proxy. Deep paths are reactive because
//   the get/set traps can see property access and assignments.
// - ref(): conceptually a signal. It wraps a value and exposes .value; Vue's
//   compiler/renderer tracks those reads for fine-grained updates.

const formatMs = (ms) => ms.toFixed(2);

const ReactiveCard = defineComponent({
  name: 'ReactiveCard',
  setup() {
    const state = reactive({
      count: 0,
      nested: { multiplier: 2 },
    });

    const { renderCount, heavyDuration, measureHeavy } = useBench('reactive');

    const heavyTotal = computed(() =>
      measureHeavy(() => {
        // Simulated heavy work to highlight recomputation cost.
        let acc = 0;
        for (let i = 0; i < 50_000; i += 1) {
          acc += state.count * state.nested.multiplier;
        }
        return acc;
      })
    );

    const increment = () => state.count += 1;
    const bumpMultiplier = () => state.nested.multiplier += 1;

    return {
      state,
      renderCount,
      heavyDuration,
      heavyTotal,
      increment,
      bumpMultiplier,
      formatMs,
    };
  },
  template: `
    <article class="card">
      <h2>reactive() (Proxy)</h2>
      <p class="note">
        Proxy-based deep reactivity; any nested assignment triggers updates.
      </p>
      <div class="controls">
        <button @click="increment">+ count</button>
        <button @click="bumpMultiplier">+ multiplier</button>
      </div>
      <ul class="stats">
        <li><strong>Count:</strong> {{ state.count }}</li>
        <li><strong>Multiplier:</strong> {{ state.nested.multiplier }}</li>
        <li><strong>Heavy total:</strong> {{ heavyTotal }}</li>
        <li><strong>Render count:</strong> {{ renderCount }}</li>
        <li><strong>Heavy ms:</strong> {{ formatMs(heavyDuration) }}</li>
      </ul>
    </article>
  `,
});

const RefCard = defineComponent({
  name: 'RefCard',
  setup() {
    const count = ref(0);
    const multiplier = ref(2);

    const { renderCount, heavyDuration, measureHeavy } = useBench('ref');

    const heavyTotal = computed(() =>
      measureHeavy(() => {
        // Teacher's Notes: template reads count.value / multiplier.value.
        // Vue tracks those reads, so only consumers of this ref update.
        let acc = 0;
        for (let i = 0; i < 50_000; i += 1) {
          acc += count.value * multiplier.value;
        }
        return acc;
      })
    );

    const increment = () => count.value += 1;
    const bumpMultiplier = () => multiplier.value += 1;

    return {
      count,
      multiplier,
      renderCount,
      heavyDuration,
      heavyTotal,
      increment,
      bumpMultiplier,
      formatMs,
    };
  },
  template: `
    <article class="card">
      <h2>ref()/computed (Signal-like)</h2>
      <p class="note">
        ref() is a value wrapper; reads subscribe, writes notify. Fine-grained.
      </p>
      <div class="controls">
        <button @click="increment">+ count</button>
        <button @click="bumpMultiplier">+ multiplier</button>
      </div>
      <ul class="stats">
        <li><strong>Count:</strong> {{ count }}</li>
        <li><strong>Multiplier:</strong> {{ multiplier }}</li>
        <li><strong>Heavy total:</strong> {{ heavyTotal }}</li>
        <li><strong>Render count:</strong> {{ renderCount }}</li>
        <li><strong>Heavy ms:</strong> {{ formatMs(heavyDuration) }}</li>
      </ul>
    </article>
  `,
});
</script>

<template>
  <div class="wrap">
    <h1>Vue 3 Reactivity Comparison</h1>
    <p class="lead">
      Visualize Proxy-based reactive() vs signal-like ref()/computed. The heavy
      total simulates an expensive computed to make re-render cost visible.
    </p>
    <div class="grid">
      <ReactiveCard />
      <RefCard />
    </div>
  </div>
</template>

<style scoped>
.wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
}
h1 {
  margin: 0 0 6px;
}
.lead {
  margin: 0 0 14px;
  color: #475569;
}
.grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}
.note {
  margin: 4px 0 10px;
  color: #475569;
  font-size: 13px;
}
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}
button {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
button:hover {
  background: #1d4ed8;
}
.stats {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 4px;
}
.stats li strong {
  margin-right: 6px;
}
</style>

