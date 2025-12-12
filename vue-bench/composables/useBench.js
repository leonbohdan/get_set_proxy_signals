// Simple benchmarking composable.
// - Uses onUpdated to count how many times the component re-renders.
// - Exposes measureHeavy to time a heavy computation inside computed/refs.

import { onUpdated, ref } from 'vue';

export default function useBench(label = 'bench') {
  const renderCount = ref(0);
  const heavyDuration = ref(0);

  onUpdated(() => {
    // Teacher's Notes: this fires after every reactive change that causes
    // this component to patch the DOM.
    renderCount.value += 1;
  });

  const measureHeavy = (fn) => {
    const start = performance.now();
    const result = fn();
    heavyDuration.value = performance.now() - start;
    return result;
  };

  return {
    label,
    renderCount,
    heavyDuration,
    measureHeavy,
  };
}

