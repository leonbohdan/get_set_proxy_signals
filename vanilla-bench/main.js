import makeReactiveLegacy from './reactivity/legacy.js';
import makeReactiveProxy from './reactivity/proxy.js';
import { createSignal, createEffect } from './reactivity/signals.js';

const ITERATIONS = 1000;

const sections = ['legacy', 'proxy', 'signals'].reduce((acc, name) => {
  const root = document.querySelector(`[data-section="${name}"]`);
  acc[name] = {
    root,
    finalEl: root.querySelector('[data-final]'),
    renderEl: root.querySelector('[data-render]'),
    jsTimeEl: root.querySelector('[data-js-time]'),
  };
  return acc;
}, {});

const formatMs = (ms) => ms.toFixed(2);

const updateUI = (name, { finalValue, renderCount, jsTime }) => {
  const view = sections[name];
  view.finalEl.textContent = finalValue;
  view.renderEl.textContent = renderCount;
  view.jsTimeEl.textContent = formatMs(jsTime);
};

const resetUI = () => {
  Object.keys(sections).forEach((name) => {
    updateUI(name, { finalValue: '—', renderCount: '—', jsTime: 0 });
  });
};

const benchLegacy = () => {
  let renderCount = 0;
  const state = makeReactiveLegacy({ count: 0 }, () => {
    renderCount += 1;
    sections.legacy.renderEl.textContent = renderCount;
    sections.legacy.finalEl.textContent = state.count;
  });

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i += 1) {
    state.count += 1;
    // Teacher's Notes: Adding a new key will NOT trigger the callback.
    if (i === ITERATIONS - 1) {
      state.addedLater = i; // silent in legacy mode
    }
  }
  const jsTime = performance.now() - start;

  updateUI('legacy', {
    finalValue: state.count,
    renderCount,
    jsTime,
  });
};

const benchProxy = () => {
  let renderCount = 0;
  const state = makeReactiveProxy({ nested: { count: 0 } }, () => {
    renderCount += 1;
    sections.proxy.renderEl.textContent = renderCount;
    sections.proxy.finalEl.textContent = state.nested.count;
  });

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i += 1) {
    state.nested.count += 1; // deep path works because of get trap wrapping
    if (i === Math.floor(ITERATIONS / 2)) {
      state.nested.extra = 'added mid-flight'; // observable in Proxy land
    }
  }
  const jsTime = performance.now() - start;

  updateUI('proxy', {
    finalValue: state.nested.count,
    renderCount,
    jsTime,
  });
};

const benchSignals = () => {
  let renderCount = 0;
  const [getCount, setCount] = createSignal(0);

  // Teacher's Notes: createEffect pushes itself on the global stack.
  // When getCount() runs, it subscribes this effect to future updates.
  createEffect(() => {
    const value = getCount();
    renderCount += 1;
    sections.signals.renderEl.textContent = renderCount;
    sections.signals.finalEl.textContent = value;
  });

  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i += 1) {
    setCount(getCount() + 1);
  }
  const jsTime = performance.now() - start;

  updateUI('signals', {
    finalValue: getCount(),
    renderCount,
    jsTime,
  });
};

const runAll = () => {
  benchLegacy();
  benchProxy();
  benchSignals();
};

document.querySelector('#run-all').addEventListener('click', runAll);

// Kick off an initial run for instant feedback.
resetUI();
runAll();

