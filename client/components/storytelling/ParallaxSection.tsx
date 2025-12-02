"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
    children: ReactNode;
    backgroundImage?: string;
    speed?: number;
    className?: string;
}

export function ParallaxSection({
    children,
    backgroundImage,
    speed = 0.5,
    className = ""
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {/* Background Layer with Parallax */}
            {backgroundImage && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 -z-10"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-110"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/80" />
                </motion.div>
            )}

            {/* Content Layer */}
            <motion.div style={{ opacity }} className="relative z-10">
                {children}
            </motion.div>
        </div>
    );
}
