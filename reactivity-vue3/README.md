# JavaScript Reactivity Examples

This project demonstrates different approaches to implementing reactivity in JavaScript.

## 🎯 Demo Controls

- **→** or **N** - Next example
- **←** or **P** - Previous example

## 📚 Examples

### Comparison Table

| Example | Approach | Syntax | Updates | Tech | Vue Version |
|---------|----------|--------|---------|------|-------------|
| 01 | Manual | `counter++` | ❌ Manual | Vanilla JS | - |
| 01.1 | useCounter | `setCounter()` | ✅ On set | Closure | - |
| 02 | get/set Object | `state.value = x` | ✅ On set | Object accessor | Vue 2 style |
| 03 | Proxy | `state.counter = x` | ✅ Auto | ES6 Proxy | Vue 3 reactive() |
| 03.1 | ref() Custom | `counter.value = x` | ✅ Auto | get/set + track/trigger | Vue 3 ref() |
| 03.2 | Vue 3 CDN | `counter.value = x` | ✅ Auto | Vue 3 (real) | Vue 3 Official |
| 03.3 | Fine-grained | `counter.value = x` | ✅ Granular | Vue 3 + computed | Vue 3 Advanced |
| 04 | Signal | `setCounter(x)` | ✅ Auto | Signals | Solid.js style |

---

## 📖 Detailed Examples

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
ES6 Proxy-based reactivity with custom implementation.
- Custom get/set traps for dependency tracking
- Automatic tracking of property changes
- Similar to Vue 3's reactive() system
- Works with objects: `state.counter`
- Educational implementation

### 03.1 - ref() Implementation
Custom implementation of Vue 3's ref() using getter/setter.
- Shows how Vue 3's `ref()` works internally
- `track()` function collects dependencies
- `trigger()` function runs effects
- Uses getter/setter instead of Proxy
- Educational implementation of @vue/reactivity

### 03.2 - Vue 3 ref (CDN)
Using real Vue 3's ref and watchEffect from CDN.
- Production-ready Vue 3 reactivity
- Uses `ref()` for reactive values
- `watchEffect()` for automatic dependency tracking
- Shows how Vue 3 actually works

### 03.3 - Fine-grained Reactivity (Vue 3)
Demonstrating fine-grained reactivity with Vue 3.
- **Fine-grained updates** - only affected parts re-render
- `computed()` for derived state with caching
- Multiple `watchEffect()` for granular control
- **Console logs** show exactly when each part updates
- Color updates only when value crosses threshold (>10)
- Text updates on every counter change

### 04 - Signal
Signal-based reactivity (Solid.js style).
- **createSignal()** - creates reactive state with [getter, setter]
- **createEffect()** - automatically tracks dependencies and re-runs
- **createMemo()** - cached computed values (like Vue's computed)
- Function-based API: `counter()` to read, `setCounter(x)` to write
- Automatic dependency tracking in effects
- Fine-grained updates like Solid.js

## 💡 Understanding Signals

Signals use a **function-based API** that's different from other approaches:

```javascript
// Create a signal
const [count, setCount] = createSignal(0);

// Read value - call as function
console.log(count()); // 0

// Write value - call setter
setCount(5);

// Computed value (memo)
const doubled = createMemo(() => count() * 2);

// Effect - automatically tracks count() dependency
createEffect(() => {
  console.log(`Count is: ${count()}`);
});
```

**Key differences:**
- **Read**: `count()` not `count.value`
- **Write**: `setCount(x)` not `count.value = x`
- **Auto-tracking**: Effects automatically track which signals are read

**Comparison with other approaches:**

| Feature | Vue 3 ref | Proxy | Signal |
|---------|-----------|-------|--------|
| Read | `counter.value` | `state.counter` | `counter()` |
| Write | `counter.value = x` | `state.counter = x` | `setCounter(x)` |
| Multi-property | One ref per value | ✅ Object | One signal per value |
| TypeScript | Good | Good | Excellent |
| Framework | Vue 3 | Vue 3 | Solid.js, Preact |

## 🔍 Understanding Fine-grained Reactivity

The **03.3 - Fine-grained Reactivity** example demonstrates an important concept:

**Without fine-grained reactivity:**
- Counter changes from 9 → 10: Updates text ✅ AND color ✅
- Counter changes from 10 → 11: Updates text ✅ AND color ✅ (unnecessary!)
- Counter changes from 11 → 12: Updates text ✅ AND color ✅ (unnecessary!)

**With fine-grained reactivity (computed + watchEffect):**
- Counter changes from 9 → 10: Updates text ✅ AND color ✅
- Counter changes from 10 → 11: Updates text ✅ only (color stays same!)
- Counter changes from 11 → 12: Updates text ✅ only (color stays same!)

The color only updates when `isCounterTooBig` **actually changes** (false → true at 11, or true → false at 10), not on every counter increment!

**Open browser console** to see this in action! 🎯

## 🚀 How to Run

Simply open `index.html` in a browser. No build step required!

**Pro tip:** Open browser DevTools console to see reactivity logs in example 03.3!

## 📚 Documentation

### JavaScript & Web APIs
- [Proxy on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) - ES6 Proxy documentation
- [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) - Getter/Setter documentation
- [WeakMap on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) - Used for dependency tracking

### Vue.js Reactivity
- [Vue 3 Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) - Official guide to Vue 3 reactivity
- [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html) - Deep dive into Vue's reactivity system
- [Vue 3 Composition API](https://vuejs.org/api/reactivity-core.html) - ref(), reactive(), computed(), watchEffect()

### Other Frameworks
- [Solid.js Reactivity](https://www.solidjs.com/tutorial/introduction_signals) - Signal-based reactivity
- [Preact Signals](https://preactjs.com/guide/v10/signals/) - Fine-grained reactivity in Preact

## 📁 Project Structure

```
reactivity-vue3/
├── index.html              # Main HTML file (with Vue 3 CDN)
├── src/
│   ├── main.js            # Main entry point with example switcher
│   └── examples/          # All reactivity examples
│       ├── 01-basic_01.js
│       ├── 01-basic_02.js
│       ├── 02-getter-setter_01.js
│       ├── 03-proxy_01.js      (Proxy-based)
│       ├── 03-proxy_02.js      (ref() implementation)
│       ├── 03-proxy_03.js      (Vue 3 ref from CDN)
│       ├── 03-proxy_04.js      (Fine-grained reactivity)
│       └── 04-signals.js       (Signal-based reactivity)
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
