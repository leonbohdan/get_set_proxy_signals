/**
 * Example 3: Proxy-based Reactivity
 * Description: Using ES6 Proxy with both get and set traps for automatic dependency tracking
 * 
 * This example demonstrates advanced reactivity pattern used in Vue 3.
 * - get trap: tracks which properties are being accessed
 * - set trap: triggers updates when properties change
 */

export function init(counterButton, resetButton) {
  // Track active effect (like Vue 3's effect system)
  let activeEffect = null;

  function createReactive(obj) {
    // Map to store subscribers for each property
    const subscribers = new Map();

    return new Proxy(obj, {
      get(target, property) {
        // Track: if there's an active effect, subscribe it to this property
        if (activeEffect) {
          if (!subscribers.has(property)) {
            subscribers.set(property, new Set());
          }
          subscribers.get(property).add(activeEffect);
        }
        
        return target[property];
      },

      set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;
        
        // Trigger: run all subscribers when value changes
        if (oldValue !== value && subscribers.has(property)) {
          subscribers.get(property).forEach(effect => effect());
        }
        
        return true;
      }
    });
  }

  // Create effect that automatically tracks dependencies
  function watchEffect(fn) {
    activeEffect = fn;
    fn(); // Run once to collect dependencies
    activeEffect = null;
  }

  function isCounterTooBig() {
    return state.counter > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${state.counter}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  const state = createReactive({ counter: 5 });

  // Auto-track dependencies when accessing state.counter
  watchEffect(renderCounter);

  counterButton.addEventListener('click', () => {
    state.counter = state.counter + 1;
  });

  resetButton.addEventListener('click', () => {
    state.counter = 0;
  });

  const interval = setInterval(() => {
    state.counter += 1;
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
}
