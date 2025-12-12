/**
 * Example 3.1: Ref-based Reactivity (Vue 3 Style)
 * Description: Using getter/setter pattern like Vue 3's ref() implementation
 * 
 * This example demonstrates how Vue 3's ref() actually works internally:
 * - track(): collects dependencies when value is accessed (getter)
 * - trigger(): runs effects when value changes (setter)
 * - Similar to Vue 3's @vue/reactivity implementation
 */

export function init(counterButton, resetButton) {
  // Track active effect (like Vue 3's effect system)
  let activeEffect = null;

  // Store subscribers for each ref
  const targetMap = new WeakMap();

  function track(target, key) {
    if (!activeEffect) return;
    
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    
    dep.add(activeEffect);
  }

  function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach(effect => effect());
    }
  }

  // Vue 3's ref implementation using getter/setter
  function ref(initialValue) {
    let value = initialValue;
    
    const refObject = {
      get value() {
        track(refObject, 'value');
        return value;
      },
      set value(newValue) {
        if (value !== newValue) {
          value = newValue;
          trigger(refObject, 'value');
        }
      }
    };
    
    return refObject;
  }

  // Create effect that automatically tracks dependencies
  function watchEffect(fn) {
    activeEffect = fn;
    fn(); // Run once to collect dependencies
    activeEffect = null;
  }

  // Create reactive ref
  const counter = ref(0);

  function isCounterTooBig() {
    return counter.value > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${counter.value}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  // Auto-track dependencies when accessing counter.value
  watchEffect(renderCounter);

  counterButton.addEventListener('click', () => {
    counter.value = counter.value + 1;
  });

  resetButton.addEventListener('click', () => {
    counter.value = 0;
  });

  const interval = setInterval(() => {
    counter.value += 1;
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
}
