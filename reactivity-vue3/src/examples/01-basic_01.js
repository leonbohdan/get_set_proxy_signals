/**
 * Example 1: Basic - Manual reactivity
 * Description: Manually calling renderCounter() after each state change
 * Comment: This example is the most basic example of reactivity.
 * 
 * Do not forget to use renderCounter(); after each state change.
 */

export function init(counterButton, resetButton) {
  let counter = 5;

  function isCounterTooBig() {
    return counter > 10;
  }

  function renderCounter() {
    counterButton.textContent = `Counter: ${counter}`;
    counterButton.classList.toggle('red', isCounterTooBig());
  }

  renderCounter();

  counterButton.addEventListener('click', () => {
    counter = counter + 1;
    renderCounter();
  });

  resetButton.addEventListener('click', () => {
    counter = 0;
    renderCounter();
  });

  const interval = setInterval(() => {
    counter += 1;
    renderCounter();
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
}

