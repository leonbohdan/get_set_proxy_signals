/**
 * Example 3.3: Fine-grained Reactivity (Vue 3)
 * Description: Demonstrating fine-grained reactivity with computed and watchEffect
 * 
 * Fine-grained reactivity means that only the parts of the UI that depend on changed data
 * will be re-rendered, not the entire component.
 * 
 * This example shows:
 * - computed() for derived state
 * - Multiple watchEffect() for granular updates
 * 
 */

export function init(counterButton, resetButton) {
  const { ref, watchEffect, computed } = Vue;

  console.log('%c🚀 Fine-grained Reactivity Example Started', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
  console.log('%c📊 Watch console to see which parts update', 'color: #2196F3; font-size: 12px;');

  const counterState = ref(0);
  
  const isCounterTooBig = computed(() => counterState.value > 10);

  const stopTextEffect = watchEffect(() => {
    console.log('  📝 watchEffect #1: Updating counter text');
    counterButton.textContent = `Counter: ${counterState.value}`;
  });

  const stopColorEffect = watchEffect(() => {
    console.log('  🎨 watchEffect #2: Updating counter color');
    counterButton.classList.toggle('red', isCounterTooBig.value);
  });

  // Event handlers
  counterButton.addEventListener('click', () => {
    console.log(`\n👆 Click: ${counterState.value} → ${counterState.value + 1}`);
    counterState.value += 1;
  });

  resetButton.addEventListener('click', () => {
    console.log(`\n🔄 Reset: ${counterState.value} → 0`);
    counterState.value = 0;
  });

  const interval = setInterval(() => {
    counterState.value += 1;
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
    stopTextEffect();
    stopColorEffect();
  };
}

