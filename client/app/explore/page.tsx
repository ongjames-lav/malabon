"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ExploreGrid } from "@/components/organisms/ExploreGrid";
import { MapPin, LayoutGrid, Map } from "lucide-react";

// Leaflet must be loaded client-side only  
const MalabonMap = dynamic(
    () => import("@/components/organisms/MalabonMap").then((mod) => mod.MalabonMap),
    { ssr: false, loading: () => <div className="w-full h-[600px] bg-muted/30 rounded-2xl animate-pulse flex items-center justify-center text-muted-foreground">Loading Map...</div> }
);

type ViewMode = "grid" | "map";

export default function ExplorePage() {
    const [view, setView] = useState<ViewMode>("grid");

    return (
        <main className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header with View Toggle */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest leading-none">
                            <MapPin className="h-3 w-3" />
                            Explore Malabon
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-black text-foreground tracking-tight">
                            Discover Hidden <span className="text-primary italic">Gems</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            From the world-famous Pancit Malabon to centuries-old heritage sites,
                            find everything you need to experience the city like a local.
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center rounded-xl border border-border overflow-hidden bg-white dark:bg-card shadow-sm self-start md:self-end">
                        <button
                            onClick={() => setView("grid")}
                            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all ${
                                view === "grid"
                                    ? "bg-primary text-white"
                                    : "text-muted-foreground hover:text-primary"
                            }`}
                        >
                            <LayoutGrid className="h-4 w-4" />
                            Grid
                        </button>
                        <button
                            onClick={() => setView("map")}
                            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all ${
                                view === "map"
                                    ? "bg-primary text-white"
                                    : "text-muted-foreground hover:text-primary"
                            }`}
                        >
                            <Map className="h-4 w-4" />
                            Map
                        </button>
                    </div>
                </div>

                {/* Content */}
                {view === "grid" ? (
                    <ExploreGrid />
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            📍 Click any pin to view details and get <strong>step-by-step directions</strong>. Use the controls on the right to switch between walking and driving.
                        </p>
                        <MalabonMap />
                    </div>
                )}

                {/* CTA */}
                <div className="pt-20 border-t border-border mt-20 text-center">
                    <h2 className="font-display text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                        Our AI Companion is always ready to help you discover even more specific spots.
                    </p>
                </div>
            </div>
        </main>
    );
}
