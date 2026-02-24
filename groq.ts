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

/** True when VITE_GROQ_API_KEY is not configured — enables scripted demo responses. */
export const MOCK_MODE = !(import.meta as any).env.VITE_GROQ_API_KEY;

function getApiKey(): string {
    const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing! Please add VITE_GROQ_API_KEY to your .env.local file.");
    }
    return apiKey;
}

/**
 * Scripted responses for demo / no-key mode.
 * Detects the current agent phase from system prompt markers and
 * walks through the discovery → reality-check → matching → handoff flow.
 */
function getMockResponse(userMessage: string, history: GroqMessage[], options: GroqOptions): string {
    const sys = options.systemPrompt;

    // --- Handoff phase ---
    if (sys.includes('[[HANDOFF_COMPLETE]]')) {
        return 'כל הכבוד! 🎉 הבועה שלך נוצרה בהצלחה.\n\nנשמח לעדכן אותך כשחברות נוספות יצטרפו. בהצלחה בלמידה!\n\n[[HANDOFF_COMPLETE]]';
    }

    // --- Matching: with candidates ---
    if (sys.includes('[[JOIN_BUBBLE]]')) {
        if (userMessage === 'הצגי את תוצאות החיפוש') {
            return 'מצאתי בועה שיכולה להתאים לך! קבוצה פעילה בנושא שבחרת. תרצי להצטרף אליהן?';
        }
        // User confirmed → create new (simplest demo path, avoids needing a real bubble_id)
        return 'נהדר! מכינה לך מקום 🎉\n\n[[CREATE_NEW_BUBBLE]]';
    }

    // --- Matching: no candidates ---
    if (sys.includes('[[CREATE_NEW_BUBBLE]]')) {
        return 'לא מצאתי כרגע בועה פתוחה שמתאימה בדיוק לך.\n\nאבל זו הזדמנות מצוינת להיות מייסדת! נפתח בועה חדשה ונמצא נשות למידה שיצטרפו אלייך.\n\n[[CREATE_NEW_BUBBLE]]';
    }

    // --- Reality check phase ---
    if (sys.includes('[[REALITY_CHECK_PASSED]]')) {
        // Internal auto-call from discovery handler — ask about goal
        if (userMessage.startsWith('השעות מספיקות') || userMessage.startsWith('השעות שהוגדרו')) {
            return 'נשמע מעולה! מה המטרה שלך?\n\n1. היכרות עם התחום\n2. פרויקט מעשי לתיק עבודות\n3. הכנה להסמכה מקצועית';
        }
        // User responded to goal question → pass
        const hoursMatch = sys.match(/(\d+\.?\d*) שעות בשבוע/);
        const hours = Math.max(3, hoursMatch ? parseFloat(hoursMatch[1]) : 3);
        return `מצוין! בואי נמצא לך בועה 🔍\n\n[[REALITY_CHECK_PASSED]]\n\`\`\`json\n{"confirmedGoal":"ללמוד ולהתפתח","confirmedHours":${hours}}\n\`\`\``;
    }

    // --- Discovery phase ---
    // Count how many assistant turns have already been recorded (before this response)
    const assistantTurns = history.filter(m => m.role === 'assistant').length;

    if (assistantTurns <= 0) {
        return '(מצב הדגמה 🟡) מה רמת הניסיון שלך — מתחילה, בינונית, או מתקדמת?';
    }
    if (assistantTurns === 1) {
        return 'כמה שעות בשבוע את יכולה להקדיש ללמידה? (כולל מפגש קבוצתי של 90 דקות)';
    }

    // Turn 2+: emit DISCOVERY_COMPLETE
    // Extract topic from initContext message or first real user message
    const initMsg = history.find(m => m.role === 'user' && m.content.startsWith('המשתמשת כבר דיברה'));
    let topic: string;
    if (initMsg) {
        const m = initMsg.content.match(/"([^"]+)"/);
        topic = (m?.[1] ?? 'עיצוב').toLowerCase().slice(0, 25);
    } else {
        const firstUser = history.find(m => m.role === 'user');
        topic = (firstUser?.content ?? 'עיצוב').toLowerCase().trim().slice(0, 25);
    }
    const lastUserContent = [...history].filter(m => m.role === 'user').pop()?.content ?? '3';
    const hours = Math.max(3, parseInt(lastUserContent) || 3);

    return `קיבלתי את כל המידע שצריך!\n\n[[DISCOVERY_COMPLETE]]\n\`\`\`json\n${JSON.stringify({
        topic,
        level: 'beginner',
        goal: null,
        weeklyHours: hours,
        preferredDays: ['sunday'],
        preferredTimes: ['18:00'],
    }, null, 2)}\n\`\`\``;
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
    history.push({ role: "user", content: userMessage });

    // --- Mock mode: return scripted response when API key is not configured ---
    if (MOCK_MODE) {
        await new Promise(resolve => setTimeout(resolve, 500)); // simulate latency
        const mockResponse = getMockResponse(userMessage, history, options);
        history.push({ role: "assistant", content: mockResponse });
        return mockResponse;
    }

    const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiKey = isLocalDev ? getApiKey() : null;

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
