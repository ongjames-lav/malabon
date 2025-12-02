"use client";

import { motion } from "framer-motion";
import { MapPin, Search, Store, Star, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchBusinesses } from "@/lib/api";

interface Business {
    _id: string;
    name: string;
    category: string;
    address: string;
    rating?: number;
    description?: string;
    contact?: {
        phone?: string;
    };
}

export default function PlacesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadBusinesses();
    }, []);

    async function loadBusinesses() {
        try {
            setLoading(true);
            const response = await fetchBusinesses({ limit: 50 });
            setBusinesses(response.data || []);
        } catch (error) {
            console.error("Failed to load businesses:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        try {
            setLoading(true);
            const response = await fetchBusinesses({ search: searchQuery, limit: 50 });
            setBusinesses(response.data || []);
        } catch (error) {
            console.error("Failed to search businesses:", error);
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

            {/* Map Placeholder */}
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <div className="glass-dark rounded-3xl p-8 border border-white/5">
                    <div className="flex items-center justify-center h-96 bg-slate-900/50 rounded-2xl border-2 border-dashed border-white/10">
                        <div className="text-center">
                            <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Interactive Map</h3>
                            <p className="text-muted-foreground">
                                Google Maps integration coming soon
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Places List */}
            <section className="max-w-7xl mx-auto px-6">
                <h2 className="text-2xl font-bold mb-8">
                    {loading ? "Loading..." : `${businesses.length} Places Found`}
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-dark rounded-2xl h-64 animate-pulse" />
                        ))}
                    </div>
                ) : businesses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No businesses found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {businesses.map((place, index) => (
                            <motion.div
                                key={place._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-dark rounded-2xl p-6 hover-lift border border-white/5"
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
                                    <button className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all">
                                        View Details
                                    </button>
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
