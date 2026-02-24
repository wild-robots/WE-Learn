
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, ChevronLeft, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, arrayUnion, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { sendToGroq, formatGroqError, MOCK_MODE, type GroqMessage } from '../groq';

import type { Bubble, UserPreferences, AgentPhase, MatchResult, BubbleHandoff } from '../api/lib/bubble-types';
import { validateHours, suggestGoals } from '../api/lib/bubble-validation';
import { findMatches } from '../api/lib/bubble-matching';
import { DISCOVERY_PROMPT, buildRealityCheckPrompt, buildMatchingPrompt, HANDOFF_PROMPT } from '../api/lib/bubble-prompts';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: "user" | "model" | "system";
    content: string;
}

interface BubbleAgentProps {
    onBack: () => void;
    onHandoff?: (data: BubbleHandoff) => void;
    initialContext?: string;
}

const EMPTY_PREFS: UserPreferences = {
    topic: null,
    level: null,
    goal: null,
    weeklyHours: null,
    selfStudyHours: null,
    preferredDays: [],
    preferredTimes: [],
};

const BubbleAgent: React.FC<BubbleAgentProps> = ({ onBack, onHandoff, initialContext }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phase, setPhase] = useState<AgentPhase>("discovery");
    const [userPrefs, setUserPrefs] = useState<UserPreferences>({ ...EMPTY_PREFS });
    const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
    const [placedBubbleId, setPlacedBubbleId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const conversationHistory = useRef<GroqMessage[]>([]);

    // --- Init ---
    useEffect(() => {
        const initChat = async () => {
            if (initialContext) {
                setIsLoading(true);
                try {
                    const contextMsg = `המשתמשת כבר דיברה על מה שהיא רוצה ללמוד. הנה מה שהיא אמרה: "${initialContext}". המשיכי משם — אל תחזרי על שאלות שכבר נענו. סכמי מה שאת יודעת ושאלי את השאלה הבאה.`;
                    const response = await sendToGroq(contextMsg, conversationHistory.current, {
                        systemPrompt: DISCOVERY_PROMPT,
                    });
                    setMessages([{ id: 'init', role: 'model', content: response }]);
                } catch {
                    setMessages([{ id: 'init', role: 'model', content: "היי! אני כאן כדי לעזור לך למצוא קבוצת למידה מושלמת. ספרי לי, מה את רוצה ללמוד?" }]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setMessages([{
                    id: 'init',
                    role: 'model',
                    content: "היי! אני סוכנת השיבוץ של WE Learn 🌟\n\nאני כאן כדי לעזור לך למצוא קבוצת למידה (\"בועה\") שמתאימה בדיוק לך — או לפתוח אחת חדשה.\n\nבואי נתחיל — מה את רוצה ללמוד?"
                }]);
            }
        };
        initChat();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // --- Auto-scroll ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // --- Get system prompt for current phase ---
    const getSystemPrompt = (): string => {
        switch (phase) {
            case "discovery":
                return DISCOVERY_PROMPT;
            case "reality_check": {
                const goals = userPrefs.goal === null && userPrefs.topic && userPrefs.weeklyHours
                    ? suggestGoals(userPrefs.topic, userPrefs.weeklyHours)
                    : undefined;
                return buildRealityCheckPrompt(userPrefs, goals);
            }
            case "matching":
                return buildMatchingPrompt(matchResults);
            case "handoff":
                return HANDOFF_PROMPT;
            default:
                return DISCOVERY_PROMPT;
        }
    };

    // --- Extract JSON after a marker ---
    const extractJson = (text: string, marker: string): any => {
        const parts = text.split(marker);
        if (parts.length < 2) return null;
        const jsonStr = parts[1]
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();
        return JSON.parse(jsonStr);
    };

    // --- Strip markers from display text ---
    const cleanResponse = (text: string): string => {
        return text
            .replace(/\[\[DISCOVERY_COMPLETE\]\][\s\S]*$/, '')
            .replace(/\[\[REALITY_CHECK_PASSED\]\][\s\S]*$/, '')
            .replace(/\[\[REALITY_CHECK_FAILED\]\][\s\S]*$/, '')
            .replace(/\[\[JOIN_BUBBLE\]\][\s\S]*$/, '')
            .replace(/\[\[WAITLIST_BUBBLE\]\][\s\S]*$/, '')
            .replace(/\[\[CREATE_NEW_BUBBLE\]\][\s\S]*$/, '')
            .replace(/\[\[HANDOFF_COMPLETE\]\][\s\S]*$/, '')
            .trim();
    };

    // --- Firestore: Fetch open bubbles ---
    const fetchBubbles = async (topic: string): Promise<Bubble[]> => {
        const q = query(
            collection(db, "bubbles"),
            where("status", "in", ["open", "full"])
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(d => ({
            bubble_id: d.id,
            ...d.data(),
        } as Bubble));
    };

    // --- Firestore: Join a bubble ---
    const joinBubble = async (bubbleId: string) => {
        if (!user) return;
        const ref = doc(db, "bubbles", bubbleId);
        await updateDoc(ref, {
            participants: arrayUnion(user.uid),
            participant_count: increment(1),
        });
        setPlacedBubbleId(bubbleId);
    };

    // --- Firestore: Add to waitlist ---
    const addToWaitlist = async (bubbleId: string) => {
        if (!user) return;
        const ref = doc(db, "bubbles", bubbleId);
        await updateDoc(ref, {
            waitlist: arrayUnion(user.uid),
            waitlist_count: increment(1),
        });
        setPlacedBubbleId(bubbleId);
    };

    // --- Firestore: Create new bubble ---
    const createNewBubble = async (): Promise<string> => {
        if (!user) throw new Error("Must be signed in");
        const docRef = await addDoc(collection(db, "bubbles"), {
            topic: (userPrefs.topic || "").toLowerCase(),
            level: userPrefs.level || "beginner",
            meeting_day: userPrefs.preferredDays[0] || "sunday",
            meeting_time: userPrefs.preferredTimes[0] || "18:00",
            goal_description: userPrefs.goal || "",
            participant_count: 1,
            participants: [user.uid],
            status: "open",
            waitlist: [],
            waitlist_count: 0,
            founder_id: user.uid,
            created_at: new Date(),
        });
        setPlacedBubbleId(docRef.id);
        return docRef.id;
    };

    // --- Trigger matching phase ---
    const triggerMatching = async () => {
        setIsLoading(true);
        setMessages(prev => [...prev, {
            id: "sys-matching",
            role: "system",
            content: "מחפשת בועות תואמות..."
        }]);

        try {
            const bubbles = await fetchBubbles(userPrefs.topic || "");
            const matches = findMatches(bubbles, userPrefs);
            setMatchResults(matches);
            setPhase("matching");

            const prompt = buildMatchingPrompt(matches);
            const response = await sendToGroq(
                "הצגי את תוצאות החיפוש",
                conversationHistory.current,
                { systemPrompt: prompt }
            );

            const display = cleanResponse(response);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: display,
            }]);

            // If no matches, auto-handle CREATE_NEW_BUBBLE
            if (response.includes("[[CREATE_NEW_BUBBLE]]") && matches.length === 0) {
                await handleCreateNew(display);
            }
        } catch (error: any) {
            console.error("Matching error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `שגיאה בחיפוש: ${error.message || "Unknown error"}`,
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handle creating a new bubble ---
    const handleCreateNew = async (contextMessage?: string) => {
        if (!user) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: "יש להתחבר כדי לפתוח בועה חדשה.",
            }]);
            return;
        }

        try {
            const newId = await createNewBubble();
            setPhase("handoff");

            const handoffData: BubbleHandoff = {
                bubble_id: newId,
                topic: userPrefs.topic || "",
                level: userPrefs.level || "beginner",
                goal: userPrefs.goal || "",
                weeklyHours: userPrefs.weeklyHours || 0,
                meeting_day: userPrefs.preferredDays[0] || "sunday",
                meeting_time: userPrefs.preferredTimes[0] || "18:00",
                participant_count: 1,
                user_id: user.uid,
            };

            // Generate handoff message
            const response = await sendToGroq(
                `הבועה נוצרה בהצלחה. מזהה: ${newId}. המשתמשת היא המייסדת.`,
                conversationHistory.current,
                { systemPrompt: HANDOFF_PROMPT }
            );

            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: cleanResponse(response),
            }]);

            onHandoff?.(handoffData);
        } catch (error: any) {
            console.error("Create bubble error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: `שגיאה ביצירת בועה: ${error.message}`,
            }]);
        }
    };

    // --- Main send handler ---
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
            const response = await sendToGroq(currentInput, conversationHistory.current, {
                systemPrompt: getSystemPrompt(),
            });

            // --- Phase: Discovery ---
            if (response.includes("[[DISCOVERY_COMPLETE]]") && phase === "discovery") {
                try {
                    const data = extractJson(response, "[[DISCOVERY_COMPLETE]]");
                    const prefs: UserPreferences = {
                        topic: data.topic || null,
                        level: data.level || null,
                        goal: data.goal || null,
                        weeklyHours: data.weeklyHours || null,
                        selfStudyHours: data.weeklyHours ? data.weeklyHours - 1.5 : null,
                        preferredDays: data.preferredDays || [],
                        preferredTimes: data.preferredTimes || [],
                    };
                    setUserPrefs(prefs);

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response) + "\n\n**בירור הצרכים הושלם!** בודקת ריאליות...",
                    }]);

                    // Auto-trigger reality check
                    setPhase("reality_check");
                    const validation = validateHours(prefs);

                    if (validation.valid) {
                        // Hours are fine — go straight to matching
                        const goals = prefs.goal === null && prefs.topic && prefs.weeklyHours
                            ? suggestGoals(prefs.topic, prefs.weeklyHours)
                            : undefined;

                        if (goals) {
                            // Need to ask about goals first
                            const rcPrompt = buildRealityCheckPrompt(prefs, goals);
                            const rcResponse = await sendToGroq(
                                "השעות מספיקות. המשתמשת צריכה לבחור מטרה.",
                                conversationHistory.current,
                                { systemPrompt: rcPrompt }
                            );
                            setMessages(prev => [...prev, {
                                id: Date.now().toString(),
                                role: "model",
                                content: cleanResponse(rcResponse),
                            }]);
                        } else {
                            // Hours valid + goal defined → go to matching
                            await triggerMatching();
                        }
                    } else {
                        // Hours insufficient — let reality check prompt handle it
                        const rcPrompt = buildRealityCheckPrompt(prefs);
                        const rcResponse = await sendToGroq(
                            `השעות שהוגדרו: ${prefs.weeklyHours}. ${validation.suggestion}`,
                            conversationHistory.current,
                            { systemPrompt: rcPrompt }
                        );
                        setMessages(prev => [...prev, {
                            id: Date.now().toString(),
                            role: "model",
                            content: cleanResponse(rcResponse),
                        }]);
                    }
                } catch (e) {
                    console.error("Discovery JSON parse error:", e);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response) + "\n\nלא הצלחתי לעבד את הנתונים. ננסה שוב — מה הנושא שאת רוצה ללמוד?",
                    }]);
                }
                return;
            }

            // --- Phase: Reality Check ---
            if (response.includes("[[REALITY_CHECK_PASSED]]") && phase === "reality_check") {
                try {
                    const data = extractJson(response, "[[REALITY_CHECK_PASSED]]");
                    setUserPrefs(prev => ({
                        ...prev,
                        goal: data.confirmedGoal || prev.goal,
                        weeklyHours: data.confirmedHours || prev.weeklyHours,
                        selfStudyHours: data.confirmedHours ? data.confirmedHours - 1.5 : prev.selfStudyHours,
                    }));

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response) + "\n\n**תיקוף עבר בהצלחה!** מחפשת בועות...",
                    }]);

                    await triggerMatching();
                } catch (e) {
                    console.error("Reality check JSON parse error:", e);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response),
                    }]);
                    await triggerMatching();
                }
                return;
            }

            if (response.includes("[[REALITY_CHECK_FAILED]]")) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse(response),
                }]);
                return;
            }

            // --- Phase: Matching decisions ---
            if (response.includes("[[JOIN_BUBBLE]]")) {
                try {
                    const data = extractJson(response, "[[JOIN_BUBBLE]]");
                    await joinBubble(data.bubble_id);
                    setPhase("handoff");

                    const handoffResponse = await sendToGroq(
                        `המשתמשת הצטרפה לבועה ${data.bubble_id}.`,
                        conversationHistory.current,
                        { systemPrompt: HANDOFF_PROMPT }
                    );

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response) + "\n\n" + cleanResponse(handoffResponse),
                    }]);

                    if (onHandoff && userPrefs.topic) {
                        const bubble = matchResults.find(m => m.bubble?.bubble_id === data.bubble_id)?.bubble;
                        onHandoff({
                            bubble_id: data.bubble_id,
                            topic: userPrefs.topic,
                            level: userPrefs.level || "beginner",
                            goal: userPrefs.goal || "",
                            weeklyHours: userPrefs.weeklyHours || 0,
                            meeting_day: bubble?.meeting_day || userPrefs.preferredDays[0] || "sunday",
                            meeting_time: bubble?.meeting_time || userPrefs.preferredTimes[0] || "18:00",
                            participant_count: (bubble?.participant_count || 0) + 1,
                            user_id: user?.uid || "",
                        });
                    }
                } catch (error: any) {
                    console.error("Join error:", error);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "system",
                        content: `שגיאה בהצטרפות: ${error.message}`,
                    }]);
                }
                return;
            }

            if (response.includes("[[WAITLIST_BUBBLE]]")) {
                try {
                    const data = extractJson(response, "[[WAITLIST_BUBBLE]]");
                    await addToWaitlist(data.bubble_id);
                    setPhase("handoff");

                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "model",
                        content: cleanResponse(response) + "\n\n**נרשמת לרשימת ההמתנה!** נעדכן אותך ברגע שיתפנה מקום.",
                    }]);
                } catch (error: any) {
                    console.error("Waitlist error:", error);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: "system",
                        content: `שגיאה בהרשמה לרשימת המתנה: ${error.message}`,
                    }]);
                }
                return;
            }

            if (response.includes("[[CREATE_NEW_BUBBLE]]")) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse(response),
                }]);
                await handleCreateNew();
                return;
            }

            if (response.includes("[[HANDOFF_COMPLETE]]")) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: "model",
                    content: cleanResponse(response),
                }]);
                return;
            }

            // --- Default: just show the response ---
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "model",
                content: response,
            }]);
        } catch (error: any) {
            console.error("Agent error:", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "system",
                content: formatGroqError(error),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Phase indicator ---
    const phaseLabels: Record<AgentPhase, string> = {
        discovery: "בירור צרכים",
        reality_check: "תיקוף ריאליות",
        matching: "חיפוש בועה",
        placement: "שיבוץ",
        handoff: "סיכום",
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] mt-20 max-w-5xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl overflow-hidden border-x border-white/5">
            {/* Header */}
            <header className="p-6 border-b border-white/5 bg-white/2 backdrop-blur-md sticky top-0 flex items-center justify-between z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-600/10 rounded-xl border border-purple-500/20">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-white tracking-tight">Bubble Agent</h2>
                                {MOCK_MODE && (
                                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full">
                                        Demo
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-white/40">{phaseLabels[phase]}</p>
                        </div>
                    </div>
                </div>
                {userPrefs.topic && (
                    <div className="hidden md:flex items-center gap-2 text-xs text-white/30">
                        <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{userPrefs.topic}</span>
                        {userPrefs.level && (
                            <span className="px-2 py-1 bg-white/5 rounded-lg border border-white/10">{userPrefs.level}</span>
                        )}
                    </div>
                )}
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn(
                        "flex gap-4 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300",
                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}>
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                            msg.role === 'user'
                                ? "bg-white/10 border-white/10"
                                : msg.role === 'system'
                                    ? "bg-purple-600/10 border-purple-500/20"
                                    : "bg-white/5 border-white/5"
                        )}>
                            {msg.role === 'user'
                                ? <User className="w-5 h-5 text-white/60" />
                                : <Bot className="w-5 h-5 text-purple-400" />
                            }
                        </div>
                        <div className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                            <div className={cn(
                                "p-5 rounded-2xl text-sm leading-relaxed shadow-xl prose prose-invert prose-sm max-w-none border",
                                msg.role === 'user'
                                    ? "bg-purple-600 border-purple-500 text-white"
                                    : msg.role === 'system'
                                        ? "bg-white/5 border-white/5 text-white/40 italic"
                                        : "bg-white/5 border-white/5 text-white/80"
                            )}>
                                {msg.role === 'system' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-widest p-4 animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        הסוכנת חושבת...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white/2 border-t border-white/5">
                <div className="relative max-w-3xl mx-auto flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder={phase === 'handoff' ? "שאלי שאלות נוספות..." : "כתבי כאן..."}
                        rows={1}
                        className="flex-1 bg-white/5 border border-white/10 focus:border-purple-600/50 focus:ring-0 rounded-2xl px-5 py-4 text-sm text-white placeholder-white/20 transition-all resize-none min-h-[56px] max-h-32 outline-none"
                        disabled={isLoading}
                        dir="rtl"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-purple-900/20 active:scale-95 shrink-0"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BubbleAgent;
