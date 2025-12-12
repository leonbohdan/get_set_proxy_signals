// Import examples
import * as example01 from './examples/01-basic_01.js';
import * as example01_01 from './examples/01-basic_02.js';
import * as example02 from './examples/02-getter-setter_01.js';
import * as example03_01 from './examples/03-proxy_01.js';
import * as example03_02 from './examples/03-proxy_02.js';
import * as example03_03 from './examples/03-proxy_03.js';
import * as example03_04 from './examples/03-proxy_04.js';
import * as example04 from './examples/04-signals.js';

const counterButton = document.querySelector('button#counter');
const resetButton = document.querySelector('button#reset');

// List of available examples
const examples = [
  { name: '01 - Basic (Manual)', module: example01 },
  { name: '01.1 - Basic with useCounter', module: example01_01 },
  { name: '02 - Getter/Setter', module: example02 },
  { name: '03 - Proxy', module: example03_01 },
  { name: '03.1 - ref() Implementation', module: example03_02 },
  { name: '03.2 - Vue 3 ref (CDN)', module: example03_03 },
  { name: '03.3 - Fine-grained (Vue 3)', module: example03_04 },
  { name: '04 - Signal', module: example04 },
];

let currentCleanup = null;
let currentExampleIndex = 0;

function loadExample(index) {
  // Cleanup previous example
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  // Remove all event listeners by cloning buttons
  const newCounterButton = counterButton.cloneNode(true);
  const newResetButton = resetButton.cloneNode(true);
  counterButton.replaceWith(newCounterButton);
  resetButton.replaceWith(newResetButton);

  // Update references
  const updatedCounterButton = document.querySelector('button#counter');
  const updatedResetButton = document.querySelector('button#reset');

  // Load new example
  const example = examples[index];
  console.log(`Loading: ${example.name}`);
  
  if (example.module && example.module.init) {
    currentCleanup = example.module.init(updatedCounterButton, updatedResetButton);
  }

  currentExampleIndex = index;
  updateTitle();
}

function updateTitle() {
  const title = document.querySelector('h1');
  if (title) {
    title.textContent = `${examples[currentExampleIndex].name}`;
  }
}

// Initial load
loadExample(0);

// Add keyboard navigation for demo
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'n') {
    // Next example
    const nextIndex = (currentExampleIndex + 1) % examples.length;
    loadExample(nextIndex);
  } else if (e.key === 'ArrowLeft' || e.key === 'p') {
    // Previous example
    const prevIndex = (currentExampleIndex - 1 + examples.length) % examples.length;
    loadExample(prevIndex);
  }
});
