const User = require('../models/User');
const { OpenAI } = require('openai'); // Destructure to get OpenAI class
require('dotenv').config(); // Load environment variables

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.createUser = async (req, res) => {
   try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

exports.getUsers = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const retryRequest = async (func, retries = 5, delay = 1000) => {
   try {
     return await func(); // Try to call the function
   } catch (error) {
     if (retries > 0 && error.response?.status === 429) {
       console.log('Rate limit exceeded. Retrying...');
       await new Promise(resolve => setTimeout(resolve, delay)); // Exponential backoff
       return retryRequest(func, retries - 1, delay * 2); // Retry the function
     }
     throw error; // Throw error if retries are exhausted or not a 429 error
   }
};
 
exports.chatWithOpenAI = async (req, res) => {
 
   const { prompt } = req.body;
 
   try {
     // Use retryRequest to handle rate limiting
     const response = await retryRequest(() =>
       openai.chat.completions.create({
         model: 'gpt-3.5-turbo', // Ensure you use a correct model like gpt-3.5-turbo
         messages: [{ role: 'user', content: prompt }], // Send the prompt to OpenAI
       })
     );
 
     // Return the structured reply in JSON format
     res.status(200).json({ reply: response.choices[0].message.content.trim() });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };

