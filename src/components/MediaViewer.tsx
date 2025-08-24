"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { type MediaItem } from './MediaGallery';

interface MediaViewerProps {
  media: MediaItem;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isTransitioning: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function MediaViewer({
  media,
  onClose,
  onPrevious,
  onNext,
  isTransitioning,
  onLoadingChange
}: MediaViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll when component mounts
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} overflow-hidden`}
      onClick={(e) => e.target === containerRef.current && onClose()}
    >
      {/* Navigation and controls container */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="bg-black/20 hover:bg-black/40 text-white"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Main content container */}
      <div className="w-full h-full max-h-screen max-w-7xl mx-auto p-4 flex flex-col items-center justify-center relative">
        {/* Navigation buttons */}
        {onPrevious && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {onNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Media container with max height constraint */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {media.type === 'photo' ? (
            <div className="relative max-h-[85vh] max-w-[90vw]">
              <Image
                src={media.src}
                alt={media.alt}
                width={1200}
                height={800}
                className="h-auto w-auto max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                priority
                onLoadingComplete={() => onLoadingChange?.(false)}
                onLoad={() => onLoadingChange?.(false)}
                onLoadStart={() => onLoadingChange?.(true)}
              />
            </div>
          ) : (
            <div className="relative w-full max-w-4xl max-h-[85vh] aspect-video">
              <video
                ref={videoRef}
                src={media.src}
                className="w-full h-full rounded-lg shadow-2xl transition-opacity duration-300"
                controls
                controlsList="nodownload"
                playsInline
                autoPlay
                onLoadStart={() => onLoadingChange?.(true)}
                onCanPlay={() => onLoadingChange?.(false)}
                onError={() => onLoadingChange?.(false)}
              />
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <p className="text-white text-sm md:text-base font-body text-center">
            {media.alt}
          </p>
        </div>
      </div>
    </div>
  );
}
