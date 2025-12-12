/**
 * Example 2: Getter/Setter Pattern (Object with get/set)
 * Description: Using get/set accessors on object to automatically trigger re-rendering
 * 
 * This example is a simple implementation of the getter/setter pattern.
 * Using in Vue 2.
 */

export function init(counterButton, resetButton) {
  function isCounterTooBig() {
    return counterState.value > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${counterState.value}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  const counterState = {
    _value: 5,

    get value() {
      return this._value;
    },

    set value(newValue) {
      this._value = newValue;
      renderCounter();
    },
  };

  renderCounter();

  counterButton.addEventListener('click', () => {
    counterState.value = counterState.value + 1;
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
  };
}

