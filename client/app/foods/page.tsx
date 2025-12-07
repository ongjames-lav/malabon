"use client";

import { motion } from "framer-motion";
import { ChefHat, Search, Filter, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { foods as staticFoods, type Food } from "@/lib/data";

export default function FoodsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFoods = useMemo(() => {
        if (!searchQuery.trim()) return staticFoods;

        const query = searchQuery.toLowerCase();
        return staticFoods.filter(food =>
            food.name.toLowerCase().includes(query) ||
            food.category.toLowerCase().includes(query) ||
            food.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);


    return (
        <main className="min-h-screen bg-background pt-20 pb-20">
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
                            className="w-full pl-12 pr-20 py-4 glass rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {filteredFoods.length} results
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Food Grid */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">
                        {filteredFoods.length} Delicacies Found
                    </h2>
                    <button className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/10 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>

                {filteredFoods.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No delicacies found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFoods.map((food: Food, index: number) => (
                            <motion.div
                                key={food.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass rounded-3xl overflow-hidden hover-lift group border border-white/5"
                            >
                                <div className="relative h-64 overflow-hidden bg-muted">
                                    {food.images && food.images[0] ? (
                                        <Image
                                            src={food.images[0]}
                                            alt={food.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ChefHat className="w-16 h-16 text-accent/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md text-xs font-medium border border-black/10 dark:border-white/10 text-foreground dark:text-white">
                                        {food.category || "Food"}
                                    </div>
                                    {food.isSignature && (
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-md text-xs font-bold border border-accent text-white">
                                            Signature
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                                            {food.name}
                                        </h3>
                                        {food.price && (
                                            <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                                {food.price}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                                        {food.description || "A delicious Malabon specialty."}
                                    </p>

                                    {/* Additional Details */}
                                    {(food.ingredients || food.servingSize) && (
                                        <div className="space-y-2 mb-4 text-xs">
                                            {food.servingSize && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <span className="font-semibold">Serving:</span>
                                                    <span>{food.servingSize}</span>
                                                </div>
                                            )}
                                            {food.ingredients && food.ingredients.length > 0 && (
                                                <div className="text-muted-foreground">
                                                    <span className="font-semibold">Key Ingredients:</span>
                                                    <span className="ml-1">{food.ingredients.slice(0, 3).join(", ")}</span>
                                                    {food.ingredients.length > 3 && <span className="text-accent">...</span>}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <Link
                                        href={`/foods/${food.id}`}
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
