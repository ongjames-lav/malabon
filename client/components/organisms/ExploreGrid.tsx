"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Utensils, MapPin, Sparkles } from "lucide-react";
import { foods, businesses } from "@/lib/data";
import { PlaceCard } from "@/components/molecules/PlaceCard";
import { Button } from "@/components/atoms/Button";

type FilterType = "all" | "food" | "places" | "signature";

export const ExploreGrid = () => {
    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const items = useMemo(() => {
        const allItems = [
            ...foods.map((f) => ({
                id: f.id,
                name: f.name,
                description: f.description,
                category: f.category,
                image: f.images[0],
                type: "food" as const,
                isSignature: f.isSignature,
            })),
            ...businesses.map((b) => ({
                id: b.id,
                name: b.name,
                description: b.description,
                category: b.category,
                image: b.images[0],
                rating: b.rating,
                address: b.address,
                type: "places" as const,
                isSignature: false,
            })),
        ];

        return allItems.filter((item) => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 item.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (filter === "all") return matchesSearch;
            if (filter === "food") return matchesSearch && item.type === "food";
            if (filter === "places") return matchesSearch && item.type === "places";
            if (filter === "signature") return matchesSearch && item.isSignature;
            return matchesSearch;
        });
    }, [filter, searchQuery]);

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
                        Discover <span className="text-primary italic">Malabon</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        Explore the city's hidden gems, iconic delicacies, and local legends.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="relative group flex-grow md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        <input
                            type="text"
                            placeholder="Find food, places, vibes..."
                            className="w-full bg-white dark:bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-3 pl-12 pr-4 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <FilterButton active={filter === "all"} onClick={() => setFilter("all")} icon={<Filter className="h-4 w-4" />}>All</FilterButton>
                <FilterButton active={filter === "food"} onClick={() => setFilter("food")} icon={<Utensils className="h-4 w-4" />}>Food & Delicacies</FilterButton>
                <FilterButton active={filter === "places"} onClick={() => setFilter("places")} icon={<MapPin className="h-4 w-4" />}>Top Places</FilterButton>
                <FilterButton active={filter === "signature"} onClick={() => setFilter("signature")} icon={<Sparkles className="h-4 w-4" />}>Signature Gems</FilterButton>
            </div>

            <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={`${item.type}-${item.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PlaceCard {...item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {items.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Search className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold">No results found</h3>
                    <p className="text-muted-foreground">Try searching for something else, like "Pancit" or "River".</p>
                    <Button variant="ghost" onClick={() => {setFilter("all"); setSearchQuery("");}}>Clear all filters</Button>
                </div>
            )}
        </section>
    );
};

const FilterButton = ({ active, children, onClick, icon }: { active: boolean; children: React.ReactNode; onClick: () => void; icon: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
            active 
                ? "bg-primary text-white shadow-glow" 
                : "bg-white dark:bg-muted/30 border border-border hover:border-primary text-muted-foreground hover:text-primary"
        )}
    >
        {icon}
        {children}
    </button>
);

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
