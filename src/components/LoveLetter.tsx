"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (!reply.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setReply("");
      toast({
        title: "Message Sent!",
        description: "Your love note is on its way. ❤️",
      });
    }, 2500);
  };

  return (
    <Card>
      {isSending && (
        <div className="paper-plane-animation" onAnimationEnd={() => setIsSending(false)}>
           <PaperPlaneIcon className="text-accent h-8 w-8" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-3xl">A Letter To You</CardTitle>
      </CardHeader>
      <CardContent className="font-body space-y-4">
        <p className="italic text-muted-foreground">My Dearest,</p>
        <p>
          With every passing day, my love for you grows stronger. You are my rock, my joy, and my everything. Thank you for another year of incredible memories. I can't wait to see what our future holds.
        </p>
        <p className="italic text-right">Forever and always,</p>
        <div className="pt-4 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="font-body"
            />
            <Button onClick={handleSend} disabled={isSending || !reply.trim()} className="w-full font-headline">
                Send with Love <PaperPlaneIcon className="ml-2 h-4 w-4"/>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
