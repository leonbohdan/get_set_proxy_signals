// Reactivity Engines: Getter/Setter, Proxy, Signals
// Teacher Comments inline to explain fine-grained behavior.

// --- Shared helper to measure DOM touches ---
function createDomCounter(updateCountEl, updateClassEl) {
  let total = 0;
  let classUpdates = 0;

  return {
    touchContent(value) {
      total += 1;
      updateCountEl(value, total, classUpdates);
    },
    touchClass(isTooBig) {
      total += 1;
      classUpdates += 1;
      updateClassEl(isTooBig, total, classUpdates);
    },
    getCounts() {
      return { total, classUpdates };
    }
  };
}

// --- Engine A: ES5 Getters/Setters ---
export function createGetterSetterEngine(updateCountEl, updateClassEl) {
  const domCounter = createDomCounter(updateCountEl, updateClassEl);
  const state = {};
  const watchers = [];

  Object.defineProperty(state, 'count', {
    enumerable: true,
    configurable: false,
    get() {
      return this._count;
    },
    set(val) {
      this._count = val;
      // Notify all watchers every time, even if derived value does not change
      watchers.forEach((fn) => fn(val));
    }
  });

  state._count = 0;

  function watch(fn) {
    watchers.push(fn);
  }

  function increment() {
    state.count = state.count + 1;
  }

  // Effects
  watch((newCount) => {
    domCounter.touchContent(newCount);
    const isTooBig = newCount > 10;
    // Teacher Comment: This engine recomputes and updates class on EVERY change,
    // even when isTooBig stays false, so class updates are noisy.
    domCounter.touchClass(isTooBig);
  });

  return { increment, getCounts: domCounter.getCounts };
}

// --- Engine B: Proxy ---
export function createProxyEngine(updateCountEl, updateClassEl) {
  const domCounter = createDomCounter(updateCountEl, updateClassEl);
  const watchers = [];

  const state = new Proxy({ count: 0 }, {
    set(target, key, value) {
      target[key] = value;
      // Proxy notifies on every set regardless of value equality
      watchers.forEach((fn) => fn(target[key]));
      return true;
    }
  });

  function watch(fn) {
    watchers.push(fn);
  }

  function increment() {
    state.count = state.count + 1;
  }

  watch((newCount) => {
    domCounter.touchContent(newCount);
    const isTooBig = newCount > 10;
    // Teacher Comment: Similar to getters/setters, this proxy-based reactive
    // update runs the class effect on every mutation — still coarse-grained.
    domCounter.touchClass(isTooBig);
  });

  return { increment, getCounts: domCounter.getCounts };
}

// --- Engine C: Signals (Fine-Grained) ---
// Minimal signal system: createSignal, createEffect, createComputed
let activeEffect = null;

function createSignal(initial) {
  let value = initial;
  const dependents = new Set();

  const read = () => {
    if (activeEffect) dependents.add(activeEffect);
    return value;
  };

  const write = (next) => {
    if (next === value) return; // equality short-circuit for primitive values
    value = next;
    dependents.forEach((effect) => effect());
  };

  return [read, write];
}

function createEffect(fn) {
  const effect = () => {
    const prev = activeEffect;
    activeEffect = effect;
    try {
      fn();
    } finally {
      activeEffect = prev;
    }
  };
  effect();
}

function createComputed(fn) {
  const [get, set] = createSignal(undefined);
  createEffect(() => {
    const next = fn();
    // Teacher Comment: Computed only writes when the derived value changes,
    // so dependents (like class updates) skip redundant runs.
    set(next);
  });
  return get;
}

export function createSignalEngine(updateCountEl, updateClassEl) {
  const domCounter = createDomCounter(updateCountEl, updateClassEl);
  const [count, setCount] = createSignal(0);
  const isTooBig = createComputed(() => count() > 10);

  createEffect(() => {
    domCounter.touchContent(count());
  });

  createEffect(() => {
    domCounter.touchClass(isTooBig());
  });

  function increment() {
    setCount(count() + 1);
  }

  return { increment, getCounts: domCounter.getCounts };
}

// Expose helpers for the UI script
export const engines = {
  GetterSetter: createGetterSetterEngine,
  Proxy: createProxyEngine,
  Signals: createSignalEngine
};
