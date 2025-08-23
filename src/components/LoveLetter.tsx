"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loveLetterService, LoveLetterData } from "@/lib/database";

function PaperPlaneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function LoveLetter() {
  const [reply, setReply] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [letters, setLetters] = useState<LoveLetterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial letters
    const loadLetters = async () => {
      try {
        const initialLetters = await loveLetterService.getLetters();
        setLetters(initialLetters);
      } catch (error) {
        console.error('Error loading love letters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLetters();

    // Subscribe to real-time updates
    const unsubscribe = loveLetterService.subscribeToLetters((newLetters) => {
      setLetters(newLetters);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!reply.trim()) {
      toast({
        title: "Empty message",
        description: "Please write something before sending.",
      });
      return;
    }

    setIsFlying(true);
    
    try {
      // Save to database
      await loveLetterService.addLetter(reply.trim(), "Partner");
      
      // Create flying paper plane
      const plane = document.createElement("div");
      plane.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: hsl(var(--primary));">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      `;
      plane.className = "paper-plane-animation";
      plane.style.left = "50%";
      plane.style.top = "50%";
      document.body.appendChild(plane);

      setTimeout(() => {
        document.body.removeChild(plane);
        setIsFlying(false);
        setReply("");
        toast({
          title: "Message sent! 💕",
          description: "Your love letter is on its way to their heart.",
        });
      }, 2500);
    } catch (error) {
      console.error('Error sending love letter:', error);
      setIsFlying(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-3">
          <PaperPlaneIcon className="text-accent" />
          Love Letter
        </CardTitle>
        <CardDescription className="font-body text-muted-foreground">
          Write a reply to your love
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pre-written letter */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
          <h4 className="font-romantic text-lg font-semibold text-gray-800 mb-2">My Dearest Love,</h4>
          <p className="font-letter text-gray-700 leading-relaxed text-sm">
            Every day with you feels like a beautiful dream come true. Your smile lights up my world, 
            and your love makes every moment magical. I'm so grateful for the day our paths crossed 
            and for every moment we've shared since then. You are my everything, my heart, my soul, 
            my forever love. I love you more than words can express.
          </p>
          <p className="font-letter text-gray-700 mt-3 text-sm">
            Forever yours,<br />
            With all my love ❤️
          </p>
        </div>

        {/* Recent letters */}
        {letters.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-body text-sm font-medium text-gray-700">Recent Messages:</h4>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {letters.slice(0, 3).map((letter) => (
                <div key={letter.id} className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-letter text-gray-700 text-sm leading-relaxed">
                    {letter.content}
                  </p>
                  <p className="font-body text-xs text-gray-500 mt-1">
                    {formatDate(letter.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply section */}
        <div className="space-y-3">
          <label className="font-body text-sm font-medium text-gray-700">
            Your Reply:
          </label>
          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write your love letter here..."
            className="font-letter min-h-[120px] resize-none"
            disabled={isFlying}
          />
          <Button 
            onClick={handleSend} 
            disabled={isFlying || !reply.trim() || isLoading}
            className="font-body w-full bg-primary hover:bg-primary/90"
          >
            <PaperPlaneIcon className="mr-2 h-4 w-4" />
            Send with Love
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
