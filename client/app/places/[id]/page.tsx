"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Phone, Globe, Clock, ChefHat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AIReviewSummary } from "@/components/detail/AIReviewSummary";

interface Business {
    _id: string;
    name: string;
    description?: string;
    address: string;
    category: string;
    rating?: number;
    images?: string[];
    contact?: {
        phone?: string;
    };
    social_links?: {
        website?: string;
    };
    reviews_summary?: string;
    menu_items?: Array<{
        _id: string;
        name: string;
        description: string;
        image_url?: string;
    }>;
}

export default function BusinessDetailPage() {
    const params = useParams();
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBusiness();
    }, [params.id]);

    async function loadBusiness() {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/businesses/${params.id}`);
            if (!response.ok) throw new Error('Business not found');
            const data = await response.json();
            setBusiness(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load business');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="animate-pulse">
                        <div className="h-96 bg-slate-800 rounded-3xl mb-8" />
                        <div className="h-12 bg-slate-800 rounded w-1/2 mb-4" />
                        <div className="h-6 bg-slate-800 rounded w-3/4" />
                    </div>
                </div>
            </main>
        );
    }

    if (error || !business) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Business Not Found</h1>
                    <p className="text-muted-foreground mb-8">{error || 'This business does not exist.'}</p>
                    <Link href="/places" className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all inline-block">
                        Back to Places
                    </Link>
                </div>
            </main>
        );
    }

    const coverImage = business.images && business.images.length > 0 ? business.images[0] : null;

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {coverImage ? (
                        <Image
                            src={coverImage}
                            alt={business.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                            <MapPin className="w-32 h-32 text-accent/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
                    {/* Breadcrumb */}
                    <Link
                        href="/places"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Places</span>
                    </Link>

                    {/* Title and Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium border border-white/20">
                                {business.category}
                            </span>
                            {business.rating && business.rating > 0 && (
                                <span className="px-4 py-1.5 rounded-full bg-yellow-500/20 backdrop-blur-md text-sm font-bold border border-yellow-500/30 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {business.rating.toFixed(1)}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            <span className="text-gradient">{business.name}</span>
                        </h1>

                        <div className="flex items-center gap-2 text-gray-200 mb-4">
                            <MapPin className="w-5 h-5 text-accent" />
                            <span className="text-lg">{business.address}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {business.contact?.phone && (
                                <a
                                    href={`tel:${business.contact.phone}`}
                                    className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all flex items-center gap-2"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call
                                </a>
                            )}
                            {business.social_links?.website && (
                                <a
                                    href={business.social_links.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 glass hover:bg-white/20 rounded-full font-semibold transition-all flex items-center gap-2"
                                >
                                    <Globe className="w-4 h-4" />
                                    Website
                                </a>
                            )}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 glass hover:bg-white/20 rounded-full font-semibold transition-all flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        {business.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass-dark p-8 rounded-3xl"
                            >
                                <h2 className="text-3xl font-bold mb-6">About</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {business.description}
                                </p>
                            </motion.div>
                        )}

                        {/* AI Review Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <AIReviewSummary
                                businessId={business._id}
                                initialSummary={business.reviews_summary}
                            />
                        </motion.div>

                        {/* Menu Items */}
                        {business.menu_items && business.menu_items.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass-dark p-8 rounded-3xl"
                            >
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <ChefHat className="w-8 h-8 text-accent" />
                                    Menu Highlights
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {business.menu_items.map((item) => (
                                        <Link
                                            key={item._id}
                                            href={`/foods/${item._id}`}
                                            className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                                        >
                                            {item.image_url && (
                                                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image_url}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold group-hover:text-accent transition-colors">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-dark p-6 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                {business.contact?.phone && (
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <Phone className="w-5 h-5 text-accent" />
                                        <span>{business.contact.phone}</span>
                                    </div>
                                )}
                                <div className="flex items-start gap-3 text-muted-foreground">
                                    <MapPin className="w-5 h-5 text-accent mt-1" />
                                    <span>{business.address}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Map Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-dark p-6 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold mb-4">Location</h3>
                            <div className="aspect-square rounded-2xl bg-slate-900/50 border-2 border-dashed border-white/10 flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-accent/30 mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Map integration coming soon</p>
                                </div>
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 px-4 py-2 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all text-center"
                            >
                                Open in Google Maps
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
