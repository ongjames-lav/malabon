"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, MessageSquareQuote } from "lucide-react";

interface AIReviewSummaryProps {
    businessId: string;
    initialSummary?: string;
}

export function AIReviewSummary({ businessId, initialSummary }: AIReviewSummaryProps) {
    const [summary, setSummary] = useState<string | null>(initialSummary || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateSummary = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/businesses/${businessId}/generate-summary`, {
                method: 'POST',
            });
            const data = await response.json();

            if (data.success) {
                setSummary(data.data);
            } else {
                setError(data.error || 'Failed to generate summary');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    if (!summary && !loading && !error) {
        return (
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI Review Summary</h3>
                        <p className="text-sm text-muted-foreground">Get a quick overview of what people are saying</p>
                    </div>
                </div>
                <button
                    onClick={generateSummary}
                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-lg flex items-center justify-center transition-colors font-medium"
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Summary
                </button>
            </div>
        );
    }

    return (
        <div className="glass-dark p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <MessageSquareQuote className="w-24 h-24" />
            </div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AI Review Summary</h3>
                        <p className="text-xs text-primary font-medium">Powered by Gemini AI</p>
                    </div>
                </div>
                <button
                    onClick={generateSummary}
                    disabled={loading}
                    className="hover:bg-white/5 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="relative z-10">
                {error ? (
                    <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        {error}
                    </p>
                ) : loading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        <div className="h-4 bg-white/10 rounded w-full"></div>
                        <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-invert max-w-none"
                    >
                        <p className="text-muted-foreground leading-relaxed italic">
                            "{summary}"
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
