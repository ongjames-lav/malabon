"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { businesses, landmarks, MALABON_CENTER, MALABON_BOUNDS, categoryIcons } from "@/lib/data";
import type { Business, Landmark } from "@/lib/data";
import { Navigation, MapPin, Clock, CornerDownRight, X, Locate, Footprints, Car } from "lucide-react";

// --- Custom marker icons ---
const createCategoryIcon = (emoji: string) => {
    return L.divIcon({
        html: `<div style="font-size:22px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:white;border-radius:50%;box-shadow:0 2px 8px rgba(0,194,255,0.3);border:2px solid #00C2FF;">${emoji}</div>`,
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
    });
};

const userIcon = L.divIcon({
    html: `<div style="width:18px;height:18px;background:#00C2FF;border-radius:50%;border:3px solid white;box-shadow:0 0 12px rgba(0,194,255,0.6);"></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

// --- Types ---
interface RouteInfo {
    distance: string;
    duration: string;
    steps: string[];
    geometry: [number, number][];
}

type TravelMode = "foot" | "car";

// --- Map bounds restrictor ---
function MapBoundsRestrictor() {
    const map = useMap();
    useEffect(() => {
        map.setMaxBounds(L.latLngBounds(MALABON_BOUNDS[0], MALABON_BOUNDS[1]));
        map.setMinZoom(14);
        map.setMaxZoom(18);
    }, [map]);
    return null;
}

// --- Fly to location ---
function FlyToLocation({ position }: { position: LatLngExpression | null }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 16, { duration: 1 });
        }
    }, [position, map]);
    return null;
}

// --- Main component ---
export const MalabonMap = () => {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<{ name: string; coords: [number, number]; category: string } | null>(null);
    const [route, setRoute] = useState<RouteInfo | null>(null);
    const [isLoadingRoute, setIsLoadingRoute] = useState(false);
    const [travelMode, setTravelMode] = useState<TravelMode>("foot");
    const [showDirections, setShowDirections] = useState(false);
    const [flyTo, setFlyTo] = useState<LatLngExpression | null>(null);

    // Get user location
    const getUserLocation = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserLocation([pos.coords.latitude, pos.coords.longitude]);
                },
                () => {
                    // Default to Malabon center if geolocation fails
                    setUserLocation(MALABON_CENTER);
                },
                { enableHighAccuracy: true }
            );
        } else {
            setUserLocation(MALABON_CENTER);
        }
    }, []);

    useEffect(() => {
        getUserLocation();
    }, [getUserLocation]);

    // Fetch directions from OSRM (free, no API key needed)
    const getDirections = useCallback(async (from: [number, number], to: [number, number], mode: TravelMode) => {
        setIsLoadingRoute(true);
        try {
            const profile = mode === "car" ? "car" : "foot";
            const url = `https://router.project-osrm.org/route/v1/${profile}/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson&steps=true`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.routes && data.routes.length > 0) {
                const r = data.routes[0];
                const distKm = (r.distance / 1000).toFixed(1);
                const durMin = Math.round(r.duration / 60);

                const steps = r.legs[0].steps
                    .filter((s: any) => s.maneuver?.instruction)
                    .map((s: any) => s.maneuver.instruction);

                const geometry = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);

                setRoute({
                    distance: `${distKm} km`,
                    duration: `${durMin} min`,
                    steps,
                    geometry,
                });
                setShowDirections(true);
            }
        } catch {
            console.error("Failed to fetch directions");
        } finally {
            setIsLoadingRoute(false);
        }
    }, []);

    const handleGetDirections = (coords: [number, number]) => {
        const origin = userLocation || MALABON_CENTER;
        getDirections(origin, coords, travelMode);
    };

    const clearRoute = () => {
        setRoute(null);
        setShowDirections(false);
        setSelectedPlace(null);
    };

    return (
        <div className="relative w-full h-[80vh] md:h-[600px] rounded-2xl overflow-hidden border border-border shadow-smooth">
            {/* Controls Overlay - Top Right */}
            <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => { getUserLocation(); if (userLocation) setFlyTo(userLocation); }}
                    className="h-10 w-10 bg-white dark:bg-card rounded-xl shadow-sm border border-border flex items-center justify-center text-primary hover:shadow-glow transition-all"
                    title="My Location"
                >
                    <Locate className="h-5 w-5" />
                </button>
                <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                    <button
                        onClick={() => setTravelMode("foot")}
                        className={`h-10 w-10 flex items-center justify-center transition-colors ${travelMode === "foot" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
                        title="Walking"
                    >
                        <Footprints className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setTravelMode("car")}
                        className={`h-10 w-10 flex items-center justify-center transition-colors ${travelMode === "car" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
                        title="Driving"
                    >
                        <Car className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Directions Panel - Left Side */}
            {showDirections && route && (
                <div className="absolute top-4 left-4 z-[1000] w-80 max-h-[90%] bg-white dark:bg-card rounded-2xl shadow-lg border border-border overflow-hidden flex flex-col">
                    <div className="p-4 bg-primary text-white flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Directions to</p>
                            <p className="font-bold text-sm truncate">{selectedPlace?.name}</p>
                        </div>
                        <button onClick={clearRoute} className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="p-4 flex items-center gap-4 border-b border-border">
                        <div className="text-center">
                            <p className="text-2xl font-black text-primary">{route.duration}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{travelMode === "foot" ? "Walking" : "Driving"}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-foreground">{route.distance}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Distance</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {route.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-sm text-foreground leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* The Map */}
            <MapContainer
                center={MALABON_CENTER}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <MapBoundsRestrictor />
                <FlyToLocation position={flyTo} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location marker */}
                {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                        <Popup>
                            <p className="font-bold text-sm">📍 You are here</p>
                        </Popup>
                    </Marker>
                )}

                {/* Business markers */}
                {businesses.map((biz) => {
                    const lat = biz.location.coordinates[1];
                    const lng = biz.location.coordinates[0];
                    const icon = createCategoryIcon(categoryIcons[biz.category] || "📍");

                    return (
                        <Marker key={biz.id} position={[lat, lng]} icon={icon}>
                            <Popup maxWidth={280}>
                                <div className="space-y-2 min-w-[220px]">
                                    <h3 className="font-bold text-sm text-gray-900">{biz.name}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{biz.description}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <MapPin className="h-3 w-3" />
                                        <span className="line-clamp-1">{biz.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Clock className="h-3 w-3" />
                                        <span>⭐ {biz.rating}/5</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedPlace({ name: biz.name, coords: [lat, lng], category: biz.category });
                                            handleGetDirections([lat, lng]);
                                        }}
                                        className="w-full mt-2 py-2 px-3 bg-[#00C2FF] hover:bg-[#00a8e0] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Navigation className="h-3 w-3" />
                                        {isLoadingRoute ? "Getting route..." : "Get Directions"}
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Landmark markers */}
                {landmarks.map((lm) => {
                    const icon = createCategoryIcon(categoryIcons[lm.category] || "📍");
                    return (
                        <Marker key={lm.id} position={lm.coordinates} icon={icon}>
                            <Popup maxWidth={280}>
                                <div className="space-y-2 min-w-[220px]">
                                    <h3 className="font-bold text-sm text-gray-900">{lm.name}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{lm.description}</p>
                                    <button
                                        onClick={() => {
                                            setSelectedPlace({ name: lm.name, coords: lm.coordinates, category: lm.category });
                                            handleGetDirections(lm.coordinates);
                                        }}
                                        className="w-full mt-2 py-2 px-3 bg-[#00C2FF] hover:bg-[#00a8e0] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Navigation className="h-3 w-3" />
                                        {isLoadingRoute ? "Getting route..." : "Get Directions"}
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Route polyline */}
                {route && (
                    <Polyline
                        positions={route.geometry}
                        pathOptions={{
                            color: "#00C2FF",
                            weight: 5,
                            opacity: 0.8,
                            dashArray: travelMode === "foot" ? "8, 12" : undefined,
                        }}
                    />
                )}
            </MapContainer>

            {/* Loading indicator */}
            {isLoadingRoute && (
                <div className="absolute inset-0 z-[999] bg-black/20 flex items-center justify-center">
                    <div className="bg-white dark:bg-card px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <p className="text-sm font-bold">Calculating route...</p>
                    </div>
                </div>
            )}
        </div>
    );
};
