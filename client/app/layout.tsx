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
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased overflow-x-hidden w-full bg-background text-foreground`}>
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
