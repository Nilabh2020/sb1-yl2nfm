import { NlpManager } from 'node-nlp';

const manager = new NlpManager({ languages: ['en'] });

// Train basic responses
export async function trainNLP() {
  // General conversations
  manager.addDocument('en', 'hello', 'greetings');
  manager.addDocument('en', 'hi', 'greetings');
  manager.addDocument('en', 'good morning', 'greetings');
  manager.addAnswer('en', 'greetings', 'Hello! How can I assist you today?');

  // Time and date
  manager.addDocument('en', 'what time is it', 'time');
  manager.addDocument('en', 'tell me the time', 'time');
  manager.addAnswer('en', 'time', `The current time is ${new Date().toLocaleTimeString()}`);

  // Calculations
  manager.addDocument('en', 'calculate *', 'math');
  manager.addDocument('en', 'what is * plus *', 'math');
  manager.addDocument('en', 'what is * minus *', 'math');
  
  // Lab assistance
  manager.addDocument('en', 'help me with the lab', 'lab');
  manager.addDocument('en', 'lab assistance', 'lab');
  manager.addAnswer('en', 'lab', 'I can help you with lab calculations and measurements. What specific task do you need help with?');

  await manager.train();
  console.log('NLP training completed');
}

export async function processNLP(text) {
  try {
    const response = await manager.process('en', text);
    
    if (response.intent === 'math') {
      return handleMathCalculation(text);
    }
    
    return response.answer || "I'm not sure how to respond to that yet. You can teach me by saying 'JARVIS learn'";
  } catch (error) {
    console.error('NLP error:', error);
    return "I apologize, but I'm having trouble understanding that.";
  }
}

function handleMathCalculation(text) {
  try {
    // Basic safety check to prevent code injection
    if (!/^[\d\s+\-*/().]+$/.test(text.replace(/calculate|what is/gi, ''))) {
      return "I can only perform basic mathematical calculations.";
    }
    
    const expression = text
      .replace(/calculate|what is/gi, '')
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '*')
      .replace(/divided by/g, '/');
      
    return `The result is ${eval(expression)}`;
  } catch {
    return "I couldn't process that calculation. Please try again with simple arithmetic.";
  }
}