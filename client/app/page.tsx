"use client";

import { motion } from "framer-motion";
import { ChefHat, MapPin, Sparkles, Search, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import { TriviaSection } from "@/components/TriviaSection";
import { FeaturedFoodSection } from "@/components/FeaturedFoodSection";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >


                        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 mt-24">
                            <span className="text-gradient">Taste of Malabon</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Discover the rich culinary heritage and vibrant food scene of Malabon City.
                            From legendary Pancit Malabon to hidden street food gems.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/foods" className="group px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold flex items-center gap-2 transition-all hover-lift glow-effect">
                                <Search className="w-5 h-5" />
                                Explore Foods
                                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            </Link>
                            <Link href="/culture" className="px-8 py-4 glass hover:bg-white/20 rounded-full font-semibold transition-all hover-lift">
                                Discover Culture
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Floating Stats */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {[
                            { icon: ChefHat, label: "Restaurants", value: "200+" },
                            { icon: Heart, label: "Local Dishes", value: "50+" },
                            { icon: TrendingUp, label: "Happy Foodies", value: "10K+" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="glass-dark p-6 rounded-2xl hover-lift"
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                                <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <motion.div
                            className="w-1.5 h-1.5 bg-white rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Featured Food Section */}
            <FeaturedFoodSection />

            {/* Trivia Section */}
            <TriviaSection />
        </main>
    );
}
