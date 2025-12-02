"use client";

import { motion } from "framer-motion";
import { ChefHat, Search, Filter, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchFoods } from "@/lib/api";

interface Food {
    _id: string;
    name: string;
    description: string;
    image_url?: string;
    category: string;
    is_signature?: boolean;
}

export default function FoodsPage() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadFoods();
    }, []);

    async function loadFoods() {
        try {
            setLoading(true);
            const response = await fetchFoods({ limit: 50 });
            setFoods(response.data || []);
        } catch (error) {
            console.error("Failed to load foods:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        try {
            setLoading(true);
            const response = await fetchFoods({ search: searchQuery, limit: 50 });
            setFoods(response.data || []);
        } catch (error) {
            console.error("Failed to search foods:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <ChefHat className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Culinary Discovery</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Explore <span className="text-gradient">Malabon Delicacies</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Discover authentic flavors that have been passed down through generations.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-4 glass-dark rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all"
                        >
                            Search
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Food Grid */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">
                        {loading ? "Loading..." : `${foods.length} Delicacies Found`}
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 glass-dark rounded-full hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-dark rounded-3xl h-96 animate-pulse" />
                        ))}
                    </div>
                ) : foods.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No delicacies found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {foods.map((food, index) => (
                            <motion.div
                                key={food._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-dark rounded-3xl overflow-hidden hover-lift group border border-white/5"
                            >
                                <div className="relative h-64 overflow-hidden bg-slate-900/50">
                                    {food.image_url ? (
                                        <Image
                                            src={food.image_url}
                                            alt={food.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ChefHat className="w-16 h-16 text-accent/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium border border-white/10">
                                        {food.category || "Food"}
                                    </div>
                                    {food.is_signature && (
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md text-xs font-bold border border-accent">
                                            Signature
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                            {food.name}
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                        {food.description || "A delicious Malabon specialty."}
                                    </p>
                                    <Link
                                        href={`/foods/${food._id}`}
                                        className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-semibold"
                                    >
                                        Learn More →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
