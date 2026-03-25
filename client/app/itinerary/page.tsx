"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, Tent, Utensils, Camera } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

const sampleItineraries = [
    {
        title: "Malabon Food Crawl",
        description: "A culinary journey through the city's most iconic flavors.",
        duration: "4-6 Hours",
        stops: [
            { time: "09:00 AM", place: "Dolor's Kakanin", activity: "Traditional Breakfast", icon: <Utensils /> },
            { time: "11:30 AM", place: "Nanay's Pancit Malabon", activity: "Lunch Stop", icon: <Utensils /> },
            { time: "02:00 PM", place: "Betsy's Cake Center", activity: "Afternoon Snacks", icon: <Tent /> },
        ]
    },
    {
        title: "Heritage & History",
        description: "Explore the ancient churches and heritage houses of Malabon.",
        duration: "Full Day",
        stops: [
            { time: "08:00 AM", place: "San Bartolome Church", activity: "Historical Tour", icon: <Camera /> },
            { time: "10:30 AM", place: "Raymundo House", activity: "Heritage Sightseeing", icon: <MapPin /> },
            { time: "01:00 PM", place: "River Cruise", activity: "Venice of the North Experience", icon: <Sparkles /> },
        ]
    },
    {
        title: "Stay & Relaxation",
        description: "A slower pace exploring riverside spots and cozy accommodations.",
        duration: "2 Days / 1 Night",
        stops: [
            { time: "03:00 PM", place: "Megadike Floating Cafe", activity: "Sunset Viewing", icon: <Sparkles /> },
            { time: "06:00 PM", place: "Balsalo Restaurant", activity: "Dinner by the Water", icon: <Utensils /> },
            { time: "08:00 PM", place: "Malabon Gateway", activity: "Check-in & Rest", icon: <Tent /> },
            { time: "08:00 AM", place: "Kape at Iba Pets", activity: "Morning Coffee", icon: <Utensils /> },
        ]
    }
];

import { Home, Bed, Hotel, ShieldCheck } from "lucide-react";

export default function ItineraryPage() {
    const [selectedItinerary, setSelectedItinerary] = useState(0);

    return (
        <main className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Sidebar - Options */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="space-y-4">
                        <Badge variant="primary" className="px-3 py-1 bg-primary/10 text-primary">
                            Trip Planner
                        </Badge>
                        <h1 className="font-display text-4xl font-black text-foreground">
                            Plan Your <br /><span className="text-primary italic">Adventure</span>
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Choose a curated path or let our AI Companion build one just for you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Curated Itineraries</p>
                        {sampleItineraries.map((it, idx) => (
                            <button
                                key={it.title}
                                onClick={() => setSelectedItinerary(idx)}
                                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                                    selectedItinerary === idx 
                                        ? "bg-white dark:bg-card border-primary shadow-glow ring-2 ring-primary/5" 
                                        : "bg-muted/30 border-border hover:border-primary/50"
                                }`}
                            >
                                <h3 className="font-bold text-foreground mb-1">{it.title}</h3>
                                <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{it.description}</p>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tighter">
                                    <span className="flex items-center gap-1 text-primary"><Clock className="h-3 w-3" /> {it.duration}</span>
                                    <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {it.stops.length} Stops</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-primary text-white space-y-4 shadow-glow">
                        <Sparkles className="h-8 w-8 text-white/80" />
                        <h3 className="font-bold text-lg">Custom AI Plan?</h3>
                        <p className="text-sm text-white/80">Tell Buddy your interests and he'll generate a personalized path for you.</p>
                        <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                            Ask Buddy to Plan
                        </Button>
                    </div>
                </div>

                {/* Right Content - Timeline */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-smooth">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="font-display text-2xl md:text-3xl font-bold">{sampleItineraries[selectedItinerary].title}</h2>
                            <Button variant="ghost" className="gap-2">
                                <Calendar className="h-4 w-4" /> Save to My Trips
                            </Button>
                        </div>

                        <div className="relative space-y-12">
                            {/* The vertical line */}
                            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                            {sampleItineraries[selectedItinerary].stops.map((stop, idx) => (
                                <motion.div 
                                    key={stop.place}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative flex gap-8 group"
                                >
                                    {/* Stop Dot */}
                                    <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-full bg-white dark:bg-card border-4 border-primary shadow-glow flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        {stop.icon}
                                    </div>

                                    <div className="space-y-2 pb-8 border-b border-border/50 last:border-0 w-full">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{stop.time}</span>
                                            <Badge variant="secondary" size="sm">{stop.activity}</Badge>
                                        </div>
                                        <h4 className="font-display text-xl font-bold">{stop.place}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                                            Experience the authentic vibe of Malabon at this iconic location. 
                                            Highly recommended for both tourists and locals.
                                        </p>
                                        <Button variant="ghost" size="sm" className="p-0 text-primary hover:bg-transparent group/link">
                                            View Details <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/* Where to Stay Section */}
            <div className="col-span-full pt-12">
                <div className="bg-secondary text-secondary-foreground rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest leading-none">
                                <Bed className="h-4 w-4" />
                                Accommodations
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl font-bold">Where to <span className="text-primary italic">Stay?</span></h2>
                            <p className="text-secondary-foreground/70 text-lg">
                                Discover the most authentic stays in Malabon. From heritage houses to modern guesthouses, 
                                our partners ensure your stay is comfortable and memorable.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <StayCard 
                                    icon={<Home />}
                                    name="Malabon Gateway"
                                    type="Boutique Guesthouse"
                                />
                                <StayCard 
                                    icon={<Hotel />}
                                    name="Heritage Suites"
                                    type="Historical Stay"
                                />
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 space-y-6">
                            <h3 className="font-display text-2xl font-bold">Lodging Partnerships</h3>
                            <p className="text-sm text-white/70">
                                All our recommended stays are part of the **Lakbay Malabon Partner Program**, 
                                ensuring high standards of safety and local hospitality.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span>Verified local hosts</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    <span>Tourism-accredited facilities</span>
                                </li>
                            </ul>
                            <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest py-6">
                                Book Through AI Buddy
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

const StayCard = ({ icon, name, type }: { icon: React.ReactNode; name: string; type: string }) => (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-4 group">
        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-xs text-white/50">{type}</p>
        </div>
    </div>
);
