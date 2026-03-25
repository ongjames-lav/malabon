"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone, CheckCircle2, Loader2, Wallet } from "lucide-react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    price: string;
}

export function PaymentModal({ isOpen, onClose, itemName, price }: PaymentModalProps) {
    const [stage, setStage] = useState<"checkout" | "processing" | "success">("checkout");
    const [method, setMethod] = useState<"card" | "gcash" | "maya">("gcash");

    const handlePay = () => {
        setStage("processing");
        setTimeout(() => {
            setStage("success");
        }, 2000); // 2 second mock delay
    };

    const handleClose = () => {
        if (stage === "processing") return;
        setStage("checkout");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    {/* Modal Box */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-card border border-border shadow-2xl z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <h2 className="font-display text-xl font-bold">Lakbay Malabon <span className="text-primary italic">Pay</span></h2>
                            {stage !== "processing" && (
                                <button
                                    onClick={handleClose}
                                    className="p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="p-6">
                            {stage === "checkout" && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Order Summary */}
                                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Order Summary</p>
                                        <h3 className="font-bold text-lg text-foreground mb-4">{itemName}</h3>
                                        <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                            <span className="text-sm font-medium">Total Amount</span>
                                            <span className="text-2xl font-black text-primary">{price}</span>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Payment Method</p>
                                        
                                        <button
                                            onClick={() => setMethod("gcash")}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                                method === "gcash" ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-card border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${method === "gcash" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                                                <Smartphone className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm">GCash</p>
                                                <p className="text-xs text-muted-foreground">Link your GCash account</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setMethod("maya")}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                                method === "maya" ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-card border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${method === "maya" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                                                <Wallet className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm">Maya</p>
                                                <p className="text-xs text-muted-foreground">Pay using Maya E-Wallet</p>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setMethod("card")}
                                            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                                                method === "card" ? "bg-primary/5 border-primary ring-1 ring-primary" : "bg-card border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${method === "card" ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                                                <CreditCard className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm">Credit / Debit Card</p>
                                                <p className="text-xs text-muted-foreground">Visa, Mastercard, JCB</p>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Pay Button */}
                                    <button
                                        onClick={handlePay}
                                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-glow mt-4"
                                    >
                                        Pay {price} Now
                                    </button>
                                </motion.div>
                            )}

                            {stage === "processing" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center justify-center space-y-4"
                                >
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <h3 className="text-lg font-bold">Processing Payment...</h3>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Please wait while we secure your transaction.<br />Do not close this window.
                                    </p>
                                </motion.div>
                            )}

                            {stage === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-8 flex flex-col items-center justify-center space-y-4 text-center"
                                >
                                    <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-display text-green-500">Payment Successful!</h3>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        Your booking for <strong>{itemName}</strong> is confirmed. A receipt has been generated.
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="w-full py-4 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-xl transition-colors"
                                    >
                                        Return to Itinerary
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
