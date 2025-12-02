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
    title: "Taste of Malabon - Food & Business Discovery Hub",
    description: "Discover the culinary heritage and vibrant food scene of Malabon City. Explore famous foods, restaurants, cafés, and local delicacies with rich cultural stories.",
    keywords: ["Malabon", "Filipino food", "Pancit Malabon", "restaurants", "food discovery", "cultural heritage"],
    openGraph: {
        title: "Taste of Malabon - Food & Business Discovery Hub",
        description: "Discover the culinary heritage and vibrant food scene of Malabon City",
        type: "website",
    },
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
