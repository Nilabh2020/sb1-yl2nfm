import dotenv from 'dotenv';
import { startVoiceRecognition } from './voice.js';
import { setupCalendar } from './calendar.js';
import { setupLearning } from './learning.js';
import { setupTasks } from './tasks.js';
import express from 'express';

dotenv.config();

const app = express();
const port = 3000;

async function initJarvis() {
  console.log('Initializing JARVIS Mark 1...');
  
  // Initialize all modules
  await setupCalendar();
  await setupLearning();
  await setupTasks();
  
  // Start voice recognition
  startVoiceRecognition();
  
  console.log('JARVIS is ready and listening...');
}

app.get('/status', (req, res) => {
  res.json({ status: 'online', name: 'JARVIS' });
});

app.listen(port, () => {
  console.log(`JARVIS web interface running on port ${port}`);
  initJarvis();
});