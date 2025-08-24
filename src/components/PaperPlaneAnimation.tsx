"use client";

import { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PaperPlaneAnimationProps {
  onComplete?: () => void;
}

export function PaperPlaneAnimation({ onComplete }: PaperPlaneAnimationProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-64 h-64 md:w-96 md:h-96">
        <svg
          className="animate-paper-plane-fly"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onAnimationEnd={() => {
            if (onComplete) {
              onComplete();
            }
          }}
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </div>
    </div>
  );
}
