"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export function TextReveal({
    children,
    delay = 0,
    direction = "up",
    className = ""
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 }
    };

    const initial = {
        opacity: 0,
        ...directions[direction]
    };

    const animate = {
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : directions[direction].y,
        x: isInView ? 0 : directions[direction].x
    };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={animate}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.4, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
