"use client";

import { motion } from "framer-motion";
import { Trophy, Anchor, BookOpen, Star, Church, Phone, Siren, Hospital, Flame, Shield, HeartPulse, MessageSquare, Smartphone } from "lucide-react";
import Image from "next/image";

const triviaFacts = [
    {
        id: 1,
        title: "Guinness World Record",
        description: "Malabon holds the record for the 'Longest Line of Bowls of Noodles', lining up 6,549 bowls of Pancit Malabon in 2025!",
        icon: Trophy,
        color: "text-yellow-500",
        image: "/assets/images/culture/noodle-record.png",
        highlight: true
    },
    {
        id: 2,
        title: "San Bartolome Church",
        description: "Built in 1614, this historic church is a testament to Malabon's deep religious roots and Spanish colonial architecture.",
        icon: Anchor,
        color: "text-blue-400",
        image: "/assets/images/landmarks/san-bartolome-church.webp",
        highlight: false,
        customRender: (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center border-2 border-white/10 text-blue-400">
                <Church className="w-10 h-10 md:w-14 md:h-14" />
            </div>
        )
    },
    {
        id: 3,
        title: "Venice of the Philippines",
        description: "Due to its intricate river systems and waterways, Malabon is often compared to Venice, shaping its unique boat-building history.",
        icon: Anchor,
        color: "text-cyan-400",
        image: "/assets/images/culture/malabon-river.webp",
        highlight: false
    },
    {
        id: 4,
        title: "La Independencia",
        description: "During the 1896 Revolution, the revolutionary newspaper 'La Independencia' was printed right here in Malabon's Asilo de Huérfanos.",
        icon: BookOpen,
        color: "text-red-400",
        image: "/assets/images/culture/la-independencia.png",
        highlight: false
    }
];

export function TriviaSection() {
    return (
        <div className="flex flex-col">
            {/* Section Header - Full Screen Intro */}
            <section className="min-h-[50vh] flex items-center justify-center py-20 px-6 relative overflow-hidden bg-background">
                <div className="text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-muted-foreground">Did You Know?</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Malabon <span className="text-gradient">Trivia & Facts</span>
                    </h2>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                        Scroll down to discover the fascinating stories of our city.
                    </p>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px]" />
                </div>
            </section>

            {triviaFacts.map((fact, index) => (
                <section key={fact.id} className="min-h-screen w-full relative flex items-center justify-center overflow-hidden sticky top-0">
                    {/* Background Image or Gradient */}
                    <div className="absolute inset-0 -z-10">
                        {fact.image ? (
                            <Image
                                src={fact.image}
                                alt={fact.title}
                                fill
                                className="object-cover transition-transform duration-1000 hover:scale-105"
                                priority={index === 0}
                            />
                        ) : (
                            <div className={`w-full h-full bg-muted`} />
                        )}
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
                    </div>

                    {/* Content */}
                    <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center gap-12"
                        >
                            {/* Icon/Number */}
                            <div className="flex-shrink-0">
                                {/* @ts-ignore */}
                                {fact.customRender ? (
                                    /* @ts-ignore */
                                    fact.customRender
                                ) : (
                                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center border-2 border-white/10 ${fact.color}`}>
                                        <fact.icon className="w-10 h-10 md:w-14 md:h-14" />
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="text-center md:text-left">
                                {fact.highlight && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold mb-6 uppercase tracking-wider">
                                        <Trophy className="w-4 h-4" />
                                        World Record Holder
                                    </div>
                                )}
                                <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground leading-tight">
                                    {fact.title}
                                </h3>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                                    {fact.description}
                                </p>
                                {fact.highlight && (
                                    <button className="mt-8 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover-lift flex items-center gap-2 mx-auto md:mx-0">
                                        Read Full Story <span className="text-xl">→</span>
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Emergency Contacts & TXTMJS Section - Full Screen */}
            <section className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background sticky top-0 py-20">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[100px]" />
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <Phone className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-medium text-muted-foreground">Emergency Hotlines</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Malabon <span className="text-gradient">Official Contacts</span>
                        </h2>
                        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                            Keep these numbers handy for emergencies and official inquiries.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {/* Command Center */}
                        <div className="glass p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 transition-transform">
                                <Siren className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Malabon Command Center</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> 8921-6009 / 8921-6029</p>
                                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> 0942-372-9891</p>
                            </div>
                        </div>

                        {/* Ospital ng Malabon */}
                        <div className="glass p-8 rounded-3xl border border-white/5 hover:border-green-500/30 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                                <Hospital className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Ospital ng Malabon</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> 8518-8602 (LOC 100 | 123)</p>
                            </div>
                        </div>

                        {/* PNP Malabon */}
                        <div className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">PNP - Malabon City</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> 0998-598-7864</p>
                                <p className="flex items-center gap-2 font-bold text-foreground"><Phone className="w-4 h-4" /> Dial 911</p>
                            </div>
                        </div>

                        {/* BFP Malabon */}
                        <div className="glass p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                                <Flame className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">BFP - Malabon City</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> 0966-140-3605</p>
                            </div>
                        </div>

                        {/* Red Cross */}
                        <div className="glass p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 transition-transform">
                                <HeartPulse className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Red Cross Malabon</h3>
                            <div className="space-y-2 text-muted-foreground">
                                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> (02) 8652-1408</p>
                            </div>
                        </div>
                    </div>

                    {/* TXTMJS Section */}
                    <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-6">
                                    <MessageSquare className="w-4 h-4" />
                                    LET'S CONNECT TXTMJS
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6">Paano magpadala ng mensahe?</h3>
                                <div className="bg-black/30 p-6 rounded-2xl mb-6 font-mono text-lg md:text-xl border border-white/5 inline-block">
                                    TXTMJS &lt;space&gt; KEYWORD &lt;space&gt; MESSAGE
                                </div>
                                <p className="text-muted-foreground mb-2">I-send ito sa:</p>
                                <p className="text-2xl font-bold text-foreground mb-8">225687 / 09176TXTMJS / 09176898657</p>
                            </div>

                            <div className="flex-1 w-full">
                                <h4 className="text-lg font-semibold mb-6 text-center md:text-left text-muted-foreground">Available Keywords:</h4>
                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    {["MDRRMO", "MCAT", "TRAFFIC", "HEALTH", "POLICE", "FIRE", "CSWDD", "ENGR", "CENRO", "BPLO", "OTHERS"].map((keyword) => (
                                        <span key={keyword} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
