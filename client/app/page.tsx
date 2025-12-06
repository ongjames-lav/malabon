"use client";

import { motion } from "framer-motion";
import { ChefHat, MapPin, Sparkles, Search, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";
import { TriviaSection } from "@/components/TriviaSection";
import { FeaturedFoodSection } from "@/components/FeaturedFoodSection";
import { FeaturedBusinessSection } from "@/components/FeaturedBusinessSection";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-16 sm:pb-32 px-4 sm:px-6">
                {/* ... background elements ... */}

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 mt-16 sm:mt-20 md:mt-24 px-2">
                            <span className="text-gradient">Taste of Malabon</span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
                            Discover the rich culinary heritage and vibrant food scene of Malabon City.
                            From legendary Pancit Malabon to hidden street food gems.
                        </p>

                        {/* Search Autocomplete */}
                        <div className="mb-8 sm:mb-12 px-2 sm:px-4">
                            <SearchAutocomplete />
                        </div>

                        <motion.div
                            className="flex flex-col gap-3 sm:gap-4 justify-center items-center px-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/foods" className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover-lift glow-effect text-sm sm:text-base">
                                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                                Explore Foods
                                <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 group-hover:rotate-12 transition-transform" />
                            </Link>
                            <Link href="/culture" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 glass hover:bg-white/20 rounded-full font-semibold transition-all hover-lift text-sm sm:text-base">
                                Discover Culture
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Floating Stats */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12 px-4"
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
                                className="glass-dark p-4 sm:p-6 rounded-2xl hover-lift"
                                whileHover={{ scale: 1.05 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

            </section>

            {/* Featured Food Section */}
            <FeaturedFoodSection />

            {/* Featured Business Section */}
            <FeaturedBusinessSection />

            {/* Trivia Section */}
            <TriviaSection />
        </main>
    );
}
