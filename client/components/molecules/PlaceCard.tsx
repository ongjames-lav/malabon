"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";

interface PlaceCardProps {
    id: string;
    name: string;
    description: string;
    category: string;
    rating?: number;
    image: string;
    address?: string;
    isSignature?: boolean;
    type?: "food" | "places";
    onClick?: () => void;
}

export const PlaceCard = ({
    id,
    name,
    description,
    category,
    rating,
    image,
    address,
    isSignature,
    type = "food",
    onClick,
}: PlaceCardProps) => {
    const href = type === "food" ? `/foods/${id}` : `/places/${id}`;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-smooth transition-all"
        >
            <Link href={href} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">{category}</Badge>
                        {isSignature && <Badge variant="accent">Signature</Badge>}
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <h3 className="font-display text-xl font-bold text-foreground line-clamp-1">{name}</h3>
                        {rating && (
                            <div className="flex items-center gap-1 text-sm font-bold text-primary">
                                <Star className="h-4 w-4 fill-primary" />
                                {rating}
                            </div>
                        )}
                    </div>

                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2 h-10">{description}</p>

                    {address && (
                        <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span className="line-clamp-1">{address}</span>
                        </div>
                    )}

                    <div className="inline-flex items-center rounded-xl transition-all duration-200 font-medium uppercase tracking-wide bg-transparent text-primary hover:bg-primary/10 px-3 py-1.5 text-sm w-full justify-between group/btn">
                        Learn More
                        <span className="ml-2">
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
