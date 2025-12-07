"use client";

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChefHat, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { foods, businesses } from "@/lib/data";

interface SearchResult {
    _id: string;
    name: string;
    type: "food" | "business";
    category?: string;
    image?: string;
}

export function SearchAutocomplete() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length >= 2) {
                performSearch(query);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300); // Debounce search

        return () => clearTimeout(timer);
    }, [query]);

    function performSearch(searchQuery: string) {
        setIsLoading(true);
        try {
            const query = searchQuery.toLowerCase();
            const combinedResults: SearchResult[] = [];

            // Search foods
            const foodResults = foods
                .filter(food =>
                    food.name.toLowerCase().includes(query) ||
                    food.description.toLowerCase().includes(query) ||
                    food.category.toLowerCase().includes(query)
                )
                .slice(0, 3)
                .map(food => ({
                    _id: food.id,
                    name: food.name,
                    type: "food" as const,
                    category: food.category,
                    image: food.images?.[0]
                }));

            // Search businesses
            const businessResults = businesses
                .filter(business =>
                    business.name.toLowerCase().includes(query) ||
                    business.description.toLowerCase().includes(query) ||
                    business.category.toLowerCase().includes(query)
                )
                .slice(0, 3)
                .map(business => ({
                    _id: business.id,
                    name: business.name,
                    type: "business" as const,
                    category: business.category,
                    image: business.images?.[0]
                }));

            combinedResults.push(...foodResults, ...businessResults);
            setResults(combinedResults);
            setIsOpen(true);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSelect = (result: SearchResult) => {
        setQuery(result.name);
        setIsOpen(false);
        router.push(`/${result.type === "food" ? "foods" : "places"}/${result._id}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full mx-auto z-50">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Search className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    className="block w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-neutral-200/20 dark:border-white/10 rounded-full text-sm sm:text-base text-neutral-800 dark:text-white placeholder-neutral-500/70 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/20 dark:focus:bg-white/10 transition-all shadow-lg"
                    placeholder="Search delicacies, restaurants..."
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setResults([]);
                            setIsOpen(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-muted-foreground hover:text-white transition-colors"
                    >
                        <X className="h-4 sm:h-5 w-4 sm:w-5" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (results.length > 0 || isLoading) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[60vh] overflow-y-auto"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-muted-foreground flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Searching...</span>
                            </div>
                        ) : (
                            <div className="py-2">
                                {results.map((result) => (
                                    <button
                                        key={`${result.type}-${result._id}`}
                                        onClick={() => handleSelect(result)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 hover:bg-white/5 transition-colors text-left group"
                                    >
                                        <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                            {result.image ? (
                                                <Image
                                                    src={result.image}
                                                    alt={result.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    {result.type === "food" ? (
                                                        <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                                                    ) : (
                                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-white group-hover:text-primary transition-colors truncate text-sm sm:text-base">
                                                {result.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="capitalize bg-white/10 px-2 py-0.5 rounded text-[10px]">
                                                    {result.type}
                                                </span>
                                                {result.category && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="truncate">{result.category}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="border-t border-white/10 mt-2 pt-2 px-2">
                                    <button
                                        onClick={() => router.push(`/search?q=${encodeURIComponent(query)}`)}
                                        className="w-full py-2 text-center text-xs sm:text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        View all results for "{query}"
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
