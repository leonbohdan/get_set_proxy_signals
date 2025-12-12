/**
 * Example 4: Signal-based Reactivity (Solid.js style)
 * Description: Full implementation of signals with automatic dependency tracking
 * 
 * Signals are the core primitive for reactive state in Solid.js:
 * - createSignal() - creates reactive state
 * - createEffect() - automatically tracks and re-runs when dependencies change
 * - createMemo() - cached computed value (like computed in Vue)
 */

export function init(counterButton, resetButton) {
  // Track the currently running effect
  let currentEffect = null;

  /**
   * Signal (reactive primitive)
   * Returns [getter, setter] tuple
   */
  function createSignal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();

    function read() {
      // Track: if there's an active effect, subscribe it
      if (currentEffect) {
        subscribers.add(currentEffect);
      }
      return value;
    }

    function write(newValue) {
      if (value !== newValue) {
        value = newValue;
        // Trigger: notify all subscribers
        subscribers.forEach(effect => {
          effect.execute();
        });
      }
    }

    return [read, write];
  }

  /**
   * Effect that automatically tracks dependencies
   * Similar to watchEffect in Vue 3
   */
  function createEffect(fn) {
    const effect = {
      execute() {
        currentEffect = effect;
        fn();
        currentEffect = null;
      }
    };

    effect.execute(); // Run once to collect dependencies
  }

  /**
   * Memoized computed value
   * Similar to computed() in Vue 3
   */
  function createMemo(fn) {
    const [getValue, setValue] = createSignal();
    
    createEffect(() => {
      setValue(fn());
    });
    
    return getValue;
  }

  const [counter, setCounter] = createSignal(5);
  
  const isCounterTooBig = createMemo(() => counter() > 10);

  // Effects for UI updates
  createEffect(() => {
    console.log('🔢 Effect #1: Updating counter text');
    counterButton.textContent = `Counter: ${counter()}`;
  });

  createEffect(() => {
    console.log('🔢 Effect #2: Updating counter color');
    counterButton.classList.toggle('red', isCounterTooBig());
  });

  // Event handlers
  counterButton.addEventListener('click', () => {
    setCounter(counter() + 1);
  });

  resetButton.addEventListener('click', () => {
    setCounter(0);
  });

  const interval = setInterval(() => {
    setCounter(counter() + 1);
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
}

