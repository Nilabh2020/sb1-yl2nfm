import { getCalendarEvents, addCalendarEvent } from './calendar.js';
import { getLearning } from './learning.js';
import { manageTasks } from './tasks.js';
import { processNLP } from './nlp.js';

export async function processCommand(command) {
  // Calendar commands
  if (command.includes('schedule') || command.includes('calendar')) {
    return handleCalendarCommands(command);
  }
  
  // Task management
  if (command.includes('task') || command.includes('reminder')) {
    return manageTasks(command);
  }
  
  // Use local NLP for general queries
  return processNLP(command);
}

async function handleCalendarCommands(command) {
  if (command.includes('add') || command.includes('schedule')) {
    return addCalendarEvent(command);
  } else {
    return getCalendarEvents();
  }
}