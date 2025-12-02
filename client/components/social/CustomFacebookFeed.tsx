"use client";

import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, Share2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Post {
    id: string;
    message: string;
    created_time: string;
    full_picture?: string;
    permalink_url: string;
    likes?: number;
    comments?: number;
    shares?: number;
}

interface CustomFacebookFeedProps {
    pageName: string;
    pageUrl: string;
    posts?: Post[];
    loading?: boolean;
}

export function CustomFacebookFeed({
    pageName,
    pageUrl,
    posts = [],
    loading = false
}: CustomFacebookFeedProps) {
    // Mock data for demonstration (in production, fetch from Graph API)
    const mockPosts: Post[] = posts.length > 0 ? posts : [
        {
            id: "1",
            message: "Join us for the upcoming Malabon Heritage Festival! Celebrating our rich culture and traditions. 🎉",
            created_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            permalink_url: pageUrl,
            likes: 234,
            comments: 45,
            shares: 12
        },
        {
            id: "2",
            message: "New infrastructure projects underway to improve our community. Stay tuned for updates!",
            created_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            permalink_url: pageUrl,
            likes: 189,
            comments: 23,
            shares: 8
        },
        {
            id: "3",
            message: "Thank you to all our volunteers who made the community cleanup drive a success! 💚",
            created_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            permalink_url: pageUrl,
            likes: 456,
            comments: 67,
            shares: 34
        }
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-dark p-6 rounded-2xl animate-pulse">
                        <div className="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-white/10 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Page Header */}
            <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
                <div>
                    <h4 className="font-bold text-lg mb-1">{pageName}</h4>
                    <p className="text-sm text-muted-foreground">View on Facebook</p>
                </div>
                <ExternalLink className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Posts */}
            {mockPosts.map((post, index) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-dark rounded-2xl overflow-hidden hover-lift border border-white/5"
                >
                    {/* Post Content */}
                    <div className="p-6">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            {post.message}
                        </p>

                        {post.full_picture && (
                            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={post.full_picture}
                                    alt="Post image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{formatDate(post.created_time)}</span>
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="px-6 py-4 border-t border-white/5 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Share2 className="w-4 h-4" />
                            <span>{post.shares || 0}</span>
                        </div>
                        <a
                            href={post.permalink_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                        >
                            View Post →
                        </a>
                    </div>
                </motion.article>
            ))}

            {/* View More */}
            <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-4 glass-dark rounded-2xl hover:bg-white/5 transition-colors text-accent font-medium"
            >
                View All Posts on Facebook
            </a>
        </div>
    );
}
