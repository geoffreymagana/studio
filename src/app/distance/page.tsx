"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, Heart, Navigation } from "lucide-react";
import { locationService, LocationData } from "@/lib/database";

const AUTH_KEY = "happy-anniversary-auth";

// Coordinates for Meru and Ruiru (Kenya)
const MERU_COORDS = { lat: -0.0477, lng: 37.6594 };
const RUIRU_COORDS = { lat: -1.1497, lng: 36.9569 };

export default function DistancePage() {
  const router = useRouter();
  const [location1, setLocation1] = useState("Meru");
  const [location2, setLocation2] = useState("Ruiru");
  const [distance, setDistance] = useState(0);
  const [displayDistance, setDisplayDistance] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    // Load initial location data from database
    const loadLocationData = async () => {
      try {
        const locationData = await locationService.getLocationData();
        if (locationData) {
          setLocation1(locationData.location1);
          setLocation2(locationData.location2);
          setDistance(locationData.distance);
          setDisplayDistance(locationData.distance);
        }
      } catch (error) {
        console.error('Error loading location data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationData();

    // Subscribe to real-time updates
    const unsubscribe = locationService.subscribeToLocation((locationData) => {
      if (locationData) {
        setLocation1(locationData.location1);
        setLocation2(locationData.location2);
        setDistance(locationData.distance);
        setDisplayDistance(locationData.distance);
      }
    });

    return () => unsubscribe();
  }, []);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistanceBetweenCoords = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleBack = () => {
    router.push("/home");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocation1(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation("Location unavailable");
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported");
    }
  };

  const calculateDistance = async () => {
    setIsAnimating(true);
    
    // Calculate actual distance based on locations
    let calculatedDistance = 0;
    
    if (location1 === "Meru" && location2 === "Ruiru") {
      calculatedDistance = calculateDistanceBetweenCoords(
        MERU_COORDS.lat, MERU_COORDS.lng,
        RUIRU_COORDS.lat, RUIRU_COORDS.lng
      );
    } else if (location1 === "Ruiru" && location2 === "Meru") {
      calculatedDistance = calculateDistanceBetweenCoords(
        RUIRU_COORDS.lat, RUIRU_COORDS.lng,
        MERU_COORDS.lat, MERU_COORDS.lng
      );
    } else {
      // For other locations, use a random distance for demo
      calculatedDistance = Math.floor(Math.random() * 500) + 50;
    }
    
    setDistance(calculatedDistance);
    
    // Save to database
    try {
      await locationService.updateLocationData(location1, location2, calculatedDistance);
    } catch (error) {
      console.error('Error saving location data:', error);
    }
    
    // Animate the display distance
    const startDistance = displayDistance;
    const endDistance = calculatedDistance;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = (endDistance - startDistance) / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const animationInterval = setInterval(() => {
      currentStep++;
      const newDisplayDistance = startDistance + (increment * currentStep);
      setDisplayDistance(Math.round(newDisplayDistance));
      
      if (currentStep >= steps) {
        setDisplayDistance(Math.round(endDistance));
        setIsAnimating(false);
        clearInterval(animationInterval);
      }
    }, stepDuration);
  };

  if (isLoading) {
    return (
      <>
        <div className="absolute top-4 left-4 z-50">
          <Button variant="ghost" size="sm" onClick={handleBack} className="font-body bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background">
          <header className="text-center mb-16 mt-8">
            <h1 className="font-headline text-6xl md:text-8xl text-primary drop-shadow-lg">
              Distance Widget
            </h1>
            <p className="font-body text-xl mt-4 text-muted-foreground">Loading...</p>
          </header>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="absolute top-4 left-4 z-50">
        <Button variant="ghost" size="sm" onClick={handleBack} className="font-body bg-background/80 backdrop-blur-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background">
        <header className="text-center mb-16 mt-8">
          <h1 className="font-headline text-6xl md:text-8xl text-primary drop-shadow-lg">
            Distance Widget
          </h1>
          <p className="font-body text-xl mt-4 text-muted-foreground">How far apart are we?</p>
        </header>

        <div className="w-full max-w-2xl mx-auto">
          <Card className="bg-card shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
                <Navigation className="text-accent" />
                Distance Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location1" className="font-body flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Your Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location1"
                      value={location1}
                      onChange={(e) => setLocation1(e.target.value)}
                      className="font-body"
                      placeholder="Enter your location"
                    />
                    <Button 
                      onClick={getCurrentLocation}
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                  {currentLocation && (
                    <p className="text-xs text-muted-foreground">
                      Current: {currentLocation}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location2" className="font-body flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    Their Location
                  </Label>
                  <Input
                    id="location2"
                    value={location2}
                    onChange={(e) => setLocation2(e.target.value)}
                    className="font-body"
                    placeholder="Enter their location"
                  />
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <Button 
                  onClick={calculateDistance} 
                  disabled={isAnimating}
                  className="font-body bg-primary hover:bg-primary/90"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Calculate Distance
                </Button>
                
                <div className="p-6 bg-muted rounded-lg">
                  <p className="font-body text-sm text-muted-foreground mb-2">Distance between</p>
                  <p className="font-body font-semibold mb-1">{location1} & {location2}</p>
                  <p className={`font-headline text-4xl font-bold text-primary transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                    {displayDistance} km
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
