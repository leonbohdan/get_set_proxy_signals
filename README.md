# JavaScript Reactivity: Evolution of Approaches

This repository demonstrates the evolution of reactivity in JavaScript - from simple getter/setter to modern Proxy and Signals. Each folder contains separate examples or benchmarks of different reactivity approaches.

## 📁 Project Structure

### 🎓 [`reactivity-vue3/`](./reactivity-vue3)
**Interactive learning examples** - step-by-step evolution of reactivity

- 8 different examples: from manual updates to Signals
- Syntax comparison: `counter++`, `state.value = x`, `counter.value = x`, `setCounter(x)`
- Fine-grained reactivity demonstration (Vue 3 computed + watchEffect)
- Shows how Vue 3 `ref()` and `reactive()` work under the hood
- Switch between examples using ← / → keys
- Open `index.html` in browser - no dependencies required!

### 🔬 [`vanilla/`](./vanilla)
**Comparison of three reactivity engines** in one demo

- **Engine A**: Getters/Setters (ES5) - classic Vue 2 approach
- **Engine B**: Proxy (ES6) - modern Vue 3 approach
- **Engine C**: Signals - fine-grained reactivity (like Solid.js)
- Visual demonstration of differences in update counts
- Shows why Signals are more efficient (fewer unnecessary re-renders)
- Open `index.html` for interactive comparison

### ⚡ [`vanilla-bench/`](./vanilla-bench)
**Performance benchmarks** - measuring speed of different approaches

- Testing with 1000 state updates
- Comparison: `Object.defineProperty` vs `Proxy` vs `Signals`
- Metrics: render count, JS execution time
- Reveals over-reactivity problems in older approaches
- Demonstrates advantages of fine-grained reactivity
- Modular structure: separate files for each engine

### 🧪 [`vue-bench/`](./vue-bench)
**Vue components for benchmarks** - comparison in Vue ecosystem

- `TheComparison.vue` component for visual comparison
- `useBench.js` composable for benchmark logic
- Integration with Vue 3 Composition API
- Ready-to-use modules for Vue applications

### 🚀 [`vue-project/`](./vue-project)
**Vue 3 + Vite project** - full-featured app with reactivity demo

- `ReactivityDemo.vue` component with live examples
- Configured Vite for fast development
- Vue 3 Composition API
- `npm run dev` - start dev server
- `npm run build` - production build

## 🎯 Quick Start

### Simple way (no dependencies)
```bash
# Open any of these files in your browser:
open reactivity-vue3/index.html
open vanilla/index.html
open vanilla-bench/index.html
```

### Vue project (requires npm)
```bash
cd vue-project
npm install
npm run dev
```

## 📖 What You Will Learn

- 🔍 **How reactivity works** - from basic concepts to advanced patterns
- 🎨 **Different APIs** - comparing Vue 2, Vue 3, Solid.js syntax
- ⚡ **Performance** - why some approaches are faster than others
- 🎯 **Fine-grained reactivity** - how to avoid unnecessary updates
- 🛠️ **Internal implementation** - how `ref()`, `reactive()`, `computed()` work

## 🔗 Useful Links

- [Vue 3 Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [JavaScript Proxy (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Solid.js Signals](https://www.solidjs.com/tutorial/introduction_signals)
- [Preact Signals](https://preactjs.com/guide/v10/signals/)

## 💡 Key Concepts

| Approach | Technology | Read | Write | Used in |
|----------|------------|------|-------|---------|
| Getter/Setter | `Object.defineProperty` | `state.value` | `state.value = x` | Vue 2 |
| Proxy | ES6 `Proxy` | `state.counter` | `state.counter = x` | Vue 3 reactive() |
| Ref | Getter/Setter + Proxy | `counter.value` | `counter.value = x` | Vue 3 ref() |
| Signals | Functions | `counter()` | `setCounter(x)` | Solid.js, Preact |

---

📝 **Note**: All examples are created for educational purposes. Some implementations are simplified for better understanding of concepts.

