/**
 * Example 3: Proxy-based Reactivity
 * Description: Using ES6 Proxy to automatically track and trigger updates
 */

export function init(counterButton, resetButton) {
  function createReactive(obj, onChange) {
    return new Proxy(obj, {
      set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;
        
        if (oldValue !== value) {
          onChange(property, value, oldValue);
        }
        
        return true;
      }
    });
  }

  function isCounterTooBig() {
    return state.counter > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${state.counter}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  const state = createReactive(
    { counter: 0 },
    (property) => {
      if (property === 'counter') {
        renderCounter();
      }
    }
  );

  renderCounter();

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

