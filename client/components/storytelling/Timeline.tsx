"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";

interface TimelineEvent {
    year: string | number;
    title: string;
    description: string;
}

interface TimelineProps {
    events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={ref} className="relative py-20 w-full overflow-x-hidden">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 z-0 pointer-events-none">
                <motion.div
                    style={{ height: lineHeight }}
                    className="w-full bg-gradient-to-b from-accent to-primary"
                />
            </div>

            {/* Events */}
            <div className="space-y-16 md:space-y-24 relative z-10">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`relative flex gap-4 md:gap-0 ${index % 2 === 0 ? "md:flex-row flex-col" : "md:flex-row-reverse flex-col"
                            }`}
                    >
                        {/* Content */}
                        <div className={`w-full md:w-5/12 z-10 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                            <div className="glass p-6 rounded-2xl hover-lift">
                                <div className="text-accent font-bold text-sm mb-2 flex items-center gap-2 justify-end">
                                    <Calendar className="w-4 h-4" />
                                    {event.year}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                                <p className="text-muted-foreground">{event.description}</p>
                            </div>
                        </div>

                        {/* Desktop Dot */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary border-4 border-background z-20"
                        />

                        {/* Mobile Dot - Position Left */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            className="md:hidden w-3 h-3 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background z-20 flex-shrink-0 mt-2 self-center"
                        />

                        {/* Spacer */}
                        <div className="hidden md:block w-5/12" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
