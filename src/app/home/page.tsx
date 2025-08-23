"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LifeInNumbers } from "@/components/LifeInNumbers";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SpotifyPlaylist } from "@/components/SpotifyPlaylist";
import { LoveLetter } from "@/components/LoveLetter";
import { LoveCounter } from "@/components/LoveCounter";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const AUTH_KEY = "happy-anniversary-auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    router.push("/");
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <Button variant="ghost" size="sm" onClick={handleLogout} className="font-body">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
        <header className="text-center mb-12">
          <h1 className="font-headline text-6xl md:text-8xl text-primary drop-shadow-lg">Our Story</h1>
          <p className="font-body text-xl mt-2 text-muted-foreground">So far...</p>
        </header>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <LifeInNumbers />
          </div>

          <div className="lg:col-span-2">
            <InteractiveTimeline />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <LoveLetter />
            <LoveCounter />
          </div>

          <div className="lg:col-span-3">
            <PhotoGallery />
          </div>

          <div className="lg:col-span-3">
            <SpotifyPlaylist />
          </div>
        </div>
      </main>
    </>
  );
}
