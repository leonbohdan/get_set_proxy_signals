# JavaScript Reactivity Examples

This project demonstrates different approaches to implementing reactivity in JavaScript.

## 🎯 Demo Controls

- **→** or **N** - Next example
- **←** or **P** - Previous example

## 📚 Examples

### 01 - Basic (Manual)
Manual reactivity - calling `renderCounter()` after each state change.
- Simple and explicit
- Full control over when updates happen
- Easy to understand

### 01.1 - Basic with useCounter
Using useCounter function to encapsulate counter logic.
- Intermediate step between manual and getter/setter
- Counter state is encapsulated in useCounter function
- Still need to call setCounter() manually
- Shows function composition pattern

### 02 - Getter/Setter
Using getter/setter pattern to encapsulate state.
- State is private (closure)
- Automatic re-rendering on `setCounter()`
- Better encapsulation

### 03 - Proxy
ES6 Proxy-based reactivity (Vue 3 style).
- Automatic tracking of property changes
- No need to call update functions manually
- More "magical" but powerful

### 04 - Signal
Signal-based reactivity (like Solid.js / Vue 3 ref).
- Explicit reactive primitives
- Subscription-based updates
- Functional approach

## 🚀 How to Run

Simply open `index.html` in a browser. No build step required!

## 📁 Project Structure

```
reactivity-vue3/
├── index.html              # Main HTML file
├── src/
│   ├── main.js            # Main entry point with example switcher
│   └── examples/          # All reactivity examples
│       ├── 01-basic.js
│       ├── 01-basic_01.js
│       ├── 02-getter-setter.js
│       ├── 03-proxy.js
│       └── 04-signal.js
```

## ➕ Adding New Examples

1. Create a new file in `src/examples/` (e.g., `05-my-example.js`)
2. Export an `init(counterButton, resetButton)` function
3. Return a cleanup function if needed
4. Import and add to the examples array in `main.js`

Example template:

```javascript
/**
 * Example X: My Example
 * Description: What this example demonstrates
 */

export function init(counterButton, resetButton) {
  // Your code here
  
  const interval = setInterval(() => {
    // ...
  }, 1000);

  // Return cleanup function
  return () => {
    clearInterval(interval);
  };
}
```

