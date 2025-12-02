"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, Search } from "lucide-react";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-accent/50 group-hover:border-accent transition-colors">
                        <Image
                            src="/assets/branding/malabon-seal.png"
                            alt="Malabon City Seal"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-display font-bold text-lg tracking-tight group-hover:text-gradient transition-all">
                        Taste of Malabon
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/foods" className="hover:text-foreground transition-colors">
                        Delicacies
                    </Link>
                    <Link href="/places" className="hover:text-foreground transition-colors">
                        Places
                    </Link>
                    <Link href="/culture" className="hover:text-foreground transition-colors">
                        Culture
                    </Link>
                    <Link href="/community" className="hover:text-foreground transition-colors">
                        Community
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Search className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Menu className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <Link href="/foods" className="hidden md:block px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm font-semibold transition-all hover-lift">
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
