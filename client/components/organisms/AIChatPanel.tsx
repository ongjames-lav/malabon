"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, MapPin, Sparkles, Utensils, Info, Compass, Coffee, Clock } from "lucide-react";
import Image from "next/image";
import { foods, businesses, landmarks, culturalStories, categoryIcons } from "@/lib/data";
import type { Food, Business } from "@/lib/data";
import { ChatBubble } from "@/components/molecules/ChatBubble";
import { Button } from "@/components/atoms/Button";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

// ========================================
// Malabon AI Knowledge Engine
// ========================================

function getMalabonResponse(query: string): string {
    const q = query.toLowerCase().trim();

    // --- Guard: Off-topic / non-Malabon queries ---
    const offTopicKeywords = [
        "manila", "makati", "bgc", "taguig", "quezon city", "pasig", "cebu",
        "boracay", "palawan", "baguio", "davao", "iloilo", "siargao",
        "singapore", "tokyo", "korea", "japan", "usa", "america",
        "bitcoin", "crypto", "stock", "politics", "election",
        "programming", "code", "javascript", "python",
        "weather forecast", "news today"
    ];

    for (const kw of offTopicKeywords) {
        if (q.includes(kw)) {
            return `I'm Buddy, your Lakbay Malabon guide! 🚲 I only know about Malabon City — its food, places, culture, and history. Ask me about Pancit Malabon, hidden gems, or where to eat today! I can't help with "${kw}" though. 😊`;
        }
    }

    // --- Greetings ---
    if (/^(hi|hello|hey|hola|kumusta|musta|yo|sup|good morning|good afternoon|good evening)/.test(q)) {
        return "Halo! Welcome to Lakbay Malabon! 🌊 I'm Buddy, your AI travel companion. I can help you with:\n\n🍜 **Food** — Find the best Pancit Malabon, kakanin, cafes\n📍 **Places** — Discover landmarks, heritage sites, hidden gems\n🧭 **Itinerary** — Plan a full day trip\n☕ **Cafes** — Best coffee spots in the city\n📖 **Culture** — Stories, history, and traditions\n\nWhat would you like to explore?";
    }

    // --- What is Malabon / About Malabon ---
    if (q.includes("what is malabon") || q.includes("about malabon") || q.includes("tell me about malabon")) {
        return "**Malabon City** is known as the \"Venice of the North\" 🌊 because of its winding rivers and canals! Here's what makes it special:\n\n• 🍜 **Home of Pancit Malabon** — the most famous noodle dish in the Philippines\n• 🐟 **Fishing Heritage** — centuries-old maritime tradition\n• 🏛️ **San Bartolome Church** — Spanish colonial-era heritage\n• 🎨 **Rich Culture** — from kakanin traditions to the famous Malabon River stories\n• 📍 **Location** — Part of Metro Manila, just north of Manila proper\n\nWant to know more about any of these?";
    }

    // --- Food queries ---
    if (q.includes("pancit") || q.includes("noodle")) {
        const pancit = foods.find(f => f.id === "food_1")!;
        const places = businesses.filter(b => b.menu_items.includes("food_1"));
        const placeList = places.map(p => `• **${p.name}** — ${p.address} (⭐ ${p.rating})`).join("\n");
        return `🍜 **Pancit Malabon** is the city's crown jewel!\n\n${pancit.description}\n\n**Price:** ${pancit.price}\n**Best paired with:** ${pancit.bestPairedWith}\n\n**Where to try it:**\n${placeList}\n\n💡 **Tip:** Order a bilao size for sharing — it's the traditional way to enjoy it!`;
    }

    if (q.includes("kakanin") || q.includes("sapin") || q.includes("rice cake") || q.includes("dolor")) {
        const sapin = foods.find(f => f.id === "food_2")!;
        const puto = foods.find(f => f.id === "food_20");
        return `🍡 **Malabon's Kakanin** is legendary! The most famous is:\n\n**Sapin-Sapin** (from Dolor's since 1930)\n${sapin.description}\n**Price:** ${sapin.price}\n\n${puto ? `**Puto Pao** — ${puto.description}\n**Price:** ${puto.price}` : ""}\n\n📍 **Go to:** Dolor's Kakanin at 19 Governor Pascual Avenue, Concepcion. Open daily from 7 AM!\n\n💡 **Tip:** Go early — their best sellers often run out by afternoon!`;
    }

    if (q.includes("crispy pata") || q.includes("jamico") || q.includes("judy ann")) {
        const cp = foods.find(f => f.id === "food_3")!;
        return `🍖 **Crispy Pata** at Judy Ann's (Jamico's) is a Malabon LEGEND!\n\n${cp.description}\n\n**Price:** ${cp.price}\n**Best paired with:** ${cp.bestPairedWith}\n**History:** ${cp.history}\n\n📍 **Location:** 201 General Luna Street, Concepcion\n⏰ **Hours:** Mon-Sun, 10 AM - 9/10 PM\n\n💡 **Tip:** Call ahead on weekends — the wait can be long because it's THAT good!`;
    }

    if (q.includes("street food") || q.includes("kikiam") || q.includes("okoy") || q.includes("ukoy")) {
        const kikiam = foods.find(f => f.id === "food_7");
        const okoy = foods.find(f => f.id === "food_22");
        return `🔥 **Malabon Street Food** is a must-try!\n\n${kikiam ? `**Kikiam** — ${kikiam.description}\nPrice: ${kikiam.price}` : ""}\n\n${okoy ? `**Okoy** — ${okoy.description}\nPrice: ${okoy.price}\n💡 Tip: ${okoy.bestPairedWith}` : ""}\n\nYou'll find these along **General Luna Street** and **Governor Pascual Avenue**. Best experienced during afternoon merienda time (3-5 PM)!`;
    }

    if (q.includes("seafood") || q.includes("fish") || q.includes("tinapa") || q.includes("bangus")) {
        const tinapa = foods.find(f => f.id === "food_23");
        const relleno = foods.find(f => f.id === "food_5");
        const adobo = foods.find(f => f.id === "food_11");
        return `🐟 **Malabon's Seafood Heritage** is deep!\n\nAs a fishing city, seafood is in Malabon's DNA:\n\n${tinapa ? `**Tinapa (Smoked Fish)** — ${tinapa.description}\nPrice: ${tinapa.price}` : ""}\n\n${relleno ? `**Rellenong Bangus** — ${relleno.description}\nPrice: ${relleno.price}` : ""}\n\n${adobo ? `**Adobong Pusit** — ${adobo.description}\nPrice: ${adobo.price}` : ""}\n\n📍 Visit the **Malabon Fish Port Complex** early morning for the freshest catch!`;
    }

    if (q.includes("dessert") || q.includes("sweet") || q.includes("halo") || q.includes("pichi") || q.includes("bibingka")) {
        const desserts = foods.filter(f => f.category === "Dessert");
        const list = desserts.map(d => `• **${d.name}** — ${d.price}`).join("\n");
        return `🍧 **Sweet treats in Malabon:**\n\n${list}\n\n📍 For the best kakanin experience, go to **Dolor's Kakanin** on Governor Pascual Avenue. For Halo-Halo, most restaurants along General Luna serve excellent versions.\n\n💡 **Tip:** Try Pichi-Pichi with CHEESE (not coconut) — it's a Malabon thing! 🧀`;
    }

    if (q.includes("eat") || q.includes("food") || q.includes("hungry") || q.includes("recommend") || q.includes("where should i") || q.includes("what should i")) {
        const signatureFoods = foods.filter(f => f.isSignature);
        const picks = signatureFoods.sort(() => Math.random() - 0.5).slice(0, 4);
        const list = picks.map(f => `• **${f.name}** (${f.category}) — ${f.price}`).join("\n");
        return `🍽️ **My top picks for you today:**\n\n${list}\n\n🏆 **Can't-miss combo:** Start with Pancit Malabon at Nanay's, then walk to Dolor's for Sapin-Sapin dessert. Both are on Governor Pascual Avenue!\n\n📍 Most food spots are concentrated along **General Luna Street** and **Governor Pascual Avenue** in Barangay Concepcion.\n\nWant me to suggest a specific type? (seafood, street food, desserts, cafes)`;
    }

    // --- Cafe queries ---
    if (q.includes("coffee") || q.includes("cafe") || q.includes("work") || q.includes("study") || q.includes("chill")) {
        const cafes = businesses.filter(b => b.category === "Cafe").sort((a, b) => b.rating - a.rating).slice(0, 5);
        const list = cafes.map(c => `• ☕ **${c.name}** — ⭐ ${c.rating} — ${c.address}`).join("\n");
        return `☕ **Best Cafes in Malabon:**\n\n${list}\n\n🏆 **Buddy's Pick:** **Stay Up Espresso Bar** on General Luna St — great for students and remote workers with solid WiFi.\n\n**Artemis Coffee** is perfect if you love frappes and a more modern vibe.\n\n💡 **Late night?** Try **Blend43 Cafe** — they're open until 2 AM!`;
    }

    // --- Place / landmark queries ---
    if (q.includes("church") || q.includes("san bartolome") || q.includes("heritage") || q.includes("history") || q.includes("old")) {
        return `🏛️ **Heritage Sites in Malabon:**\n\n• **San Bartolome Parish Church** — A stunning Spanish colonial-era church and one of Malabon's oldest landmarks. Its architecture tells centuries of Filipino-Spanish history.\n\n• **Raymundo House** — A preserved ancestral house showcasing how wealthy Malabon families lived during the Spanish era. Beautiful woodwork and period furnishings.\n\n📖 **Did you know?** Malabon was one of the first towns established during the Spanish colonial period. Its name comes from "malabon" meaning "plenty of fish"!\n\n💡 **Tip:** Visit the church early in the morning for a peaceful experience. The light through the windows is magical!`;
    }

    if (q.includes("place") || q.includes("visit") || q.includes("see") || q.includes("attraction") || q.includes("landmark")) {
        const lmList = landmarks.map(l => `• ${categoryIcons[l.category] || "📍"} **${l.name}** — ${l.description}`).join("\n");
        return `📍 **Top Places to Visit in Malabon:**\n\n${lmList}\n\n🍽️ **Plus 26+ restaurants and cafes** scattered across the city!\n\nWant directions to any of these? Head to the **Explore → Map** view for step-by-step navigation!`;
    }

    // --- Hidden gems ---
    if (q.includes("hidden gem") || q.includes("secret") || q.includes("underrated") || q.includes("local")) {
        return `✨ **Hidden Gems Only Locals Know:**\n\n• 🐟 **Malabon Fish Port at 4 AM** — Watch the boats come in with fresh catch. The energy is electric and you can buy ultra-fresh seafood at wholesale prices!\n\n• 🍞 **Betsy's Broas** — These cloud-like ladyfinger biscuits are a quiet Malabon legend. Perfect for pasalubong.\n\n• ☕ **Orijins Coffee House** — A specialty coffee spot on General Luna that serves proper Cortado and Ristretto. The locals' best-kept secret.\n\n• 🏛️ **Walk along the Malabon River at sunset** — The "Venice of the North" vibe is real when the golden light hits the water.\n\n• 🍜 **Valeriano's Eatery** — A family-run spot since 1978 known for beef mami. No frills, just incredible food.\n\n💡 **Ultimate local tip:** Ask for "extra aligue" (crab fat) on your Pancit Malabon. Locals always do.`;
    }

    // --- Itinerary / day trip ---
    if (q.includes("itinerary") || q.includes("plan") || q.includes("day trip") || q.includes("1 day") || q.includes("one day") || q.includes("full day") || q.includes("schedule")) {
        return `🧭 **Perfect 1-Day Malabon Itinerary:**\n\n⏰ **8:00 AM** — Breakfast at **Dolor's Kakanin**\nStart with Sapin-Sapin and Puto Pao with hot tsokolate\n\n⏰ **9:30 AM** — Walk to **San Bartolome Parish Church**\nExplore the Spanish colonial architecture\n\n⏰ **10:30 AM** — Visit **Raymundo House**\nStep back in time at this ancestral home\n\n⏰ **12:00 PM** — Lunch at **Nanay's Pancit Malabon**\nOrder the classic bilao to share!\n\n⏰ **2:00 PM** — Merienda at **Betsy's Cake Center**\nGrab Broas and other pastries\n\n⏰ **3:30 PM** — Coffee break at **Stay Up Espresso Bar**\nRecharge with a Spanish Latte\n\n⏰ **5:00 PM** — Sunset walk along the **Malabon River**\nExperience the "Venice of the North"\n\n⏰ **7:00 PM** — Dinner at **Judy Ann's Crispy Pata (Jamico's)**\nEnd the day with their legendary Crispy Pata!\n\n💡 **Budget estimate:** Around ₱1,200-1,800 per person\n\nWant me to customize this? Tell me your vibe (foodie, history buff, cafe hopper)!`;
    }

    // --- Budget ---
    if (q.includes("budget") || q.includes("cheap") || q.includes("afford") || q.includes("price") || q.includes("cost") || q.includes("how much")) {
        return `💰 **Malabon on a Budget:**\n\nMalabon is one of the most affordable food destinations in Metro Manila!\n\n**Budget Meals (Under ₱100):**\n• Kikiam — ₱50-70\n• Pichi-Pichi — ₱60-80\n• Puto Pao — ₱25-35/piece\n• Okoy — ₱60-90\n\n**Mid-Range (₱100-300):**\n• Pancit Malabon bilao — ₱250-350 (sharing!)\n• Coffee drinks — ₱60-160\n• Mango Smoothie — ₱100-140\n\n**Splurge (₱300+):**\n• Crispy Pata — ₱650-850\n• Kare-Kare — ₱450-600\n• Rellenong Bangus — ₱350-500\n\n💡 **Pro tip:** A full day of eating in Malabon can cost as little as ₱500 if you stick to street food and kakanin!`;
    }

    // --- Culture / stories ---
    if (q.includes("culture") || q.includes("story") || q.includes("tradition") || q.includes("legend") || q.includes("river")) {
        const stories = culturalStories.map(s => `• 📖 **${s.title}** — ${s.content.substring(0, 120)}...`).join("\n\n");
        return `📖 **Malabon's Cultural Stories:**\n\n${stories}\n\n🌊 The Malabon River is called the city's "lifeblood" — it connected communities, enabled trade, and gave birth to the fishing heritage that defines Malabon today.\n\nWant to hear more about any of these stories?`;
    }

    // --- Directions / how to get there ---
    if (q.includes("direction") || q.includes("how to get") || q.includes("how do i get") || q.includes("navigate") || q.includes("way to")) {
        return `🗺️ **Getting Around Malabon:**\n\nMost food spots and landmarks are in the **Concepcion** and **Baritan** barangays, concentrated along:\n• **Governor Pascual Avenue**\n• **General Luna Street**\n\n**How to get to Malabon:**\n🚌 From Manila — Take a jeepney or bus heading to Navotas/Malabon via EDSA\n🚕 Grab/taxi — Search "Governor Pascual Avenue, Malabon"\n🚂 LRT-1 — Get off at Monumento Station, then jeep to Malabon\n\n**Within Malabon:**\n🚲 Tricycle — The main local transport (₱20-50)\n🚶 Walking — Most spots in Concepcion are walkable!\n\n💡 Use our **Explore → Map** view for step-by-step directions to any place!`;
    }

    // --- Operating hours ---
    if (q.includes("open") || q.includes("close") || q.includes("hour") || q.includes("time") || q.includes("schedule")) {
        const topSpots = businesses.filter(b => b.rating >= 4.7).slice(0, 5);
        const list = topSpots.map(b => {
            const today = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()];
            const hours = b.opening_hours[today as keyof typeof b.opening_hours];
            return `• **${b.name}** — Today: ${hours}`;
        }).join("\n");
        return `⏰ **Opening Hours (Today):**\n\n${list}\n\n💡 **Tip:** Most restaurants are open from 8 AM. Cafes tend to open later (10 AM onwards) and stay open until 10 PM-2 AM.\n\nNeed hours for a specific place?`;
    }

    // --- Thank you ---
    if (q.includes("thank") || q.includes("salamat") || q.includes("thanks")) {
        return "Walang anuman! 😊 Enjoy your Malabon adventure! If you need anything else — food recs, directions, or local tips — I'm always here. Tap and Go, Let the App Show! 🚲🌊";
    }

    // --- Catch-all for Malabon-related but unmatched ---
    if (q.includes("malabon")) {
        return `Great question about Malabon! 🌊 Here's what I can help you with:\n\n🍜 **Food** — "What should I eat?" or "Best pancit"\n📍 **Places** — "Where to visit?" or "Hidden gems"\n🧭 **Itinerary** — "Plan a day trip"\n☕ **Cafes** — "Best coffee shops"\n💰 **Budget** — "How much will it cost?"\n📖 **Culture** — "Tell me about Malabon's history"\n\nJust ask and I'll guide you! 🚲`;
    }

    // --- Generic fallback ---
    return `I'm Buddy, your Malabon-only AI guide! 🚲 I can help you with everything about **Malabon City**:\n\n🍜 Try: *"Where should I eat?"*\n📍 Try: *"Best places to visit"*\n✨ Try: *"Tell me a hidden gem"*\n🧭 Try: *"Plan a 1-day trip"*\n☕ Try: *"Best cafe for studying"*\n💰 Try: *"Is Malabon affordable?"*\n\nI can only answer questions about Malabon — it's my specialty! What would you like to know?`;
}

// ========================================
// AIChatPanel Component
// ========================================

export const AIChatPanel = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Halo! I'm **Buddy**, your Lakbay Malabon AI guide! 🚲🌊\n\nI know everything about Malabon City — where to eat, what to see, and how to experience it like a local.\n\nI can help you with:\n🍜 Food recommendations\n📍 Places to visit\n🧭 Itinerary planning\n☕ Best cafes\n📖 Culture & history\n\nWhat would you like to explore today?",
            timestamp: "", // Initialize empty to avoid hydration mismatch
        },
    ]);

    useEffect(() => {
        // Set actual time only on client after hydration
        setMessages(prev => prev.map(m => m.id === "1" ? { ...m, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : m));
    }, []);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = useCallback((text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking delay (shorter for simple queries)
        const delay = text.length < 20 ? 800 : 1500;
        setTimeout(() => {
            const aiResponse = getMalabonResponse(text);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);
        }, delay);
    }, []);

    const suggestedPrompts = [
        { label: "Where should I eat?", icon: <Utensils className="h-4 w-4" /> },
        { label: "Best places to visit", icon: <MapPin className="h-4 w-4" /> },
        { label: "Tell me a hidden gem", icon: <Sparkles className="h-4 w-4" /> },
        { label: "Plan a 1-day trip", icon: <Compass className="h-4 w-4" /> },
        { label: "Best cafe for studying", icon: <Coffee className="h-4 w-4" /> },
        { label: "What is Malabon?", icon: <Info className="h-4 w-4" /> },
    ];

    return (
        <div className="flex flex-col h-[650px] w-full max-w-4xl mx-auto bg-white dark:bg-card border border-border rounded-2xl shadow-smooth overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary/20 shadow-glow">
                        <Image 
                            src="/assets/branding/lakbay-logo.png"
                            alt="Buddy"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-foreground">Buddy — Malabon AI Guide</h3>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            Malabon-only • Always online
                        </p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-muted/50 text-[10px] font-medium text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Replies instantly
                </div>
            </div>

            {/* Messages */}
            <div 
                ref={scrollRef}
                className="flex-grow p-6 overflow-y-auto space-y-2 bg-[#f8fdff] dark:bg-card/50"
            >
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} {...msg} />
                ))}
                {isTyping && (
                    <div className="flex justify-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 relative overflow-hidden rounded-full border border-primary/10">
                                <Image 
                                    src="/assets/branding/lakbay-logo.png"
                                    alt="Buddy"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="bg-white dark:bg-muted/30 px-5 py-3 rounded-2xl border border-border shadow-sm flex gap-1.5 items-center">
                                <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" />
                                <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:0.15s]" />
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]" />
                                <span className="ml-2 text-xs text-muted-foreground">Buddy is thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Input */}
            <div className="p-4 border-t border-border bg-white dark:bg-card space-y-3">
                {/* Suggested prompts - only show when conversation is fresh */}
                {messages.length <= 2 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {suggestedPrompts.map((prompt) => (
                            <button
                                key={prompt.label}
                                onClick={() => handleSend(prompt.label)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary text-xs font-medium transition-all whitespace-nowrap text-foreground"
                            >
                                {prompt.icon}
                                {prompt.label}
                            </button>
                        ))}
                    </div>
                )}

                <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                    className="relative flex items-center gap-2"
                >
                    <input
                        type="text"
                        placeholder="Ask Buddy about Malabon..."
                        className="flex-grow bg-muted/30 border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-xl py-3 px-4 outline-none transition-all pr-14 text-sm"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-1.5 h-10 w-10 !p-0 rounded-lg"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
                <p className="text-[10px] text-center text-muted-foreground">
                    Buddy only answers questions about Malabon City 🌊
                </p>
            </div>
        </div>
    );
};
