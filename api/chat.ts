
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not configured on the server.' });
    }

    try {
        const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (error: any) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ error: 'Failed to communicate with Groq API' });
    }
}
