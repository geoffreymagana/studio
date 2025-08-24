"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notificationService } from "@/lib/notifications";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loveLetterService, LoveLetterData } from "@/lib/database";
import { PaperPlaneAnimation } from "./PaperPlaneAnimation";
import { Send } from "lucide-react";

export function LoveLetter() {
  const [reply, setReply] = useState("");
  const [isFlying, setIsFlying] = useState(false);
  const [letters, setLetters] = useState<LoveLetterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize notifications
    notificationService.init().catch(console.error);

    // Load initial letters
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
      // Save to database with replyTo only if we're replying to a specific letter
      if (replyingTo) {
        await loveLetterService.addLetter(reply.trim(), "Partner", replyingTo);
      } else {
        await loveLetterService.addLetter(reply.trim(), "Partner");
      }

      toast({
        title: "Message sent! 💕",
        description: "Your love letter is on its way to their heart.",
      });
      
      // Reset reply state
      setReplyingTo(undefined);
      
      // Animation will be handled in the render
    } catch (error) {
      console.error("Error sending love letter:", error);
      setIsFlying(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <>
      <Card className="bg-card shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-3">
            <Send className="text-accent" />
            Love Letters
          </CardTitle>
          <CardDescription className="font-body text-muted-foreground">
            Write a reply to your love
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        {/* Pre-written letter */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
          <h4 className="font-romantic text-lg font-semibold text-gray-800 mb-2">
            My Dearest Love,
          </h4>
          <p className="font-letter text-gray-700 leading-relaxed text-sm">
            It has been four hundred and thirty-eight days since our stars
            aligned and drew us into one another’s orbit. <br />
            <br />
            From that moment, my life has been rendered anew, for every dawn
            since has carried the melody of your presence, and every dusk has
            closed upon the thought of you, my most cherished companion. <br />{" "}
            <br />
            And now, three hundred and sixty-five days stand as witness to the
            moment I beseeched you to be mine. <br />A year that has unfolded
            not as a simple tale, but as an epic, adorned with laughter and
            delight, yes, but alas, tempered by the inevitable tempests that
            life, in her wisdom, chose to cast our way. <br />
            Those storms, though fierce in their hour, did not undo us. Rather,
            they taught us. They polished the diamond of our union, revealing
            its brilliance more fully with each trial. <br />
            <br />
            For in my heart of hearts I know: without such rains, there would be
            no bloom; without such trials, no triumph. And so, I am grateful...
            not only for the sunlit days of joy, but for the shadows that gave
            them contrast and meaning. <br /><br />
            You, Nkatha, are the axis upon which my world turns, the flame that
            warms me when winter descends, the solace that steadies me when the
            seas grow wild. You are, and shall ever remain, my greatest
            adventure. <br /> <br />
            As we step forward into another year, I pledge to love you with a
            constancy as eternal as the stars, and with a passion as untamed as
            the very storms that have shaped us. <br /><br />
            If the past 438 days have been
            this wondrous, I tremble to imagine the magnificence of forever in
            your embrace. <br />
             <br />
            
          </p>
          <p className="font-letter text-gray-700 mt-3 text-sm">
            Ever your devoted, with all my love,
            <br />
             <br />
            Geoffrey Magana ❤️
          </p>
        </div>

        {/* Recent letters */}
        {letters.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-body text-sm font-medium text-gray-700">
              Recent Messages:
            </h4>
            <div className="max-h-[40vh] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-muted-foreground/10 scrollbar-track-transparent pr-2">
              {letters.map((letter) => {
                const isReply = letter.replyTo !== undefined;
                const parentLetter = isReply 
                  ? letters.find(l => l.id === letter.replyTo)
                  : null;

                return (
                  <div key={letter.id} 
                    className={`relative p-3 rounded-lg transition-all ${
                      isReply ? 'ml-4' : ''
                    } ${!letter.isRead ? 'bg-muted/80' : 'bg-muted/50'}`}
                  >
                    {isReply && (
                      <div className="absolute -left-4 top-4 w-3 h-[2px] bg-muted-foreground/30" />
                    )}
                    {parentLetter && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Replying to: {parentLetter.content.slice(0, 50)}...
                      </div>
                    )}
                    <p className="font-letter text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {letter.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-body text-xs text-gray-500">
                        {formatDate(letter.timestamp)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setReplyingTo(letter.id);
                          if (!letter.isRead) {
                            loveLetterService.markAsRead(letter.id);
                          }
                        }}
                      >
                        Reply
                      </Button>
                    </div>
                    {!letter.isRead && (
                      <span className="text-xs text-primary font-medium">New</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reply section */}
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm font-medium text-gray-700">
                {replyingTo ? "Write your reply:" : "Your Message:"}
              </span>
              {replyingTo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(undefined)}
                  className="text-xs"
                >
                  Cancel Reply
                </Button>
              )}
            </div>
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={
                replyingTo
                  ? "Write your reply here..."
                  : "Write your love letter here..."
              }
              className="font-letter min-h-[120px] resize-none"
              disabled={isFlying}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={isFlying || !reply.trim() || isLoading}
            className="font-body w-full bg-primary hover:bg-primary/90"
          >
            <Send className="mr-2 h-4 w-4" />
            {replyingTo ? "Send Reply" : "Send with Love"}
          </Button>
        </div>
      </CardContent>
    {isFlying && (
      <PaperPlaneAnimation
        onComplete={() => {
          setIsFlying(false);
          setReply("");
        }}
      />
    )}
      </Card>
    </>
  );
}
