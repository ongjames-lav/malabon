import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Lakbay Malabon - Your AI Tourism Companion",
    description: "Explore Malabon City with your smart AI companion Buddy. Discover hidden gems, authentic delicacies, and plan your perfect itinerary in the Venice of the North.",
    keywords: ["Lakbay Malabon", "Malabon Tourism", "AI Travel Guide", "Pancit Malabon", "Itinerary Builder"],
    openGraph: {
        title: "Lakbay Malabon - AI Powered Tourism",
        description: "Explore Malabon like a local with our AI-powered tourism platform.",
        type: "website",
    },
};

export const viewport = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes";

import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden w-full bg-background text-foreground`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
