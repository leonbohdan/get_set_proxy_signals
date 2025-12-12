/**
 * Example 4: Signal-based Reactivity (Vue 3 / Solid.js style)
 * Description: Using signals with automatic dependency tracking
 */

export function init(counterButton, resetButton) {
  function createSignal(initialValue) {
    let value = initialValue;
    const subscribers = new Set();

    function read() {
      return value;
    }

    function write(newValue) {
      if (value !== newValue) {
        value = newValue;
        subscribers.forEach(fn => fn());
      }
    }

    function subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    }

    return [read, write, subscribe];
  }

  function createEffect(fn) {
    fn();
  }

  const [counter, setCounter, subscribeCounter] = createSignal(0);

  function isCounterTooBig() {
    return counter() > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${counter()}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  // Auto-update when counter changes
  const unsubscribe = subscribeCounter(renderCounter);

  createEffect(renderCounter);

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
    unsubscribe();
  };
}

