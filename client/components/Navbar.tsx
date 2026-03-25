"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 overflow-x-hidden w-full"
        >
            <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between relative">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors shadow-sm">
                        <Image
                            src="/assets/branding/lakbay-logo.png"
                            alt="Lakbay Malabon Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-display font-black text-xl tracking-tight group-hover:text-primary transition-all uppercase">
                        Lakbay <span className="text-primary italic">Malabon</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    <Link href="/explore" className="hover:text-primary transition-colors">
                        Explore
                    </Link>
                    <Link href="/companion" className="hover:text-primary transition-colors">
                        AI Companion
                    </Link>
                    <Link href="/itinerary" className="hover:text-primary transition-colors">
                        Itinerary
                    </Link>
                    <Link href="/community" className="hover:text-primary transition-colors">
                        Community
                    </Link>
                    <Link href="/partner" className="hover:text-primary transition-colors">
                        Partner
                    </Link>
                    <Link href="https://malabonfinds.vercel.app/culture" target="_blank" className="hover:text-primary transition-colors flex items-center gap-1.5">
                        Culture
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors relative z-50"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-5 h-5 text-foreground" />
                        ) : (
                            <Menu className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>

                    <Link href="/explore" className="hidden md:block px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm font-semibold transition-all hover-lift">
                        Start Exploring
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-4 right-4 md:hidden z-40 pointer-events-auto"
                    >
                        <div className="glass-dark rounded-3xl p-6 flex flex-col gap-2 border border-white/10 shadow-2xl backdrop-blur-xl">
                            <Link
                                href="/explore"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group w-full"
                            >
                                <span className="text-lg font-medium group-hover:text-primary transition-colors">Explore</span>
                                <span className="text-muted-foreground text-sm">Map & Grid</span>
                            </Link>
                            <Link
                                href="/companion"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group w-full"
                            >
                                <span className="text-lg font-medium group-hover:text-primary transition-colors">AI Companion</span>
                                <span className="text-muted-foreground text-sm">Ask Buddy</span>
                            </Link>
                            <Link
                                href="/itinerary"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group w-full"
                            >
                                <span className="text-lg font-medium group-hover:text-primary transition-colors">Itinerary</span>
                                <span className="text-muted-foreground text-sm">Plan a Trip</span>
                            </Link>
                            <Link
                                href="/partner"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group w-full"
                            >
                                <span className="text-lg font-medium group-hover:text-primary transition-colors">Partner</span>
                                <span className="text-muted-foreground text-sm">Join Us</span>
                            </Link>
                            <Link
                                href="https://malabonfinds.vercel.app/culture"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group w-full"
                            >
                                <span className="text-lg font-medium group-hover:text-primary transition-colors text-primary italic font-black">Culture</span>
                                <span className="text-muted-foreground text-sm">Traditions</span>
                            </Link>

                            <div className="h-px bg-white/10 my-2" />

                            <Link
                                href="/explore"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-center transition-all active:scale-95"
                            >
                                Start Exploring
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
