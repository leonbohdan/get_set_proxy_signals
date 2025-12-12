/**
 * Example 3.2: Vue 3 ref (from CDN)
 * Description: Using Vue 3's ref system for reactivity
 * 
 * This example uses the real Vue 3 ref implementation from CDN.
 * Vue 3 uses Proxy under the hood for reactivity.
 * 
 * import { ref } from 'vue';
 */

export function init(counterButton, resetButton) {
  const { ref, watchEffect } = Vue;

  const counterState = ref(5);

  function isCounterTooBig() {
    return counterState.value > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${counterState.value}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  // Vue's watchEffect automatically tracks dependencies
  const stopEffect = watchEffect(() => {
    renderCounter();
  });

  counterButton.addEventListener('click', () => {
    counterState.value += 1;
  });

  resetButton.addEventListener('click', () => {
    counterState.value = 0;
  });

  const interval = setInterval(() => {
    counterState.value += 1;
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
    stopEffect(); // Stop watching for changes
  };
}
