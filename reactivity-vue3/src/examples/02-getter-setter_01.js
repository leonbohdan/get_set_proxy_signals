/**
 * Example 2: Getter/Setter Pattern
 * Description: Using getter/setter to encapsulate state and automatic re-rendering
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

