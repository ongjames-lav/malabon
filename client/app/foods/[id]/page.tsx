"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, ChefHat, MapPin, History, Sparkles, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { foods, businesses, type Food, type Business } from "@/lib/data";

export default function FoodDetailPage() {
    const params = useParams();
    const [food, setFood] = useState<Food | null>(null);
    const [relatedBusinesses, setRelatedBusinesses] = useState<Business[]>([]);

    useEffect(() => {
        // Find the food by ID from static data
        const foundFood = foods.find(f => f.id === params.id);
        setFood(foundFood || null);

        // Find businesses that serve this food
        if (foundFood) {
            const bizWithFood = businesses.filter(b =>
                b.menu_items.includes(foundFood.id)
            );
            setRelatedBusinesses(bizWithFood);
        }
    }, [params.id]);

    if (!food) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Food Not Found</h1>
                    <p className="text-muted-foreground mb-8">This delicacy does not exist.</p>
                    <Link href="/foods" className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all inline-block">
                        Back to Foods
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {food.images && food.images[0] ? (
                        <Image
                            src={food.images[0]}
                            alt={food.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ChefHat className="w-32 h-32 text-accent/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                </div>

                {/* Content */}
                <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-start md:justify-end min-h-screen pb-8 sm:pb-12 pt-24 sm:pt-28 md:pb-12 md:pt-0">
                    {/* Breadcrumb */}
                    <Link
                        href="/foods"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 sm:mb-12 w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Delicacies</span>
                    </Link>

                    {/* Title and Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            <span className="text-gradient">{food.name}</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-6">
                            {food.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium border border-white/20">
                                {food.category}
                            </span>
                            {food.isSignature && (
                                <span className="px-4 py-1.5 rounded-full bg-accent/90 backdrop-blur-md text-sm font-bold border border-accent flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-current" />
                                    Signature Dish
                                </span>
                            )}
                            {food.price && (
                                <span className="px-4 py-1.5 rounded-full bg-green-500/20 backdrop-blur-md text-sm font-semibold border border-green-500/30 flex items-center gap-2">
                                    {food.price}
                                </span>
                            )}
                        </div>

                        {food.servingSize && (
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                                <UtensilsCrossed className="w-4 h-4 text-accent" />
                                <span className="text-sm text-muted-foreground">Serving: {food.servingSize}</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* History */}
                        {food.history && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="glass p-8 rounded-3xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                                        <History className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-3xl font-bold">History & Origin</h2>
                                </div>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {food.history}
                                </p>
                            </motion.div>
                        )}

                        {/* Best Paired With */}
                        {food.bestPairedWith && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="glass p-8 rounded-3xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold">Best Paired With</h2>
                                </div>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {food.bestPairedWith}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Ingredients */}
                        {food.ingredients && food.ingredients.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="glass p-6 rounded-3xl"
                            >
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <ChefHat className="w-5 h-5 text-accent" />
                                    Ingredients
                                </h3>
                                <ul className="space-y-2">
                                    {food.ingredients.map((ingredient, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 text-muted-foreground"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="capitalize">{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {/* Where to Find */}
                        {relatedBusinesses && relatedBusinesses.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="glass p-6 rounded-3xl"
                            >
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-accent" />
                                    Where to Find
                                </h3>
                                <div className="space-y-3">
                                    {relatedBusinesses.map((business) => (
                                        <Link
                                            key={business.id}
                                            href={`/places/${business.id}`}
                                            className="block p-3 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                            <p className="font-semibold">{business.name}</p>
                                            <p className="text-sm text-muted-foreground">{business.address}</p>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="glass p-6 rounded-3xl text-center"
                        >
                            <h3 className="text-lg font-bold mb-3">Want to try this?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Visit one of the restaurants serving this delicacy
                            </p>
                            <Link
                                href="/places"
                                className="block px-6 py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all"
                            >
                                Find Restaurants
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
