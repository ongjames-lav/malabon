"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, Utensils, Users, Globe, Handshake } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { businesses } from "@/lib/data";
import { PlaceCard } from "@/components/molecules/PlaceCard";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                    {/* Placeholder for dynamic background (could be video or high-res image) */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/assets/images/malabon-river-hero.jpg')] bg-cover bg-center" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="px-4 py-2 border-primary/30 text-primary">
                            🌊 Welcome to the Venice of the North
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-display text-5xl md:text-8xl font-black text-foreground tracking-tight"
                    >
                        Tap and Go, <br />
                        <span className="text-primary italic">Let your Buddy Shows!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Lakbay Malabon is your smart travel companion—helping you navigate,
                        discover, and experience the city like a local, directly from your browser.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link href="/explore">
                            <Button size="lg" rightIcon={<ArrowRight />}>
                                Start Exploring
                            </Button>
                        </Link>
                        <Link href="/companion">
                            <Button variant="ghost" size="lg" className="bg-white/50 dark:bg-muted/20">
                                Talk to Buddy
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Floating Elements (Tricycle / Buddy) */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-10 hidden xl:block"
                >
                    <div className="bg-white dark:bg-card p-4 rounded-2xl shadow-glow border border-primary/20 flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div className="pr-4">
                            <p className="text-xs font-bold text-primary uppercase tracking-widest">AI Buddy</p>
                            <p className="text-sm font-bold text-foreground overflow-hidden whitespace-nowrap border-r-2 border-primary animate-typing">"Where should we eat today?"</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Highlights Section */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <HighlightCard
                        icon={<Sparkles className="h-8 w-8 text-primary" />}
                        title="Buddy the AI"
                        description="Personalized recommendations for food, culture, and events in real-time."
                    />
                    <HighlightCard
                        icon={<Utensils className="h-8 w-8 text-primary" />}
                        title="Food Discovery"
                        description="Find the most authentic Pancit Malabon, Sapin-Sapin, and local hidden gems."
                    />
                    <HighlightCard
                        icon={<Users className="h-8 w-8 text-primary" />}
                        title="Community First"
                        description="Supporting local businesses and promoting sustainable tourism across the city."
                    />
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <Badge variant="outline" className="px-4 py-2 border-primary/30 text-primary flex items-center gap-2 w-fit mx-auto">
                        <Handshake className="h-4 w-4" />
                        Official Partners
                    </Badge>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-foreground tracking-tight">
                        Grow With Our <br />
                        <span className="text-primary italic">Local Community</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We're proud to partner with Malabon's finest restaurants, cafes, and
                        tour guides to provide you with an authentic local experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {businesses.filter(b => b.isPartner).map((partner) => (
                        <div key={partner.id} className="scale-105 hover:scale-110 transition-transform duration-300">
                            <PlaceCard
                                id={partner.id}
                                name={partner.name}
                                description={partner.description}
                                category={partner.category}
                                rating={partner.rating}
                                image={partner.images[0]}
                                address={partner.address}
                                type="places"
                                isSignature={false}
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <Link href="/partner">
                        <Button variant="ghost" className="group">
                            View All Partnerships
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto rounded-[3rem] bg-secondary text-secondary-foreground p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

                    <h2 className="font-display text-4xl md:text-5xl font-black relative z-10">
                        Ready to experience <br />
                        <span className="text-primary italic">Malabon like a local?</span>
                    </h2>
                    <p className="text-secondary-foreground/70 text-lg max-w-xl mx-auto relative z-10">
                        Join thousands of travelers who use Lakbay Malabon to discover the city's
                        best kept secrets. Free and always interactive.
                    </p>
                    <div className="pt-4 relative z-10">
                        <Link href="/explore">
                            <Button size="lg" variant="primary" className="shadow-2xl">
                                Join the Journey
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

const HighlightCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="space-y-4 group">
        <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-glow group-hover:-translate-y-2">
            {icon}
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
);
