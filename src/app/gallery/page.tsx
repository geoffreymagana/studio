"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MediaGallery } from "@/components/MediaGallery";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AUTH_KEY = "happy-anniversary-auth";

export default function GalleryPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/home");
  };

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
            Our Memories
          </h1>
          <p className="font-body text-xl mt-4 text-muted-foreground">A collection of our special moments</p>
        </header>

        <div className="w-full max-w-6xl mx-auto">
          <MediaGallery />
        </div>
      </main>
    </>
  );
}

