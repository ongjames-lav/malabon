"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ImageRevealProps {
    src: string;
    alt: string;
    direction?: "left" | "right" | "up" | "down";
    className?: string;
}

export function ImageReveal({
    src,
    alt,
    direction = "left",
    className = ""
}: ImageRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const clipPaths = {
        left: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        right: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        up: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        down: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
    };

    const clipPathEnd = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                initial={{ clipPath: clipPaths[direction] }}
                animate={{
                    clipPath: isInView ? clipPathEnd : clipPaths[direction]
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative w-full h-full"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
}
