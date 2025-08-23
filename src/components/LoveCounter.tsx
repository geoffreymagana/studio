"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import FloatingHearts from './FloatingHearts';

const COUNTER_KEY = 'happy-anniversary-love-counter';

export function LoveCounter() {
    const [count, setCount] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedCount = localStorage.getItem(COUNTER_KEY);
        if (savedCount) {
            setCount(parseInt(savedCount, 10));
        }
    }, []);

    useEffect(() => {
        if(isClient) {
            localStorage.setItem(COUNTER_KEY, count.toString());
        }
    }, [count, isClient]);

    const handleClick = () => {
        setCount(prev => prev + 1);
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 4000); // Match animation duration
    };

    return (
        <Card className="relative overflow-hidden">
             {showHearts && <FloatingHearts count={10} />}
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Love Counter</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <p className="font-body">Times I've told you I love you (at least here!):</p>
                <p className="text-6xl font-headline font-bold text-primary">{isClient ? count.toLocaleString() : '...'}</p>
                <Button onClick={handleClick} size="lg" className="font-headline text-lg w-full">
                    <Heart className="mr-2 h-5 w-5 fill-current"/> I Love You!
                </Button>
            </CardContent>
        </Card>
    );
}
