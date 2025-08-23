"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartCanvas } from "@/components/HeartCanvas";
import FloatingHearts from "@/components/FloatingHearts";
import { authService } from "@/lib/database";

const SECRET_PHRASES = ["mylove", "baby cakes", "my love", "nkatha", "geoffrey", "2408", "0000"];
const AUTH_KEY = "happy-anniversary-auth";

export default function LoginPage() {
  const [phrase, setPhrase] = useState("");
  const [isHeartDrawn, setIsHeartDrawn] = useState(false);
  const [error, setError] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const isAuthenticated = await authService.getAuthStatus();
        if (isAuthenticated) {
          router.push("/home");
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Fallback to localStorage check
        if (localStorage.getItem(AUTH_KEY) === "true") {
          router.push("/home");
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const isValidPhrase = SECRET_PHRASES.some(secret => 
      phrase.toLowerCase().trim() === secret.toLowerCase()
    );

    if (!isValidPhrase) {
      setError("The secret phrase is not quite right. Try again!");
      setIsLoading(false);
      return;
    }

    if (!isHeartDrawn) {
      setError("Don't forget to draw a heart to seal your love!");
      setIsLoading(false);
      return;
    }

    try {
      // Set authentication status in database
      await authService.setAuthStatus(true);
      
      // Also set in localStorage as fallback
      localStorage.setItem(AUTH_KEY, "true");
      
      setShowHearts(true);
      setTimeout(() => {
        router.push("/home");
      }, 1500); // Wait for hearts to animate a bit
    } catch (error) {
      console.error('Error setting auth status:', error);
      setError("Authentication failed. Please try again.");
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
                  type="password"
                  placeholder="Whisper sweet nothings..."
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
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
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive font-body text-center text-sm">{error}</p>
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
