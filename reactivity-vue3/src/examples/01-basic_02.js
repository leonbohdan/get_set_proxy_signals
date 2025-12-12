/**
 * Example 1.1: Basic with useCounter
 * Description: Using useCounter function to encapsulate counter logic
 * Comment: This is a step between manual reactivity and getter/setter pattern.
 * 
 * The counter state is encapsulated in the useCounter function,
 * but we still need to call setCounter() manually.
 */

export function init(counterButton, resetButton) {
  function useCounter() {
    let counter = 0;

    function renderCounter() {
      counterButton.textContent = `Counter: ${counter}`;
      counterButton.classList.toggle('red', isCounterTooBig());
    }

    function isCounterTooBig() {
      return counter > 10;
    }

    return {
      getCounter() {
        return counter;
      },
      setCounter(newValue) {
        counter = newValue;
        renderCounter();
      },
    };
  }

  /** React approach to manage state. Functional approach for managing state.
   * 
   * To avoid the possibility of replacing state outside the useCounter() function.
   * */ 
  const { getCounter, setCounter } = useCounter();

  counterButton.addEventListener('click', () => {
    setCounter(getCounter() + 1);
  });

  resetButton.addEventListener('click', () => {
    setCounter(0);
  });

  const interval = setInterval(() => {
    setCounter(getCounter() + 1);
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
}

