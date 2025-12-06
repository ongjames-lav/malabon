"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChefHat, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { foods, businesses, type Food, type Business } from "@/lib/data";

interface SearchResult {
    id: string;
    name: string;
    description: string;
    type: "food" | "business";
    category?: string;
    address?: string;
    images?: string[];
    image?: string; // For food items that might have a single image property in some contexts (though data.ts usually has images array)
}

const categories = {
    food: ["All", "Main Dish", "Dessert", "Snack", "Beverage"],
    business: ["All", "Restaurant", "Cafe", "Street Food", "Bakery"]
};

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState<"all" | "food" | "business">("all");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        performSearch();
    }, [searchQuery, activeTab, selectedCategory]);

    function performSearch() {
        setLoading(true);
        try {
            let combinedResults: SearchResult[] = [];

            // Filter Foods
            if (activeTab === "all" || activeTab === "food") {
                const foodResults = foods.filter(item =>
                    !searchQuery ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.ingredients?.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
                ).map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    type: "food" as const,
                    category: item.category,
                    images: item.images
                }));
                combinedResults = [...combinedResults, ...foodResults];
            }

            // Filter Businesses
            if (activeTab === "all" || activeTab === "business") {
                const businessResults = businesses.filter(item =>
                    !searchQuery ||
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.address.toLowerCase().includes(searchQuery.toLowerCase())
                ).map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    type: "business" as const,
                    category: item.category,
                    address: item.address,
                    images: item.images
                }));
                combinedResults = [...combinedResults, ...businessResults];
            }

            // Apply category filter
            if (selectedCategory !== "All") {
                combinedResults = combinedResults.filter(item => item.category === selectedCategory);
            }

            setResults(combinedResults);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            // Add a small artificial delay for better UX (so it doesn't flicker instantly)
            setTimeout(() => setLoading(false), 300);
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch();
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Search <span className="text-gradient">Malabon</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Discover delicious foods and amazing places
                </p>
            </motion.div>

            {/* Search Bar */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSearch}
                className="max-w-3xl mx-auto mb-8"
            >
                <div className="glass-dark p-2 rounded-full flex items-center gap-2">
                    <Search className="w-5 h-5 text-muted-foreground ml-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for foods or businesses..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground px-2 py-3"
                    />
                    <button
                        type="button"
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-3 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all"
                    >
                        Search
                    </button>
                </div>
            </motion.form>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center gap-4 mb-8"
            >
                {[
                    { id: "all", label: "All", icon: Sparkles },
                    { id: "food", label: "Foods", icon: ChefHat },
                    { id: "business", label: "Places", icon: MapPin }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id as any);
                            setSelectedCategory("All");
                        }}
                        className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "glass hover:bg-white/10"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Filters */}
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-dark p-6 rounded-2xl mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Filters</h3>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {(activeTab === "food" ? categories.food :
                                activeTab === "business" ? categories.business :
                                    [...categories.food, ...categories.business].filter((v, i, a) => a.indexOf(v) === i)
                            ).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Results */}
            <div>
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-muted-foreground">Searching...</p>
                    </div>
                ) : results.length > 0 ? (
                    <>
                        <p className="text-muted-foreground mb-6">
                            Found {results.length} result{results.length !== 1 ? "s" : ""}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((result, index) => (
                                <motion.div
                                    key={result.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/${result.type === "food" ? "foods" : "places"}/${result.id}`}>
                                        <div className="glass-dark rounded-2xl overflow-hidden hover-lift group border border-white/5 h-full">
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                {(result.images && result.images[0]) ? (
                                                    <Image
                                                        src={result.images[0]}
                                                        alt={result.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                                        {result.type === "food" ? (
                                                            <ChefHat className="w-12 h-12 text-white/30" />
                                                        ) : (
                                                            <MapPin className="w-12 h-12 text-white/30" />
                                                        )}
                                                    </div>
                                                )}

                                                {/* Type Badge */}
                                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-semibold capitalize">
                                                    {result.type}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                                                    {result.name}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                                    {result.description}
                                                </p>
                                                {result.address && (
                                                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                        <span className="line-clamp-1">{result.address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : searchQuery ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filters
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Start searching</h3>
                        <p className="text-muted-foreground">
                            Enter a search term to discover foods and places
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20">
            <Suspense fallback={
                <div className="min-h-[50vh] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <SearchContent />
            </Suspense>
        </main>
    );
}
