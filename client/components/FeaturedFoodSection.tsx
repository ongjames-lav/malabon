"use client";

import { motion } from "framer-motion";
import { ChefHat, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

const featuredFoods = [
    {
        id: "pancit-malabon",
        name: "Pancit Malabon",
        description: "The signature dish. Thick rice noodles with rich orange shrimp-based sauce, topped with chicharrón, boiled eggs, shrimp, tinapa flakes, and oysters/squid.",
        details: "Famous sellers: Nanay’s, Mommy Dolor’s, Aling Mely’s",
        image: "/assets/images/food/pancit-malabon.png",
        tags: ["Signature Dish", "Noodles"]
    },
    {
        id: "puto-bumbong",
        name: "Puto Bumbong / Sulot",
        description: "Malabon's version is softer, moist, made with real pirurutong, and has generous toppings of margarine, niyog, and brown sugar.",
        details: "Often sold near churches like San Bartolome Parish.",
        image: "/assets/images/food/puto-bumbong.jpg",
        tags: ["Kakanin", "Sweet"]
    },
    {
        id: "sapin-sapin",
        name: "Dolor's Sapin-Sapin",
        description: "Nationally known for its clean layers, unique flavors, custard-like texture, and old family recipe.",
        details: "One of the most iconic delicacies of the city.",
        image: "/assets/images/food/dolors-sapin-sapin.jpg",
        tags: ["Dessert", "Iconic"]
    },
    {
        id: "kakanin",
        name: "Kakanin & Rice Cakes",
        description: "A wide variety of tray-sold delights: Kutsinta, Biko, Ube Halaya, Pichi-Pichi, Cassava Cake, and Puto Kutsinta.",
        details: "Popular during fiestas or road stalls.",
        image: "/assets/images/food/kakanin-mix.jpg",
        tags: ["Variety", "Snack"]
    },
    {
        id: "okoy",
        name: "Crispy Okoy",
        description: "Deep-fried shrimp fritters made with squash or bean sprouts. Best dipped in spicy vinegar.",
        details: "A favorite afternoon snack in Malabon markets.",
        image: "/assets/images/food/ukoy.jpg",
        tags: ["Street Food", "Crispy"]
    },
    {
        id: "rellenong-bangus",
        name: "Rellenong Bangus",
        description: "Stuffed Milkfish. A labor-intensive dish where the fish meat is flaked, seasoned, and stuffed back into the skin before frying.",
        details: "A festive dish showcasing local aquaculture.",
        image: "/assets/images/food/rellenong-bangus.jpg",
        tags: ["Seafood", "Specialty"]
    },
    {
        id: "adobong-pusit",
        name: "Adobong Pusit",
        description: "Squid stewed in vinegar, soy sauce, and squid ink. A savory and tangy seafood classic.",
        details: "Often served with plenty of garlic.",
        image: "/assets/images/food/adobong-pusit.jpg",
        tags: ["Seafood", "Savory"]
    },
    {
        id: "tinapa",
        name: "Tinapa (Smoked Fish)",
        description: "A signature product of the fishing community. Includes Tinapang Bangus, Salinas, and Galunggong.",
        details: "Often bought as pasalubong.",
        image: "/assets/images/food/tinapa.jpg",
        tags: ["Seafood", "Pasalubong"]
    },
    {
        id: "sumpia",
        name: "Sumpia",
        description: "Malabon Spring Rolls. Crispy small fried rolls with sweet-savory green papaya filling.",
        details: "A unique street-food classic.",
        image: "/assets/images/food/sumpia.jpg",
        tags: ["Street Food", "Snack"]
    },
    {
        id: "broas",
        name: "Broas",
        description: "Ladyfinger biscuits sold by traditional bakeries. Known for their airy texture and mild sweetness.",
        details: "Perfect with coffee or tea.",
        image: "/assets/images/food/broas.jpg",
        tags: ["Bakery", "Sweet"]
    },
    {
        id: "fried-chicken",
        name: "Malabon Fried Chicken",
        description: "Local homegrown style marinated in old-style recipes. Distinct from commercial fast food.",
        details: "Try it at Jamico’s.",
        image: "/assets/images/food/malabon-chicken.jpg",
        tags: ["Main Dish", "Local Favorite"]
    },
    {
        id: "crispy-pata",
        name: "Crispy Pata",
        description: "Jamico’s Restaurant version is famous across Metro Manila. Perfectly crispy skin and tender meat.",
        details: "A destination dish for many visitors.",
        image: "/assets/images/food/crispy-pata.jpg",
        tags: ["Famous", "Main Dish"]
    }
];

export function FeaturedFoodSection() {
    return (
        <section className="py-20 px-6 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <ChefHat className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-muted-foreground">Culinary Heritage</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Famous <span className="text-gradient">Delicacies</span>
                    </h2>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                        Explore the top 10 authentic flavors that put Malabon on the culinary map.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredFoods.map((food, index) => (
                        <motion.div
                            key={food.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-dark rounded-3xl overflow-hidden hover-lift group border border-white/5 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
                                <Image
                                    src={food.image}
                                    alt={food.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    {food.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                                        {food.name}
                                    </h3>
                                    <span className="text-4xl font-display font-bold text-white/5 absolute top-4 right-4 select-none">
                                        {index + 1}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                                    {food.description}
                                </p>

                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-sm text-accent font-medium mb-2 flex items-center gap-2">
                                        <Star className="w-3 h-3" />
                                        {food.details}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bonus Section */}
                <div className="mt-20 glass p-10 rounded-[2.5rem] text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 relative z-10">🎉 Seasonal Favorites & More</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        <div className="p-4">
                            <h4 className="text-xl font-bold text-accent mb-2">Pancit sa Bilao</h4>
                            <p className="text-sm text-muted-foreground">The ultimate centerpiece for fiestas and birthdays.</p>
                        </div>
                        <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
                            <h4 className="text-xl font-bold text-accent mb-2">Bibingka</h4>
                            <p className="text-sm text-muted-foreground">A holiday staple sold especially during Simbang Gabi.</p>
                        </div>
                        <div className="p-4 border-t md:border-t-0 md:border-l border-white/10">
                            <h4 className="text-xl font-bold text-accent mb-2">Oysters & Seafood</h4>
                            <p className="text-sm text-muted-foreground">Fresh from the market, highlighting our fishing town roots.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
