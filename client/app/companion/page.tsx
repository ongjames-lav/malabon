"use client";

import { AIChatPanel } from "@/components/organisms/AIChatPanel";
import { Sparkles, MessageSquare } from "lucide-react";

export default function CompanionPage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest leading-none">
                        <Sparkles className="h-3 w-3" />
                        AI Companion
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
                        Your Smart <span className="text-primary italic">Buddy</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Ask about the best food, historical sites, or get a personalized itinerary in seconds.
                    </p>
                </div>

                <AIChatPanel />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border">
                    <FeatureBox 
                        icon={<MessageSquare className="h-5 w-5 text-primary" />}
                        title="Real-time Chat"
                        description="Instant answers to all your Malabon travel questions."
                    />
                    <FeatureBox 
                        icon={<Sparkles className="h-5 w-5 text-primary" />}
                        title="Smart Recommendations"
                        description="Personalized picks based on what you love."
                    />
                    <FeatureBox 
                        icon={<MessageSquare className="h-5 w-5 text-primary" />}
                        title="Local Insight"
                        description="Explore the city like a true Malabon local."
                    />
                </div>
            </div>
        </main>
    );
}

const FeatureBox = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 border border-border/50">
        <div className="mb-4 h-12 w-12 rounded-xl bg-white dark:bg-card flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
);
