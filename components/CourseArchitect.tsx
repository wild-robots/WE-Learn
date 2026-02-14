
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Download, Loader2, ChevronLeft, Bot, Rocket } from 'lucide-react';
import { createCourse } from '../classroom';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { sendToGroq, formatGroqError, type GroqMessage } from '../groq';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: "user" | "model" | "system";
    content: string;
}

const ID_PRINCIPLES = `You are an expert AI Instructional Designer and Course Creator.
Your goal is to help users create high-quality, effective learning experiences.
You MUST follow these frameworks:
1. ADDIE (Analyze, Design, Develop, Implement, Evaluate).
2. Bloom's Taxonomy.
3. Backward Design.`;

const INTERVIEW_PROMPT = `${ID_PRINCIPLES}

PHASE: ANALYZE (Diagnostic Interview)
Your goal is to gather information to build a Learner Profile and Course Strategy.
Ask friendly questions to understand:
- Topic & Target Audience
- Learning Goals
- Time Constraints
- Delivery Method

When you have enough info, output EXACTLY this format:
[[ANALYSIS_COMPLETE]]
{
  "summary": "Full summary of the analysis...",
  "recommended_title": "Suggested Course Title",
  "recommended_description": "Short description for the course card",
  "category": "E.g. Technology, Business, Design, Health, etc.",
  "level": "Beginner or Intermediate or Advanced",
  "duration": "E.g. 4 weeks, 6 weeks"
}
`;

interface CourseArchitectProps {
    onBack: () => void;
    initialContext?: string; // Context from Hero chatbot conversation
}

const CourseArchitect: React.FC<CourseArchitectProps> = ({ onBack, initialContext }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<"interview" | "design" | "develop" | "done">("interview");
    const [isLaunching, setIsLaunching] = useState(false);
    const [courseMetadata, setCourseMetadata] = useState<{
        title: string;
        description: string;
        category: string;
        level: string;
        duration: string;
    } | null>(null);
    const [whatsappLink, setWhatsappLink] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationHistory = useRef<GroqMessage[]>([]);

    useEffect(() => {
        const initChat = async () => {
            if (initialContext) {
                // Fix #3: Carry over context from Hero chatbot
                const contextMsg = `The user has already discussed their course idea. Here's what they said: "${initialContext}". Continue from here — don't repeat questions they already answered. Summarize what you know and ask any remaining questions.`;
                setIsLoading(true);
                try {
                    const response = await sendToGroq(contextMsg, conversationHistory.current, {
                        systemPrompt: INTERVIEW_PROMPT,
                    });
                    setMessages([{ id: 'init', role: 'model', content: response }]);
                } catch (e) {
                    setMessages([{ id: 'init', role: 'model', content: "Hello! I'm your WE Learn Course Agent. Tell me about the course you'd like to create." }]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                const greeting = "Hello! I'm your WE Learn Course Agent. I'm here to help you build an amazing course. To get started, could you tell me a bit about what topic you want to teach and who your target audience is?";
                setMessages([{ id: 'init', role: 'model', content: greeting }]);
            }
        };
        initChat();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            const systemPrompt = phase === "interview" ? INTERVIEW_PROMPT : ID_PRINCIPLES;
            const response = await sendToGroq(currentInput, conversationHistory.current, {
                systemPrompt,
            });

            if (response.includes("[[ANALYSIS_COMPLETE]]") && phase === "interview") {
                try {
                    const parts = response.split("[[ANALYSIS_COMPLETE]]");
                    const jsonStr = parts[1].replace(/```json/g, '').replace(/```/g, '').trim();
                    const metadata = JSON.parse(jsonStr);

                    setCourseMetadata({
                        title: metadata.recommended_title || "Untitled Course",
                        description: metadata.recommended_description || "A new learning experience.",
                        category: metadata.category || "General",
                        level: metadata.level || "Beginner",
                        duration: metadata.duration || "4 weeks",
                    });

                    const cleanResponse = parts[0] + `\n\n**Analysis Complete!**\nI've designed a strategy for **"${metadata.recommended_title}"**.\n\n` + metadata.summary;

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse
                    }]);

                    setPhase("design");
                    setTimeout(() => triggerSyllabusGen(metadata.summary), 1000);
                } catch (e) {
                    console.error("JSON Parse Error", e);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: response + "\n\nI couldn't verify the analysis format. Moving to design phase..."
                    }]);
                    setPhase("design");
                    setTimeout(() => triggerSyllabusGen("Course Analysis (Fallback)"), 1000);
                }
            } else if (response.includes("[[SYLLABUS_APPROVED]]")) {
                setPhase("develop");
                const cleanResponse = response.replace("[[SYLLABUS_APPROVED]]", "");
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse
                }]);
                setTimeout(triggerContentGen, 1000);
            } else if (response.includes("[[READY_TO_LAUNCH]]")) {
                setPhase("done");
                const cleanResponse = response.replace("[[READY_TO_LAUNCH]]", "\n\n**Content Generation Complete!** You can now Launch your cohort or keep chatting to refine.");
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: response
                }]);
            }
        } catch (error: any) {
            console.error("Groq Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: formatGroqError(error)
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
            const prompt = `PHASE: DESIGN (Syllabus Creation). 
Based on this summary: ${summary}, create a detailed Course Syllabus in Markdown.

CRITICAL INSTRUCTION:
If the user previously said "yes", "looks good", or "approve", output [[SYLLABUS_APPROVED]] immediately.
Otherwise, ask for their approval. Tell them: "If this looks good, just say 'Approve' and I will build the course."

When the user eventually says "Approve" (or similar), you MUST output [[SYLLABUS_APPROVED]] in your response.`;

            const response = await sendToGroq(prompt, conversationHistory.current, {
                systemPrompt: ID_PRINCIPLES,
            });

            if (response.includes("[[SYLLABUS_APPROVED]]")) {
                setPhase("develop");
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: response.replace("[[SYLLABUS_APPROVED]]", "")
                }]);
                setTimeout(triggerContentGen, 1000);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: response + "\n\n**Does this syllabus look good? Type 'Approve' to generate the full course content.**"
                }]);
            }
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
            content: "Generating full course content (this may take a minute)..."
        }]);

        try {
            const prompt = `PHASE: DEVELOP (Asset Generation). 
Write the FULL CONTENT for this course (Markdown).
Include:
- Module breakdown
- Lecture notes
- Quiz questions

AT THE END, output: [[READY_TO_LAUNCH]]`;

            const response = await sendToGroq(prompt, conversationHistory.current, {
                systemPrompt: ID_PRINCIPLES,
                maxTokens: 4096,
            });

            const cleanResponse = response.replace("[[READY_TO_LAUNCH]]", "");

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: cleanResponse
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
        a.download = "WE_Learn_Course_Pack.md";
        a.click();
    };

    // Fix #1: Write ALL required fields to Firestore so cards render correctly
    const handleLaunch = async () => {
        if (!user) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: "⚠️ **You must be signed in to launch a cohort.**"
            }]);
            return;
        }

        setIsLaunching(true);
        try {
            const title = courseMetadata?.title || "New WE Learn Cohort";
            const description = courseMetadata?.description || "A new cohort-based learning experience.";

            const course = await createCourse({ name: title, description });

            try {
                await addDoc(collection(db, "cohorts"), {
                    // Google Classroom fields
                    googleClassroomId: course.id,
                    enrollmentCode: course.enrollmentCode,
                    alternateLink: course.alternateLink,
                    // Core display fields (Fix #1 — all required by CohortCard/CohortDetail)
                    title: course.name || title,
                    description: description,
                    category: courseMetadata?.category || "General",
                    level: courseMetadata?.level || "Beginner",
                    duration: courseMetadata?.duration || "4 weeks",
                    tutor: user.displayName || "Course Guide",
                    members: [user.uid],
                    maxMembers: 25,
                    successRate: "N/A",
                    schedule: "Self-paced",
                    startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    progress: 0,
                    // Metadata
                    creatorId: user.uid,
                    creatorName: user.displayName || "Unknown Guide",
                    createdAt: new Date(),
                    status: 'OPEN',
                    whatsappLink: whatsappLink || null
                });
            } catch (fsError) {
                console.error("Firestore save failed:", fsError);
            }

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `🚀 **Cohort Launched!** \n\n**Classroom created:** ${course.name}\n**Enrollment Code:** \`${course.enrollmentCode}\`\n**Link:** [Open Google Classroom](${course.alternateLink})\n\n_Your cohort is now live and visible on the homepage._`
            }]);
        } catch (error: any) {
            console.error("Launch failed:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `❌ **Launch Failed:** ${error.message}`
            }]);
        } finally {
            setIsLaunching(false);
        }
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
                            <h2 className="font-bold text-white tracking-tight">Course Agent</h2>
                            {courseMetadata && (
                                <p className="text-xs text-white/40">{courseMetadata.title}</p>
                            )}
                        </div>
                    </div>
                </div>
                {phase === "done" && (
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Optional: WhatsApp Invite Link"
                            value={whatsappLink}
                            onChange={(e) => setWhatsappLink(e.target.value)}
                            className="hidden md:block w-48 lg:w-64 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-green-500/50 outline-none transition-all"
                        />
                        <div className="flex gap-2">
                            <button onClick={downloadPack} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold transition-all hover:bg-white/10">
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                            <button onClick={handleLaunch} disabled={isLaunching} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl text-xs font-bold transition-all hover:opacity-90 shadow-lg shadow-blue-900/40 disabled:opacity-50">
                                {isLaunching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                                Launch Cohort
                            </button>
                        </div>
                    </div>
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
                        Agent is thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Fix #16: Keep input enabled in done phase for follow-up questions */}
            <div className="p-6 bg-white/2 border-t border-white/5">
                <div className="relative max-w-3xl mx-auto flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder={phase === 'done' ? "Ask follow-up questions or refine your course..." : "Type your message..."}
                        rows={1}
                        className="flex-1 bg-white/5 border border-white/10 focus:border-blue-600/50 focus:ring-0 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all resize-none min-h-[56px] max-h-32 outline-none"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
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
