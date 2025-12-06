"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ChefHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { businesses as staticBusinesses } from "@/lib/data";

export function FeaturedBusinessSection() {
    const businesses = useMemo(() => {
        return staticBusinesses
            .filter(b => b.rating && b.rating >= 4.5)
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 3);
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                    <ChefHat className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-muted-foreground">Where to Eat</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Featured <span className="text-gradient">Restaurants</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover the best places to experience authentic Malabon cuisine
                </p>
            </motion.div>

            {/* Business Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {businesses.map((business, index) => (
                    <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                        <Link href={`/places/${business.id}`}>
                            <div className="glass-dark rounded-3xl overflow-hidden hover-lift group border border-white/5 h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    {business.images && business.images.length > 0 ? (
                                        <Image
                                            src={business.images[0]}
                                            alt={business.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                            <ChefHat className="w-16 h-16 text-white/30" />
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-semibold">
                                        {business.category}
                                    </div>

                                    {/* Rating Badge */}
                                    {business.rating && (
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xs font-bold">{business.rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                                        {business.name}
                                    </h3>

                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                                        {business.description}
                                    </p>

                                    <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                                        <span className="line-clamp-2">{business.address}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                                        View Details
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <Link
                    href="/places"
                    className="inline-flex items-center gap-2 px-8 py-4 glass hover:bg-white/10 rounded-full font-semibold transition-all hover-lift"
                >
                    Explore All Restaurants
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
        </section>
    );
}
