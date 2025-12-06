"use client";

import { motion } from "framer-motion";
import { BookOpen, Landmark, Calendar, Users, Fish, Church, Utensils } from "lucide-react";
import { ParallaxSection } from "@/components/storytelling/ParallaxSection";
import { TextReveal } from "@/components/storytelling/TextReveal";
import { Timeline } from "@/components/storytelling/Timeline";
import { culturalStories } from "@/lib/data";

const culturalHighlights = [
    {
        id: 1,
        title: "Malabon's Fishing Heritage",
        icon: Fish,
        description: "Discover how Malabon's identity as a fishing town shaped its culinary traditions and community.",
    },
    {
        id: 2,
        title: "Historic Landmarks",
        icon: Landmark,
        description: "Explore centuries-old churches, heritage houses, and monuments that tell Malabon's story.",
    },
    {
        id: 3,
        title: "Festivals & Traditions",
        icon: Calendar,
        description: "Experience vibrant fiestas, religious celebrations, and cultural events unique to Malabon.",
    }
];

const timelineEvents = [
    {
        year: 1599,
        title: "Tambobong Founded",
        description: "On May 21, 1599, the settlement originally called Tambobong was founded as a visita (mission station) of Tondo by the Augustinians. The name referred to the abundance of 'tambo' plants."
    },
    {
        year: "Approx. 1600",
        title: "Renamed to Malabon",
        description: "The settlement adopted the name 'Malabon' from the Tagalog phrase 'maraming labong,' meaning 'plenty of bamboo shoots,' reflecting the area's abundant bamboo vegetation."
    },
    {
        year: 1614,
        title: "San Bartolome Parish Established",
        description: "On May 17, 1614, Tambobong was elevated to an independent parish dedicated to Saint Bartholomew the Apostle, marking early community organization."
    },
    {
        year: 1800,
        title: "Economic Development",
        description: "Throughout the 18th and 19th centuries, the area developed economically under Spanish rule, engaging in agriculture, fishing, and trade due to its proximity to Manila Bay."
    },
    {
        year: 1901,
        title: "Part of Rizal Province",
        description: "On June 11, 1901, under the American colonial government, Malabon was made part of the newly created Rizal Province via Philippine Commission Act No. 137."
    },
    {
        year: 1906,
        title: "Independent Municipality",
        description: "On January 16, 1906, Malabon was separated from Navotas by Act No. 1441, reestablishing it as a distinct municipality."
    },
    {
        year: 1930,
        title: "Dolor's Kakanin Established",
        description: "The iconic Dolor's Kakanin opened its doors, beginning a legacy of traditional Filipino rice cakes that continues today."
    },
    {
        year: 1960,
        title: "Pancit Malabon Created",
        description: "Chinese immigrants combined thick rice noodles with abundant seafood from Manila Bay, creating the signature Pancit Malabon."
    },
    {
        year: 1975,
        title: "Part of Metro Manila",
        description: "On November 7, 1975, by virtue of Presidential Decree 824, Malabon became part of the newly formed Metro Manila (National Capital Region)."
    },
    {
        year: 2001,
        title: "Cityhood Achieved",
        description: "On April 21, 2001, the municipality of Malabon was converted into a highly-urbanized city under Republic Act 9019, officially becoming the City of Malabon."
    },
    {
        year: 2022,
        title: "First Female Mayor",
        description: "Jeannie Sandoval made history as Malabon's first female mayor, bringing fresh leadership and focus on education and women's empowerment."
    },
    {
        year: 2024,
        title: "425th Foundation Day",
        description: "In June 2024, the 425th Foundation Day of Malabon was commemorated, recognizing the city's historic roots dating back to 1599."
    },
    {
        year: 2025,
        title: "Guinness World Record",
        description: "Malabon set a Guinness World Record with 6,549 bowls of Pancit Malabon lined up in a single event, celebrating its culinary heritage."
    }
];

export default function CulturePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden w-full">
            {/* Hero Section with Parallax */}
            <ParallaxSection
                className="min-h-screen flex items-center justify-center pt-20 relative z-0"
                speed={0.3}
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <TextReveal delay={0.2}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <BookOpen className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-muted-foreground">Cultural Heritage</span>
                        </div>
                    </TextReveal>

                    <TextReveal delay={0.4}>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            Malabon <span className="text-gradient">Culture & History</span>
                        </h1>
                    </TextReveal>

                    <TextReveal delay={0.6}>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Immerse yourself in the rich tapestry of Malabon's heritage, traditions, and stories
                            that have been woven through centuries.
                        </p>
                    </TextReveal>
                </div>
            </ParallaxSection>

            {/* Cultural Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <TextReveal>
                    <h2 className="text-4xl font-bold mb-12 text-center">Explore Our Heritage</h2>
                </TextReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {culturalHighlights.map((item, index) => (
                        <TextReveal key={item.id} delay={index * 0.2}>
                            <div className="glass-dark rounded-3xl overflow-hidden hover-lift border border-white/5 group h-full">
                                <div className="p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                        <item.icon className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                    <button className="text-accent hover:text-accent/80 font-semibold transition-colors">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        </TextReveal>
                    ))}
                </div>
            </section>

            {/* Timeline Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full">
                <TextReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Journey Through Time</h2>
                        <p className="text-muted-foreground text-lg">
                            Discover the key moments that shaped Malabon's identity
                        </p>
                    </div>
                </TextReveal>

                <Timeline events={timelineEvents} />
            </section>

            {/* Cultural Stories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <TextReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Cultural Stories</h2>
                        <p className="text-muted-foreground text-lg">
                            Discover the legends, traditions, and heritage that define Malabon
                        </p>
                    </div>
                </TextReveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {culturalStories.map((story, index) => (
                        <TextReveal key={story.id} delay={index * 0.2}>
                            <div className="glass-dark rounded-3xl overflow-hidden hover-lift border border-white/5 group h-full">
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent">
                                            {story.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                                        {story.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {story.content}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {story.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 rounded-full bg-white/5 text-xs text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TextReveal>
                    ))}
                </div>
            </section>

            {/* Fishing Heritage Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 mb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <TextReveal direction="left">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">
                                A City Built on <span className="text-gradient">Water</span>
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                Malabon's name itself means "plenty of fish" in Tagalog, a testament to its rich fishing heritage.
                                The city's network of waterways and proximity to Manila Bay made it a natural hub for fishing
                                and seafood trade.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                This maritime heritage is deeply embedded in Malabon's cuisine, from the fresh bangus (milkfish)
                                used in Rellenong Bangus to the tinapa (smoked fish) sold in local markets.
                            </p>
                            <button className="px-6 py-3 glass hover:bg-white/10 rounded-full font-semibold transition-all">
                                Explore Fishing Heritage
                            </button>
                        </div>
                    </TextReveal>

                    <TextReveal direction="right" delay={0.3}>
                        <div className="relative h-96 rounded-3xl overflow-hidden hover-lift border border-white/5 group">
                            <img
                                src="/assets/images/fishing-heritage.jpg"
                                alt="Malabon Fishing Heritage"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-xs font-semibold text-accent mb-4">
                                    <Fish className="w-3 h-3" />
                                    <span>Maritime History</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">The Fishing Capital</h3>
                                <p className="text-muted-foreground text-sm max-w-md">
                                    Discover why Malabon is known as the Venice of the Philippines
                                </p>
                            </div>
                        </div>
                    </TextReveal>
                </div>
            </section>
        </main>
    );
}
