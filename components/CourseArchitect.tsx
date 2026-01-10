
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Download, Loader2, ChevronLeft, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: "user" | "model" | "system";
    content: string;
}

const ID_PRINCIPLES = `You are an expert AI Instructional Designer and Course Creator for WE Learn (Women Experience Learn).
Your goal is to help users create high-quality, effective learning experiences specifically designed for women.
You MUST follow these frameworks:
1. ADDIE (Analyze, Design, Develop, Implement, Evaluate).
2. Bloom's Taxonomy (Ensure objectives are measurable and varied in cognitive depth).
3. Backward Design (Start with Learning Outcomes, then Assessments, then Content).`;

const INTERVIEW_PROMPT = `${ID_PRINCIPLES}

PHASE: ANALYZE (Diagnostic Interview)
Your goal is to gather information to build a Learner Profile and Course Strategy for a WE Learn course.
You need to know:
- Target Audience (Who are they? What do they already know?)
- Learning Goals (What should they be able to DO after the course?)
- Time Constraints (How long should the course be?)
- Delivery Context (Self-paced, cohort-based, etc.?)

Be friendly, conversational, and encouraging. Ask 1-2 questions at a time. Do not overwhelm the user.
If the user gives vague answers, probe gently for specifics.
Once you have enough information, output a special token "[[ANALYSIS_COMPLETE]]" followed by a summary of the profile.`;

interface CourseArchitectProps {
    onBack: () => void;
}

const CourseArchitect: React.FC<CourseArchitectProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<"interview" | "design" | "develop" | "done">("interview");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationHistory = useRef<{ role: string, content: string }[]>([]);

    const sendToGroq = async (userMessage: string, systemPrompt: string = INTERVIEW_PROMPT) => {
        const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is missing! Please add it to your .env.local file.");
        }

        conversationHistory.current.push({ role: "user", content: userMessage });

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...conversationHistory.current
                ],
                temperature: 0.7,
                max_tokens: 2048
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Groq API error: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0]?.message?.content || "I couldn't generate a response.";

        conversationHistory.current.push({ role: "assistant", content: assistantMessage });

        return assistantMessage;
    };

    useEffect(() => {
        const initChat = async () => {
            setIsLoading(true);
            const greeting = "Hello! I'm your WE Learn Course Architect. I'm here to help you build an amazing course tailored for our community. To get started, could you tell me a bit about what topic you want to teach and who your target audience is?";
            setMessages([{ id: 'init', role: 'model', content: greeting }]);
            setIsLoading(false);
        };
        initChat();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsLoading(true);

        try {
            const response = await sendToGroq(currentInput);

            if (response.includes("[[ANALYSIS_COMPLETE]]") && phase === "interview") {
                const parts = response.split("[[ANALYSIS_COMPLETE]]");
                const cleanResponse = parts[0] + "\n\n" + (parts[1] || "");

                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse
                }]);

                setPhase("design");
                setTimeout(() => triggerSyllabusGen(parts[1] || "Summary"), 1000);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: response
                }]);

                if (phase === "design" && (currentInput.toLowerCase().includes("approve") || currentInput.toLowerCase().includes("looks good"))) {
                    setPhase("develop");
                    setTimeout(triggerContentGen, 1000);
                }
            }
        } catch (error: any) {
            console.error("Groq Error:", error);
            const errorMsg = error.message?.includes("429")
                ? "The Architect is a bit overwhelmed (Rate Limit). Please wait a moment."
                : `Error: ${error.message || "Unknown error"}. Please check your API key.`;
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: errorMsg
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerSyllabusGen = async (summary: string) => {
        setIsLoading(true);
        setMessages(prev => [...prev, {
            id: "sys-design",
            role: "system",
            content: "Creating Course Syllabus based on Instructional Design principles..."
        }]);

        try {
            const prompt = `PHASE: DESIGN (Syllabus Creation). Based on this summary: ${summary}, create a detailed Course Syllabus in Markdown. Structure it with modules and learning objectives. Then ask for approval.`;
            const response = await sendToGroq(prompt, ID_PRINCIPLES);

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: response + "\n\n**Does this syllabus look good? Type 'Approve' to generate the full course content.**"
            }]);
        } catch (e: any) {
            console.error(e);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `Error generating syllabus: ${e.message || "Unknown error"}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const triggerContentGen = async () => {
        setIsLoading(true);
        setMessages(prev => [...prev, {
            id: "sys-develop",
            role: "system",
            content: "Generating full course content and NotebookLM sources (This may take a minute)..."
        }]);

        try {
            const prompt = `PHASE: DEVELOP (Asset Generation). Write the FULL CONTENT for this course. For each module: lecture notes, 3-5 quiz questions, and YouTube search queries. Format as a clean Markdown document.`;
            const response = await sendToGroq(prompt, ID_PRINCIPLES);

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: response
            }]);
            setPhase("done");
        } catch (e: any) {
            console.error(e);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `Error generating content: ${e.message || "Unknown error"}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadPack = () => {
        const lastModelMsg = messages.filter(m => m.role === "model").pop();
        if (!lastModelMsg) return;
        const blob = new Blob([lastModelMsg.content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "WE_Learn_Course_Architect_Pack.md";
        a.click();
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] mt-20 max-w-5xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden border-x border-white/5">
            <header className="p-6 border-b border-white/5 bg-white/2 backdrop-blur-md sticky top-0 flex items-center justify-between z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600/10 rounded-xl border border-blue-500/20">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="font-bold text-white tracking-tight">Course Architect</h2>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 flex items-center gap-2">
                                <span className={cn("w-2 h-2 rounded-full animate-pulse",
                                    phase === 'interview' ? 'bg-blue-500' :
                                        phase === 'design' ? 'bg-purple-500' :
                                            phase === 'develop' ? 'bg-orange-500' : 'bg-green-500'
                                )} />
                                {phase.replace(/-/g, ' ')}
                            </p>
                        </div>
                    </div>
                </div>
                {phase === "done" && (
                    <button onClick={downloadPack} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all hover:opacity-90 shadow-lg shadow-blue-900/40">
                        <Download className="w-4 h-4" />
                        Download Course Pack
                    </button>
                )}
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300", msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                            msg.role === 'user' ? "bg-white/10 border-white/10" : msg.role === 'system' ? "bg-blue-600/10 border-blue-500/20" : "bg-white/5 border-white/5")}>
                            {msg.role === 'user' ? <User className="w-5 h-5 text-white/60" /> : <Bot className="w-5 h-5 text-blue-400" />}
                        </div>
                        <div className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                            <div className={cn("p-5 rounded-2xl text-sm leading-relaxed shadow-xl prose prose-invert prose-sm max-w-none border",
                                msg.role === 'user' ? "bg-blue-600 border-blue-500 text-white" : msg.role === 'system' ? "bg-white/5 border-white/5 text-white/40 italic" : "bg-white/5 border-white/5 text-white/80")}>
                                {msg.role === 'system' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-widest p-4 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Architect is thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-white/2 border-t border-white/5">
                <div className="relative max-w-3xl mx-auto flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="Type your message..."
                        rows={1}
                        className="flex-1 bg-white/5 border border-white/10 focus:border-blue-600/50 focus:ring-0 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all resize-none min-h-[56px] max-h-32 outline-none"
                        disabled={isLoading || phase === 'done'}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim() || phase === 'done'}
                        className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/20 active:scale-95 shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseArchitect;
