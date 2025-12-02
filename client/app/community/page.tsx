"use client";

import { motion } from "framer-motion";
import { Users, Radio, Calendar, MessageSquare } from "lucide-react";
import { FacebookFeed } from "@/components/social/FacebookFeed";
import { ParallaxSection } from "@/components/storytelling/ParallaxSection";
import { TextReveal } from "@/components/storytelling/TextReveal";

const communityFeeds = [
    {
        id: 1,
        title: "Malabon City Government",
        description: "Official updates, announcements, and programs from the City of Malabon",
        pageUrl: "https://www.facebook.com/MalabonCityGov",
        icon: Radio,
        color: "from-blue-500 to-blue-600"
    },
    {
        id: 2,
        title: "Mayor Jeannie Sandoval",
        description: "Messages and initiatives from Malabon's first female mayor",
        pageUrl: "https://www.facebook.com/jeanniensandoval",
        icon: Users,
        color: "from-purple-500 to-purple-600"
    },
    {
        id: 3,
        title: "City of Malabon University",
        description: "Academic news, events, and student achievements from CMU",
        pageUrl: "https://www.facebook.com/cityofmalabonuniversity",
        icon: Calendar,
        color: "from-green-500 to-green-600"
    }
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Hero Section with Parallax */}
            <ParallaxSection
                className="min-h-screen flex items-center justify-center pt-20"
                speed={0.3}
            >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <TextReveal delay={0.2}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                            <MessageSquare className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-muted-foreground">Stay Connected</span>
                        </div>
                    </TextReveal>

                    <TextReveal delay={0.4}>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                            Community <span className="text-gradient">Updates</span>
                        </h1>
                    </TextReveal>

                    <TextReveal delay={0.6}>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Follow the latest news, announcements, and events from Malabon's leaders and institutions.
                            Stay informed about what's happening in our community.
                        </p>
                    </TextReveal>
                </div>
            </ParallaxSection>

            {/* Feed Cards Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {communityFeeds.map((feed, index) => (
                        <motion.div
                            key={feed.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col"
                        >
                            {/* Feed Header Card */}
                            <div className="glass-dark p-6 rounded-t-3xl border border-white/5 border-b-0">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feed.color} flex items-center justify-center shadow-lg`}>
                                        <feed.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{feed.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {feed.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Facebook Feed */}
                            <div className="flex-1">
                                <FacebookFeed
                                    pageUrl={feed.pageUrl}
                                    height={600}
                                    className="rounded-b-3xl border-t-0"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TXTMJS Messaging Service Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        {/* Left Side - Instructions */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold mb-6">
                                <MessageSquare className="w-4 h-4" />
                                LET'S CONNECT TXTMJS
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold mb-6">
                                Paano magpadala ng mensahe?
                            </h3>

                            <div className="bg-black/30 p-6 rounded-2xl mb-6 font-mono text-lg md:text-xl border border-white/5 inline-block">
                                TXTMJS &lt;space&gt; KEYWORD &lt;space&gt; MESSAGE
                            </div>

                            <p className="text-muted-foreground mb-2">I-send ito sa:</p>
                            <p className="text-2xl font-bold text-white mb-8">
                                225687 / 09176TXTMJS / 09176898657
                            </p>
                        </div>

                        {/* Right Side - Keywords */}
                        <div className="flex-1 w-full">
                            <h4 className="text-lg font-semibold mb-6 text-center md:text-left text-muted-foreground">
                                Available Keywords:
                            </h4>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {[
                                    "MDRRMO", "MCAT", "TRAFFIC", "HEALTH", "POLICE", "FIRE",
                                    "CSWDD", "ENGR", "CENRO", "BPLO", "OTHERS"
                                ].map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors cursor-default"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Engagement Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <TextReveal>
                    <h2 className="text-4xl font-bold mb-12 text-center">Get Involved</h2>
                </TextReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Radio,
                            title: "Stay Informed",
                            description: "Follow official announcements and city programs to stay up-to-date with Malabon's developments."
                        },
                        {
                            icon: Users,
                            title: "Join Events",
                            description: "Participate in community events, festivals, and activities that celebrate Malabon's culture."
                        },
                        {
                            icon: MessageSquare,
                            title: "Share Feedback",
                            description: "Engage with your local government and share your thoughts on community initiatives."
                        }
                    ].map((item, index) => (
                        <TextReveal key={item.title} delay={index * 0.2}>
                            <div className="glass-dark rounded-3xl overflow-hidden hover-lift border border-white/5 group h-full">
                                <div className="p-8">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                        <item.icon className="w-8 h-8 text-accent" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </TextReveal>
                    ))}
                </div>
            </section>
        </main>
    );
}
