"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { loveCounterService } from "@/lib/database";

export function LoveCounter() {
  const [count, setCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial count from database
    const loadCount = async () => {
      try {
        const initialCount = await loveCounterService.getCount();
        setCount(initialCount);
      } catch (error) {
        console.error('Error loading love counter:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCount();

    // Subscribe to real-time updates
    const unsubscribe = loveCounterService.subscribeToCount((newCount) => {
      setCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    try {
      const newCount = await loveCounterService.incrementCount();
      setCount(newCount);
      
      // Show floating hearts
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 4000);
    } catch (error) {
      console.error('Error incrementing love counter:', error);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl flex items-center justify-center gap-3">
            <Heart className="text-accent" />
            I Love You Counter
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-100">
            <p className="font-body text-sm text-gray-600 mb-2">Loading...</p>
            <p className="font-romantic text-4xl font-bold text-primary mb-2">
              I Love You
            </p>
            <p className="font-headline text-6xl font-bold text-gray-800">
              ...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-3">
          <Heart className="text-accent" />
          I Love You Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border border-pink-100">
          <p className="font-body text-sm text-gray-600 mb-2">Times we've said</p>
          <p className="font-romantic text-4xl font-bold text-primary mb-2">
            I Love You
          </p>
          <p className="font-headline text-6xl font-bold text-gray-800">
            {count.toLocaleString()}
          </p>
        </div>
        
        <Button 
          onClick={handleClick}
          size="lg"
          className="font-body bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Heart className="mr-2 h-5 w-5" />
          Say I Love You
        </Button>
        
        {showHearts && <FloatingHearts count={10} />}
      </CardContent>
    </Card>
  );
}
