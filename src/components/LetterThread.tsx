"use client";

import { useState } from "react";
import { LoveLetterData } from "@/lib/database";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { PenLine, Heart } from "lucide-react";

interface LetterThreadProps {
  letter: LoveLetterData;
  replies: LoveLetterData[];
  onReply: (content: string, replyTo: string) => Promise<void>;
  formatDate: (date: Date) => string;
}

export function LetterThread({ letter, replies, onReply, formatDate }: LetterThreadProps) {
  const [showReplyTo, setShowReplyTo] = useState(false);
  const [reply, setReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!reply.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onReply(reply, letter.id);
      setReply("");
      setShowReplyTo(false);
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Main letter with inline reply button/form */}
      <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg rounded-lg p-6 border border-pink-100 space-y-4">
        <div className="space-y-3">
          <p className="font-letter whitespace-pre-wrap text-base md:text-lg leading-relaxed text-gray-800">
            {letter.content}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-gray-600">
            <span className="font-body">{formatDate(letter.timestamp)}</span>
            <span className="font-romantic">With love, {letter.author}</span>
          </div>
        </div>

        {!showReplyTo ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyTo(true)}
            className="w-full hover:bg-muted/50"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Write a Reply
          </Button>
        ) : (
          <div className="space-y-3 border-t pt-3">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply..."
              className="font-letter min-h-[120px]"
              disabled={isSubmitting}
            />
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowReplyTo(false);
                  setReply("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSend}
                disabled={isSubmitting || !reply.trim()}
                className="flex-1"
              >
                <Heart className="mr-2 h-4 w-4" />
                Send with Love
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="pl-8 space-y-4">
          {replies.map((reply, index) => (
            <div
              key={reply.id}
              className="bg-white/80 shadow-sm rounded-lg p-4 border border-pink-100/50 relative"
            >
              {/* Vertical line connecting replies */}
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-pink-200" 
                   style={{ top: index === 0 ? '-16px' : '0' }} />
              
              {/* Horizontal line to reply */}
              <div className="absolute -left-4 top-6 w-4 h-px bg-pink-200" />
              
              <div className="space-y-2">
                <p className="font-letter whitespace-pre-wrap text-sm md:text-base leading-relaxed text-gray-700">
                  {reply.content}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
                  <span className="font-body">{formatDate(reply.timestamp)}</span>
                  <span className="font-romantic">With love, {reply.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
  );
}
