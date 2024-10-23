import { spawn } from 'child_process';
import say from 'say';
import { processCommand } from './commands.js';

export function startVoiceRecognition() {
  const recognition = spawn('node-record-lts');
  
  recognition.stdout.on('data', async (data) => {
    const command = data.toString().toLowerCase();
    
    if (command.includes('jarvis learn')) {
      await handleLearningMode(command);
    } else {
      const response = await processCommand(command);
      speak(response);
    }
  });
}

function speak(text) {
  say.speak(text, 'Alex', 1.0); // Using 'Alex' voice with normal speed
}

async function handleLearningMode(command) {
  const learningContent = command.replace('jarvis learn', '').trim();
  if (!learningContent) {
    speak("What would you like me to learn?");
    return;
  }
  
  try {
    await saveLearning(learningContent);
    speak("I've learned this new information. You can ask me about it anytime.");
  } catch (error) {
    speak("I apologize, but I couldn't process that learning request.");
    console.error('Learning error:', error);
  }
}

async function saveLearning(content) {
  // This will be implemented in learning.js
  const event = new CustomEvent('learning', { detail: content });
  window.dispatchEvent(event);
}