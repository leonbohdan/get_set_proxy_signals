// Teacher's Notes: ES6 Proxy-based reactivity.
// - The proxy intercepts GET/SET so we can observe both existing and newly
//   added properties (something legacy defineProperty cannot do).
// - Nested objects are lazily wrapped as they are accessed, enabling deep
//   reactivity without pre-walking the whole tree.

export function makeReactiveProxy(target, callback) {
  if (typeof target !== 'object' || target === null) {
    throw new TypeError('makeReactiveProxy expects a plain object.');
  }

  const cache = new WeakMap();

  const wrap = (value) => {
    if (typeof value !== 'object' || value === null) return value;
    if (cache.has(value)) return cache.get(value);
    const proxied = new Proxy(value, handler);
    cache.set(value, proxied);
    return proxied;
  };

  const handler = {
    // Teacher's Notes (get trap):
    // - We use GET to lazily wrap nested objects so they become reactive
    //   only when accessed. This keeps memory usage in check.
    get(obj, key, receiver) {
      const value = Reflect.get(obj, key, receiver);
      return wrap(value);
    },

    // Teacher's Notes (set trap):
    // - Any assignment (new or existing key) is visible here.
    // - After writing, we notify our "render" callback.
    set(obj, key, value, receiver) {
      const oldValue = obj[key];
      const result = Reflect.set(obj, key, value, receiver);
      if (oldValue !== value) {
        callback({ key, newValue: value, oldValue, target: obj });
      }
      return result;
    },

    deleteProperty(obj, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(obj, key);
      const oldValue = obj[key];
      const result = Reflect.deleteProperty(obj, key);
      if (hadKey) {
        callback({ key, newValue: undefined, oldValue, target: obj, deleted: true });
      }
      return result;
    },
  };

  return wrap(target);
}

export default makeReactiveProxy;

