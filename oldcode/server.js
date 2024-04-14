// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

app.post('/chatgpt', async (req, res) => {
    const prompt = req.body.prompt;
    
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003", // Or the latest available model
                prompt: prompt,
                temperature: 0.7,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
