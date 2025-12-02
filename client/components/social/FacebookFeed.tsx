"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface FacebookFeedProps {
    pageUrl: string;
    width?: number | string;
    height?: number | string;
    tabs?: string;
    smallHeader?: boolean;
    adaptContainerWidth?: boolean;
    hideCover?: boolean;
    showFacepile?: boolean;
    className?: string;
}

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: any;
    }
}

export function FacebookFeed({
    pageUrl,
    width = 340,
    height = 500,
    tabs = "timeline",
    smallHeader = false,
    adaptContainerWidth = true,
    hideCover = false,
    showFacepile = true,
    className = ""
}: FacebookFeedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to initialize the plugin
        const initFacebookPlugin = () => {
            if (window.FB) {
                try {
                    window.FB.XFBML.parse(containerRef.current);
                    setIsLoading(false);
                } catch (err) {
                    console.error("Error parsing Facebook XFBML:", err);
                    setError("Failed to load Facebook Feed");
                    setIsLoading(false);
                }
            }
        };

        // Load SDK if not present
        if (!document.getElementById('facebook-jssdk')) {
            const script = document.createElement('script');
            script.id = 'facebook-jssdk';
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";

            script.onload = () => {
                initFacebookPlugin();
            };

            script.onerror = () => {
                setError("Failed to connect to Facebook");
                setIsLoading(false);
            };

            document.body.appendChild(script);
        } else {
            // SDK already exists, just re-parse
            // Give it a small delay to ensure DOM is ready
            setTimeout(initFacebookPlugin, 100);
        }

        // Cleanup isn't really possible for the global script, but we can prevent state updates if unmounted
        return () => { };
    }, [pageUrl, tabs, width, height]);

    return (
        <div className={`relative bg-white rounded-xl overflow-hidden shadow-lg ${className}`} ref={containerRef}>
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <span className="text-sm font-medium">Loading Feed...</span>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10 p-6 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                        <span className="text-sm font-medium text-red-500">{error}</span>
                        <a
                            href={pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-2"
                        >
                            View on Facebook
                        </a>
                    </div>
                </div>
            )}

            {/* Facebook Page Plugin */}
            <div
                className="fb-page"
                data-href={pageUrl}
                data-tabs={tabs}
                data-width={adaptContainerWidth ? "" : width}
                data-height={height}
                data-small-header={smallHeader}
                data-adapt-container-width={adaptContainerWidth}
                data-hide-cover={hideCover}
                data-show-facepile={showFacepile}
            >
                <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
                    <a href={pageUrl}>Facebook Page</a>
                </blockquote>
            </div>
        </div>
    );
}
