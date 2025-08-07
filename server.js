


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

