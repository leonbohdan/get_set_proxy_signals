// Teacher's Notes: ES5-era reactivity powered by Object.defineProperty.
// - We redefine existing properties with custom getters/setters.
// - This captures assignments to existing keys, but cannot see new keys
//   that are added later (one of the core limitations we want to show).
// - No proxy magic here; the shape of the object must be known up-front.

export function makeReactiveLegacy(target, callback) {
  if (typeof target !== 'object' || target === null) {
    throw new TypeError('makeReactiveLegacy expects a plain object.');
  }

  const wrapProperty = (obj, key) => {
    let value = obj[key];

    // Teacher's Notes: getter simply exposes the stored value.
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        const oldValue = value;
        value = newValue;
        // Teacher's Notes: setter is our "render trigger" point.
        callback({ key, newValue, oldValue, target: obj });
      },
    });
  };

  // Only wrap properties that already exist; additions will be invisible.
  Object.keys(target).forEach((key) => wrapProperty(target, key));

  return target;
}

export default makeReactiveLegacy;

