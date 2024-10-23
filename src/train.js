import { trainNLP } from './nlp.js';

async function initializeTraining() {
  console.log('Starting JARVIS training...');
  await trainNLP();
  console.log('JARVIS training completed!');
  process.exit(0);
}

initializeTraining();