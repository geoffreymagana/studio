"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartCanvas } from "@/components/HeartCanvas";
import FloatingHearts from "@/components/FloatingHearts";

const SECRET_PHRASE = "mylove";
const AUTH_KEY = "happy-anniversary-auth";

export default function LoginPage() {
  const [phrase, setPhrase] = useState("");
  const [isHeartDrawn, setIsHeartDrawn] = useState(false);
  const [error, setError] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem(AUTH_KEY) === "true") {
      router.push("/home");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (phrase.toLowerCase() !== SECRET_PHRASE) {
      setError("The secret phrase is not quite right. Try again!");
      return;
    }

    if (!isHeartDrawn) {
      setError("Don't forget to draw a heart to seal your love!");
      return;
    }

    setShowHearts(true);
    localStorage.setItem(AUTH_KEY, "true");
    setTimeout(() => {
      router.push("/home");
    }, 1500); // Wait for hearts to animate a bit
  };
  
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden">
      {showHearts && <FloatingHearts count={50} />}
      <div className="z-10 w-full max-w-md">
        <Card className="bg-card/80 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <h1 className="font-headline text-5xl text-primary drop-shadow-lg">Happy Anniversary</h1>
            <CardDescription className="font-body text-lg pt-2">A love story, unlocked.</CardDescription>
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
                  className="font-body"
                />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <Heart className="text-accent" />
                    <label className="font-headline text-lg">Draw a Heart</label>
                </div>
                <HeartCanvas onDrawSuccess={() => setIsHeartDrawn(true)} />
              </div>
              {error && <p className="text-destructive font-body text-center">{error}</p>}
              <Button type="submit" className="w-full font-headline text-xl" size="lg">
                <Heart className="mr-2 fill-current" /> Unlock Our Story
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
       <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-50"></div>
    </main>
  );
}
