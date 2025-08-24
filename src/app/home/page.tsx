"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LifeInNumbers } from "@/components/LifeInNumbers";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { SpotifyPlaylist } from "@/components/SpotifyPlaylist";
import { LoveLetter } from "@/components/LoveLetter";
import { LoveCounter } from "@/components/LoveCounter";
import { Button } from "@/components/ui/button";
import { LogOut, Camera, MapPin } from "lucide-react";
import { authService } from "@/lib/database";

const AUTH_KEY = "happy-anniversary-auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      // Clear authentication status in database
      await authService.setAuthStatus(false);
    } catch (error) {
      console.error('Error clearing auth status:', error);
    }
    
    // Clear localStorage
    localStorage.removeItem(AUTH_KEY);
    router.push("/");
  };

  const handleGallery = () => {
    router.push("/gallery");
  };

  const handleDistance = () => {
    router.push("/distance");
  };

  const handleLetters = () => {
    router.push("/letters");
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background pb-24">
        <header className="text-center mb-16 mt-8">
          <h1 className="font-headline text-6xl md:text-8xl text-primary drop-shadow-lg">
            Our Story
          </h1>
          <p className="font-body text-xl mt-4 text-muted-foreground">A love story worth celebrating</p>
        </header>

        <div className="w-full max-w-7xl mx-auto space-y-12">
          {/* Life in Numbers - Full Width */}
          <div className="w-full">
            <LifeInNumbers />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline - Takes 2/3 of the space */}
            <div className="lg:col-span-2">
              <InteractiveTimeline />
            </div>

            {/* Sidebar - Takes 1/3 of the space */}
            <div className="lg:col-span-1 space-y-8">
              <LoveLetter />
              <LoveCounter />
            </div>
          </div>

          {/* Spotify Playlist - Full Width */}
          <div className="w-full">
            <SpotifyPlaylist />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="flex justify-around items-center py-4 px-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleGallery} 
            className="flex flex-col items-center gap-1 p-2 h-auto"
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDistance} 
            className="flex flex-col items-center gap-1 p-2 h-auto"
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout} 
            className="flex flex-col items-center gap-1 p-2 h-auto"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
