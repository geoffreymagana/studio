"use client";

import { Home, MapPin, MessageCircleHeart, Camera, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { authService } from "@/lib/database";
import * as React from "react";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const isAuth = localStorage.getItem("happy-anniversary-auth") === "true";
      setIsAuthenticated(isAuth);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await authService.setAuthStatus(false);
    localStorage.removeItem("happy-anniversary-auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-evenly px-6 py-3">
        <Link 
          href="/home" 
          className={`flex flex-col items-center ${isActive('/home') ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1 hidden md:block">Home</span>
        </Link>
        <Link 
          href="/gallery" 
          className={`flex flex-col items-center ${isActive('/gallery') ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
        >
          <Camera className="h-6 w-6" />
          <span className="text-xs mt-1 hidden md:block">Gallery</span>
        </Link>
        <Link 
          href="/letters" 
          className={`flex flex-col items-center ${isActive('/letters') ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
        >
          <MessageCircleHeart className="h-6 w-6" />
          <span className="text-xs mt-1 hidden md:block">Letters</span>
        </Link>
        <Link 
          href="/distance" 
          className={`flex flex-col items-center ${isActive('/distance') ? 'text-primary' : 'text-muted-foreground'} transition-colors hover:text-primary`}
        >
          <MapPin className="h-6 w-6" />
          <span className="text-xs mt-1 hidden md:block">Distance</span>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex flex-col items-center text-muted-foreground hover:text-destructive hover:bg-transparent p-0"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs mt-1 hidden md:block">Logout</span>
        </Button>
      </div>
    </nav>
  );
}
