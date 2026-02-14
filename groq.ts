/**
 * groq.ts — Shared Groq API service
 * Eliminates duplicated API logic across Hero and CourseArchitect.
 */

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export interface GroqMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export interface GroqOptions {
    systemPrompt: string;
    temperature?: number;
    maxTokens?: number;
    model?: string;
}

function getApiKey(): string {
    const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing! Please add VITE_GROQ_API_KEY to your .env.local file.");
    }
    return apiKey;
}

/**
 * Send a message to Groq and return the assistant's response.
 * Automatically manages conversation history via the passed-in ref.
 */
export async function sendToGroq(
    userMessage: string,
    history: GroqMessage[],
    options: GroqOptions
): Promise<string> {
    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiKey = isLocalDev ? getApiKey() : null;

    history.push({ role: "user", content: userMessage });

    const payload = {
        model: options.model || DEFAULT_MODEL,
        messages: [
            { role: "system", content: options.systemPrompt },
            ...history
        ],
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2048
    };

    // If we're not on localhost, use the secure backend proxy
    const targetUrl = isLocalDev ? GROQ_API_URL : "/api/chat";
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (isLocalDev && apiKey) {
        headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.error?.message || `Groq API error: ${response.status}`;
        throw new Error(msg);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "I couldn't generate a response.";

    history.push({ role: "assistant", content: assistantMessage });

    return assistantMessage;
}

/**
 * Format a Groq error for display to user.
 */
export function formatGroqError(error: any): string {
    if (error.message?.includes("429")) {
        return "The AI is a bit overwhelmed (Rate Limit). Please wait a moment and try again.";
    }
    return `Error: ${error.message || "Unknown error"}. Please check your API key.`;
}
