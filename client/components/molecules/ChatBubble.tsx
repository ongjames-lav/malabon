"use client";

import { motion } from "framer-motion";
import { User, Sparkles } from "lucide-react";

interface ChatBubbleProps {
    id?: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

// Simple markdown-like renderer for chat messages
function formatContent(text: string) {
    // Split by newlines, then process each line
    const lines = text.split("\n");
    return lines.map((line, i) => {
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        const rendered = parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            // Italic: *text*
            const italicParts = part.split(/(\*[^*]+\*)/g);
            return italicParts.map((ip, k) => {
                if (ip.startsWith("*") && ip.endsWith("*") && !ip.startsWith("**")) {
                    return <em key={`${j}-${k}`}>{ip.slice(1, -1)}</em>;
                }
                return ip;
            });
        });

        // Blank lines become small spacers
        if (line.trim() === "") {
            return <div key={i} className="h-2" />;
        }

        // Bullet lines get special styling
        if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
            return <div key={i} className="pl-1 flex gap-1.5 items-start"><span className="mt-0.5 text-primary flex-shrink-0">•</span><span>{rendered}</span></div>;
        }

        // Emoji-started lines (⏰, 🍜, etc.) get slight padding
        if (/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(line.trim())) {
            return <div key={i} className="flex gap-1.5 items-start">{rendered}</div>;
        }

        return <div key={i}>{rendered}</div>;
    });
}

export const ChatBubble = ({ role, content, timestamp }: ChatBubbleProps) => {
    const isAssistant = role === "assistant";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex w-full mb-4 ${isAssistant ? "justify-start" : "justify-end"}`}
        >
            <div className={`flex max-w-[90%] md:max-w-[75%] ${isAssistant ? "flex-row" : "flex-row-reverse"} gap-3`}>
                <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-sm mt-1 ${
                    isAssistant ? "bg-primary text-white" : "bg-deep-ocean text-white"
                }`}>
                    {isAssistant ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>

                <div className="flex flex-col space-y-1 min-w-0">
                    <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isAssistant 
                            ? "bg-white dark:bg-muted/30 text-foreground border border-border rounded-tl-sm" 
                            : "bg-primary text-white rounded-tr-sm"
                    }`}>
                        <div className="space-y-0.5 [&_strong]:text-primary [&_strong]:dark:text-aqua-primary">
                            {isAssistant ? formatContent(content) : content}
                        </div>
                    </div>
                    <span className={`text-[10px] text-muted-foreground px-1 ${isAssistant ? "text-left" : "text-right"}`}>
                        {isAssistant ? "Buddy" : "You"} • {timestamp}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
