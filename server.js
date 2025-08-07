// const fetch = require('node-fetch');
// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// // const { OpenAI } = require('openai')
// const app = express();

// let donations = [];
// let requests = [];

// app.use(bodyParser.json());
// app.use(express.static( 'public'));

// app.post('/api/chat', async (req, res) => {
//     const userMsg = req.body.userMsg;
//     try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', {

//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'gpt-3.5-turbo',
//                 messages: [{ role: 'user', content: userMsg }]
//             })
//         });
//         const data = await response.json();
//         if (data.choices && data.choices[0]) {
//             const reply = data.choices[0].message.content;
//             res.json({ reply });
//         } else {
//             res.json({ reply: 'Sorry, I could not generate a reply right now.' });
//         }

//         //  openai.chat.completions.create({model:'gpt-3.5-turbo',messages:[{role:"system", content:"You are a kind and helpful chatbot that guide people about food and donation, receiving help, hunger and charity."}, {role:"user",content:userMsg}]});
//         // const botReply = completion.choices[0].message.content;
//         // res.json({reply:botReply});
//     } catch (err) {
//         console.error("API ERROR", err.message,err);
//         res.status(500).json({ reply: "Sorry, something went wrong." });
//     }
// });

// app.post('/api/chat', (req, res) => {
//     const { message } = req.body.message.toLowerCase();
//     let reply = "Sorry, I didn't understand that.";

//     if (message.includes('how to get food')) {
//         reply = 'You can fill the form above to request food. We will try to connect you with nearby donors.';
//     } else if (message.includes('donate')) {
//         reply = 'Thanks! Please use the Donate a Meal form to let us know.';
//     } else if (message.includes('hello') || message.includes('hi')) {
//         reply = 'Hello! How can I help you today? You can request or donate a meal.';
//     }

//     res.json({ reply });
// });

// app.post('/api/request', (req, res) => {
//     requests.push(req.body);
//     console.log('New Meal Request:', req.body);
//     res.json({ status: 'success' });
// });

// app.post('/api/donate', (req, res) => {
//     donations.push(req.body);
//     console.log('New Donation:', req.body);
//     res.json({ status: 'success' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });





// ...........



// const fetch = require('node-fetch');
// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const app = express();

// let donations = [];
// let requests = [];

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.post('/api/chat', async (req, res) => {
//     const userMsg = req.body.userMsg?.toLowerCase() || "";

//     // Default replies for simple keywords
//     if (userMsg.includes('how to get food')) {
//         return res.json({ reply: 'You can fill the form above to request food. We will try to connect you with nearby donors.' });
//     } else if (userMsg.includes('donate')) {
//         return res.json({ reply: 'Thanks! Please use the Donate a Meal form to let us know.' });
//     } else if (userMsg.includes('hello') || userMsg.includes('hi')) {
//         return res.json({ reply: 'Hello! How can I help you today? You can request or donate a meal.' });
//     }

//     // Use OpenAI API for anything else
//     try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', {
//             method: 'POST',

//             headers: {
//                 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 model: 'gpt-3.5-turbo',
//                 messages: [
//                     { role: "system", content: "You are a kind and helpful chatbot that guides people about food donation, receiving help, hunger, and charity." },
//                     { role: "user", content: userMsg }],
//                 max_tokens: 100,
//                 temperature: 0.7,
//             }),
//         });

//         const data = await response.json();
//         console.log("OpenAI Response", JSON.stringify(data, null, 2));

//         if (data.choices && data.choices.length > 0) {
//             const reply = data.choices[0].message.content;
//             res.json({ reply });
//         } else {
//             console.log("OpenAI response:", data);

//             res.json({ reply: 'Sorry, I could not generate a reply right now.' });
//         }
//     } catch (err) {
//         console.error("API ERROR", err.message,);
//         res.status(500).json({ reply: "Sorry, something went wrong." });
//     }
// });

// app.post('/api/request', (req, res) => {
//     requests.push(req.body);
//     console.log('New Meal Request:', req.body);
//     res.json({ status: 'success' });
// });

// app.post('/api/donate', (req, res) => {
//     donations.push(req.body);
//     console.log('New Donation:', req.body);
//     res.json({ status: 'success' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// }
// import express from 'express';


// server.js
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Setup Gemini AI
console.log("API Key:", process.env.API_KEY);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// For handling file paths

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    console.log("Received message:=============?>", req.body);
    
    const { message } = req.body;
    const result = await model.generateContent(message);
    if((result) && result?.response) {
      const message = result.response?.candidates[0].content;
      console.log("Message from AI:", message);
      return res.json(result?.response);
    } 
    else {
      res.json({ status: false, data: null, message: "Response from AI is not valid. Please try again later."});
    }
    
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ reply: 'Sorry, I could not generate a reply.' });
  }
});

app.post('/api/request', (req, res) => {
  const data = req.body;
  console.log('Meal Request:', data);
  // Here you can save to DB if needed
  res.status(200).json({ message: 'Request received' });
});

app.post('/api/donate', (req, res) => {
  const data = req.body;
  console.log('Donation:', data);
  // Here you can save to DB if needed
  res.status(200).json({ message: 'Donation received' });
});
app.get('/',(req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
