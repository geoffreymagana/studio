"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartCanvas } from "@/components/HeartCanvas";
import FloatingHearts from "@/components/FloatingHearts";
import { checkAuth, setAuth } from "@/lib/auth";

const SECRET_PHRASES = ["mylove", "baby cakes", "my love", "nkatha", "geoffrey", "2408", "0000"];

interface HintInfo {
  text: string;
  type: 'default' | 'warm' | 'hot' | 'error';
}

function getHint(input: string): HintInfo {
  const cleanInput = input.toLowerCase().trim();
  
  // Empty input
  if (!cleanInput) {
    return {
      text: "Hint: It could be a sweet nickname, a special date, or someone special...",
      type: 'default'
    };
  }

  // Check for date format
  if (/^\d{1,4}$/.test(cleanInput)) {
    if (cleanInput.length === 4) {
      return {
        text: "Hint: You're thinking of numbers... could it be a special date? 🗓️",
        type: 'warm'
      };
    }
    return {
      text: "Hint: If it's a date, try the format DDMM",
      type: 'default'
    };
  }

  // Check for names
  if (cleanInput.includes("nk") || cleanInput.includes("geo")) {
    return {
      text: "Hint: You're getting warmer! Someone special? 💝",
      type: 'hot'
    };
  }

  // Check for love-related words
  if (cleanInput.includes("love") || cleanInput.includes("baby")) {
    return {
      text: "Hint: You're very close! Check the spacing and spelling 💕",
      type: 'hot'
    };
  }

  // Default hint for other inputs
  return {
    text: "Hint: Try something more personal... a nickname perhaps? 💭",
    type: 'warm'
  };
}

export default function LoginPage() {
  const [phrase, setPhrase] = useState("");
  const [isHeartDrawn, setIsHeartDrawn] = useState(false);
  const [hint, setHint] = useState<HintInfo>({ text: "", type: 'default' });
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        router.push("/home");
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setHint({ text: "", type: 'default' });
    setIsLoading(true);

    const isValidPhrase = SECRET_PHRASES.some(secret => 
      phrase.toLowerCase().trim() === secret.toLowerCase()
    );

    if (!isValidPhrase) {
      const newHint = getHint(phrase);
      setHint(newHint);
      setIsLoading(false);
      return;
    }

    if (!isHeartDrawn) {
      setHint({
        text: "Don't forget to draw a heart to seal your love! ❤️",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }

    try {
      await setAuth(true);
      setShowHearts(true);
      setTimeout(() => {
        router.push("/home");
      }, 1500); // Wait for hearts to animate a bit
    } catch (error) {
      console.error('Error setting auth status:', error);
      setHint({
        text: "Authentication failed. Please try again.",
        type: 'error'
      });
      setIsLoading(false);
    }
  };
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-background">
      {showHearts && <FloatingHearts count={50} />}
      <div className="z-10 w-full max-w-md">
        <Card className="bg-card/90 backdrop-blur-md shadow-2xl border-accent/20">
          <CardHeader className="text-center">
            <h1 className="font-headline text-5xl text-primary drop-shadow-lg">
              Happy Anniversary
            </h1>
            <CardDescription className="font-body text-lg pt-2 text-muted-foreground">
              A love story, unlocked with a touch of magic.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <LockKeyhole className="text-accent" />
                    <label htmlFor="secret-phrase" className="font-headline text-lg">Enter the Secret Phrase</label>
                </div>
                <Input
                  id="secret-phrase"
                  type="text"
                  placeholder="Whisper sweet nothings..."
                  value={phrase}
                  onChange={(e) => {
                    const newPhrase = e.target.value;
                    setPhrase(newPhrase);
                    setHint(getHint(newPhrase));
                  }}
                  className="font-body border-accent/30 focus:border-accent transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <Heart className="text-accent" />
                    <label className="font-headline text-lg">Draw a Heart</label>
                </div>
                <HeartCanvas onDrawSuccess={() => setIsHeartDrawn(true)} />
              </div>
              {hint.text && (
                <div className={`p-3 rounded-lg ${
                  hint.type === 'error' 
                    ? 'bg-destructive/10 border border-destructive/20' 
                    : hint.type === 'hot'
                    ? 'bg-pink-100 border border-pink-200'
                    : hint.type === 'warm'
                    ? 'bg-orange-50 border border-orange-100'
                    : 'bg-blue-50 border border-blue-100'
                }`}>
                  <p className={`font-body text-center text-sm ${
                    hint.type === 'error'
                      ? 'text-destructive'
                      : hint.type === 'hot'
                      ? 'text-pink-700'
                      : hint.type === 'warm'
                      ? 'text-orange-700'
                      : 'text-blue-700'
                  }`}>
                    {hint.text}
                  </p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full font-body text-xl bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl" 
                size="lg"
                disabled={isLoading}
              >
                <Heart className="mr-2 fill-current" /> 
                {isLoading ? "Unlocking..." : "Unlock Our Story"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
