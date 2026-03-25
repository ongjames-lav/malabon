"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "primary" | "secondary" | "accent" | "outline";
    size?: "sm" | "md";
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Badge = ({
    className,
    variant = "primary",
    size = "sm",
    children,
    ...props
}: BadgeProps) => {
    const variants = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        outline: "bg-transparent border border-primary text-primary",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs font-semibold uppercase tracking-wider",
        md: "px-3 py-1 text-sm font-semibold uppercase tracking-wider",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full transition-colors",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
