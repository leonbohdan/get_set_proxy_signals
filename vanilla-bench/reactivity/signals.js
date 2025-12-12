// Teacher's Notes: A minimal "signals" implementation.
// Core ideas:
// 1) Each signal owns a Set of subscribers (effects).
// 2) A global stack tracks the currently-running effect.
// 3) When a signal's getter runs while an effect is active, the effect is
//    recorded as a subscriber. This is dependency collection.
// 4) When the signal setter runs, we re-run all subscribers (push updates).

const effectStack = [];

export function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  const read = () => {
    const activeEffect = effectStack[effectStack.length - 1];
    // Teacher's Notes: If an effect is currently executing, we track it.
    // This is how "who depends on me?" gets built automatically.
    if (activeEffect) {
      subscribers.add(activeEffect);
    }
    return value;
  };

  const write = (nextValue) => {
    if (Object.is(nextValue, value)) return;
    value = nextValue;
    // Teacher's Notes: Notify subscribers (re-run effects).
    subscribers.forEach((effect) => effect());
  };

  return [read, write];
}

export function createEffect(fn) {
  const effect = () => {
    try {
      // Teacher's Notes: Push effect on the stack so signals can see it.
      effectStack.push(effect);
      fn();
    } finally {
      // Teacher's Notes: Pop when done to restore previous active effect.
      effectStack.pop();
    }
  };

  // Run once to establish initial dependencies.
  effect();

  return effect;
}

export default { createSignal, createEffect };

