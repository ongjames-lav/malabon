"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Handshake, TrendingUp, Globe, CheckCircle, ArrowRight, Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { businesses } from "@/lib/data";
import { PlaceCard } from "@/components/molecules/PlaceCard";

export default function PartnerPage() {
    const [searchQuery, setSearchQuery] = useState("");
    
    const partners = businesses.filter(b => b.isPartner);
    const filteredPartners = partners.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-24">
                
                {/* Hero */}
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest leading-none"
                    >
                        <Handshake className="h-3 w-3" />
                        Join the Ecosystem
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-8xl font-black text-foreground tracking-tight"
                    >
                        Grow With <br />
                        <span className="text-primary italic">Lakbay Malabon</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground text-lg md:text-xl leading-relaxed"
                    >
                        Empower your business with digital tools and connect with a 
                        growing community of tourists and locals through the city's 
                        premier AI tourism hub.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button size="lg" className="rounded-2xl px-12 group" rightIcon={<ArrowRight className="group-hover:translate-x-1 transition-transform" />}>
                            Register My Business
                        </Button>
                        <a href="#partners" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                            View Official Partners
                        </a>
                    </motion.div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <BenefitCard 
                        icon={<TrendingUp className="h-6 w-6 text-primary" />}
                        title="Increased Visibility"
                        description="Get featured in the Explore grid and AI Companion recommendations for thousands of visitors."
                    />
                    <BenefitCard 
                        icon={<Globe className="h-6 w-6 text-primary" />}
                        title="Digital Presence"
                        description="A professional digital storefront for your restaurant, cafe, or tour with live map integration."
                    />
                    <BenefitCard 
                        icon={<Sparkles className="h-6 w-6 text-primary" />}
                        title="AI Integration"
                        description="Buddy, our AI guide, will actively recommend your business to tourists based on their interests."
                    />
                </div>

                {/* Partner Showcase */}
                <section id="partners" className="pt-12 space-y-12">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-border pb-12">
                        <div className="space-y-4 max-w-xl">
                            <h2 className="font-display text-4xl font-black tracking-tight uppercase">
                                Our Official <span className="text-primary">Partners</span>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Meet the local businesses that make Malabon the 'Venice of the North'. 
                                From floating cafes to heritage tours, these are our certified community partners.
                            </p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input 
                                type="text"
                                placeholder="Search partners..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border rounded-2xl outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredPartners.map((partner) => (
                                <motion.div
                                    key={partner.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PlaceCard 
                                        id={partner.id}
                                        name={partner.name}
                                        description={partner.description}
                                        category={partner.category}
                                        rating={partner.rating}
                                        image={partner.images[0]}
                                        type="places"
                                        isSignature={false}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredPartners.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Search className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">No partners found</h3>
                            <p className="text-muted-foreground">Try searching for another business name.</p>
                        </div>
                    )}
                </section>

                {/* Onboarding Steps */}
                <div className="bg-secondary text-secondary-foreground rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 text-left">
                        <div className="space-y-6">
                            <h2 className="font-display text-4xl font-bold italic">Growing Together</h2>
                            <p className="text-secondary-foreground/70">
                                Our mission is to promote sustainable tourism that benefits 
                                everyone—from the biggest landmarks to the smallest family-run eateries.
                            </p>
                            <ul className="space-y-4">
                                <StepItem text="Free registration for local partners" />
                                <StepItem text="Digital marketing support" />
                                <StepItem text="Analytics on tourist engagement" />
                            </ul>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                            <h3 className="font-display text-2xl font-bold mb-6">Quick Registration</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Business Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white transition-colors" />
                                <input type="email" placeholder="Contact Email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white transition-colors" />
                                <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-white transition-colors text-white/50">
                                    <option>Category</option>
                                    <option>Restaurant</option>
                                    <option>Cafe</option>
                                    <option>Attraction</option>
                                </select>
                                <Button variant="primary" className="w-full bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest py-4">
                                    Send Application
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 space-y-4 hover:border-primary/30 transition-all hover-lift">
        <div className="h-12 w-12 rounded-xl bg-white dark:bg-card flex items-center justify-center shadow-sm">
            {icon}
        </div>
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
);

const StepItem = ({ text }: { text: string }) => (
    <li className="flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-primary" />
        <span className="font-medium">{text}</span>
    </li>
);
