"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Store, Star, Phone } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { businesses as staticBusinesses, type Business } from "@/lib/data";

const PlacesMap = dynamic(() => import("@/components/PlacesMap").then((mod) => mod.PlacesMap), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full rounded-3xl bg-muted animate-pulse border border-border/10" />
});

export default function PlacesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBusinesses = useMemo(() => {
        if (!searchQuery.trim()) return staticBusinesses;

        const query = searchQuery.toLowerCase();
        return staticBusinesses.filter(business =>
            business.name.toLowerCase().includes(query) ||
            business.category.toLowerCase().includes(query) ||
            business.address.toLowerCase().includes(query) ||
            business.description.toLowerCase().includes(query)
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
                        <Store className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Business Directory</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Discover <span className="text-gradient">Local Places</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        Find the best restaurants, markets, and food establishments in Malabon.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search for restaurants, markets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-20 py-4 glass rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {filteredBusinesses.length} results
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Map Section */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Map View</h2>
                    <PlacesMap businesses={filteredBusinesses} />
                </motion.div>
            </section>

            {/* Places List */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold mb-8">
                    {filteredBusinesses.length} Places Found
                </h2>

                {filteredBusinesses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No businesses found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredBusinesses.map((place: Business, index: number) => (
                            <motion.div
                                key={place.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass rounded-2xl p-6 hover-lift border border-white/5"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">{place.name}</h3>
                                        <span className="text-sm text-accent">{place.category || "Business"}</span>
                                    </div>
                                    {place.rating && place.rating > 0 && (
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-semibold text-yellow-500">{place.rating.toFixed(1)}</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {place.description || "A local establishment in Malabon."}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span className="line-clamp-1">{place.address || "Malabon City"}</span>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={`/places/${place.id}`}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all text-center"
                                    >
                                        View Details
                                    </Link>
                                    {place.contact?.phone && (
                                        <button className="px-4 py-2 glass hover:bg-white/10 rounded-full transition-all">
                                            <Phone className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
