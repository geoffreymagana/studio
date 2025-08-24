"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenLine, Heart, X } from "lucide-react";
import { loveLetterService, LoveLetterData } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { LetterThread } from "@/components/LetterThread";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const AUTH_KEY = "happy-anniversary-auth";

export default function LettersPage() {
  const router = useRouter();
  const [letters, setLetters] = useState<LoveLetterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // State cleanup - removed unused state variables
  const [showDraftForm, setShowDraftForm] = useState(false);
  const [draftContent, setDraftContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const loadLetters = async () => {
      try {
        const initialLetters = await loveLetterService.getLetters();
        setLetters(initialLetters);
      } catch (error) {
        console.error("Error loading love letters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLetters();

    const unsubscribe = loveLetterService.subscribeToLetters((newLetters) => {
      setLetters(newLetters);
    });

    return () => unsubscribe();
  }, []);

  const handleBack = () => {
    router.push("/home");
  };

  // Removed handleSend as it's now handled in LetterThread component

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-background">
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-6xl text-primary drop-shadow-lg mb-4">
          Our Love Letters
        </h1>
        <p className="font-body text-lg text-muted-foreground mb-4">
          A collection of our heartfelt messages
        </p>
        <Button variant="ghost" size="sm" onClick={handleBack} className="font-body">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </header>

        <div className="w-full max-w-3xl space-y-8 pb-20">
          {letters.length === 0 && !showDraftForm ? (
            <Card className="p-6 text-center space-y-4">
              <h3 className="font-headline text-2xl text-primary">No Letters Yet</h3>
              <p className="text-muted-foreground">Start your love story by writing the first letter.</p>
              <Button 
                onClick={() => setShowDraftForm(true)}
                className="font-body"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Draft a Love Letter
              </Button>
            </Card>
          ) : null}

          {showDraftForm && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline text-2xl text-primary">Write a Love Letter</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowDraftForm(false);
                    setDraftContent("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                placeholder="Pour your heart out..."
                className="font-letter min-h-[200px]"
                disabled={isSubmitting}
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={async () => {
                    if (!draftContent.trim() || isSubmitting) return;
                    setIsSubmitting(true);
                    try {
                      await loveLetterService.addLetter(draftContent.trim(), "Yours Truly");
                      toast({
                        title: "Letter sent! 💕",
                        description: "Your love letter is on its way to their heart.",
                      });
                      setDraftContent("");
                      setShowDraftForm(false);
                    } catch (error) {
                      console.error("Error sending love letter:", error);
                      toast({
                        title: "Error",
                        description: "Failed to send message. Please try again.",
                        variant: "destructive"
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting || !draftContent.trim()}
                  className="font-body"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Send with Love
                </Button>
              </div>
            </Card>
          )}

          {!showDraftForm && letters.length > 0 && (
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowDraftForm(true)}
                variant="outline"
                className="font-body"
              >
                <PenLine className="mr-2 h-4 w-4" />
                Write New Letter
              </Button>
            </div>
          )}

          {letters
            .filter(letter => !letter.replyTo) // Only show main letters
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Sort by newest first
            .map((letter) => (
              <LetterThread
                key={letter.id}
                letter={letter}
                replies={letters
                  .filter(l => l.replyTo === letter.id)
                  .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())}
                onReply={async (content, replyTo) => {
                  try {
                    await loveLetterService.addLetter(content, "Yours Truly", replyTo);
                    toast({
                      title: "Reply sent! 💕",
                      description: "Your love letter is on its way to their heart.",
                    });
                  } catch (error) {
                    console.error("Error sending love letter:", error);
                    toast({
                      title: "Error",
                      description: "Failed to send message. Please try again.",
                      variant: "destructive"
                    });
                  }
                }}
                formatDate={formatDate}
              />
            ))}
        </div>
      </main>
  );
}
