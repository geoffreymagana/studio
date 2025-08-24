"use client";

import dynamic from 'next/dynamic';
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from "lucide-react";

// Dynamic imports for heavy components
const MediaViewer = dynamic(() => import('./MediaViewer'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="animate-pulse">Loading...</div>
    </div>
  ),
});

export interface MediaItem {
  type: 'photo' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
}

const mediaItems: MediaItem[] = [
  // Photos
  { type: 'photo', src: '/media/photos/IMG20250112184232.jpg', alt: 'A happy memory' },
  { type: 'photo', src: '/media/photos/Snapchat-112040398.jpg', alt: 'A precious moment' },
  { type: 'photo', src: '/media/photos/Snapchat-1245804745.jpg', alt: 'A beautiful snapshot' },
  { type: 'photo', src: '/media/photos/Snapchat-1320930739.jpg', alt: 'Together' },
  { type: 'photo', src: '/media/photos/Snapchat-1430641249.jpg', alt: 'Our memories' },
  { type: 'photo', src: '/media/photos/Snapchat-143579249.jpg', alt: 'Special time' },
  { type: 'photo', src: '/media/photos/Snapchat-1522934482.jpg', alt: 'Us' },
  { type: 'photo', src: '/media/photos/Snapchat-156953678.jpg', alt: 'Love snapshot' },
  { type: 'photo', src: '/media/photos/Snapchat-1597882860.jpg', alt: 'Happy times' },
  { type: 'photo', src: '/media/photos/Snapchat-1610072343.jpg', alt: 'Together forever' },
  { type: 'photo', src: '/media/photos/Snapchat-1616403947.jpg', alt: 'Special moment' },
  { type: 'photo', src: '/media/photos/Snapchat-1810672188.jpg', alt: 'Forever us' },
  { type: 'photo', src: '/media/photos/Snapchat-1823189951.jpg', alt: 'Love story' },
  { type: 'photo', src: '/media/photos/Snapchat-1886016908.jpg', alt: 'Beautiful memories' },
  { type: 'photo', src: '/media/photos/Snapchat-1943720008.jpg', alt: 'Sweet moments' },
  { type: 'photo', src: '/media/photos/Snapchat-2011516993.jpg', alt: 'Together always' },
  { type: 'photo', src: '/media/photos/Snapchat-2054384192.jpg', alt: 'Our journey' },
  { type: 'photo', src: '/media/photos/Snapchat-2059081205.jpg', alt: 'Perfect day' },
  { type: 'photo', src: '/media/photos/Snapchat-2080683860.jpg', alt: 'Love and laughter' },
  { type: 'photo', src: '/media/photos/Snapchat-989862807.jpg', alt: 'Sweet memories' },
  { type: 'photo', src: '/media/photos/Snapchat-989862807.jpg', alt: 'Together in joy' },
  { type: 'photo', src: '/media/photos/Snapchat-918754395.jpg', alt: 'Special moments' },
  { type: 'photo', src: '/media/photos/Snapchat-865947621.jpg', alt: 'Happy together' },
  { type: 'photo', src: '/media/photos/Snapchat-786723326.jpg', alt: 'Our love story' },
  { type: 'photo', src: '/media/photos/Snapchat-607911089.jpg', alt: 'Beautiful day' },
  { type: 'photo', src: '/media/photos/Snapchat-557301920.jpg', alt: 'Forever love' },
  { type: 'photo', src: '/media/photos/Snapchat-52849901.jpg', alt: 'Cherished memories' },
  { type: 'photo', src: '/media/photos/Snapchat-395500460.jpg', alt: 'Perfect moment' },

  // Videos
  { type: 'video', src: '/media/videos/VID20250112185157.mp4', alt: 'Our moments in motion' },
  { type: 'video', src: '/media/videos/Snapchat-1191599252.mp4', alt: 'Video memories' },
  { type: 'video', src: '/media/videos/Snapchat-125874955.mp4', alt: 'Special video moment' },
  { type: 'video', src: '/media/videos/Snapchat-1397417794.mp4', alt: 'Us together' },
  { type: 'video', src: '/media/videos/Snapchat-1509349769.mp4', alt: 'Love captured' },
  { type: 'video', src: '/media/videos/Snapchat-1608421173.mp4', alt: 'Beautiful moments' },
  { type: 'video', src: '/media/videos/Snapchat-1609639171.mp4', alt: 'Sweet memories' },
  { type: 'video', src: '/media/videos/Snapchat-1642207867.mp4', alt: 'Our story' },
  { type: 'video', src: '/media/videos/Snapchat-916249095.mp4', alt: 'Happy times' },
  { type: 'video', src: '/media/videos/Snapchat-84365958.mp4', alt: 'Together forever' },
  { type: 'video', src: '/media/videos/Snapchat-786723326.mp4', alt: 'Love in motion' },
  { type: 'video', src: '/media/videos/Snapchat-607911089.mp4', alt: 'Precious moments' },
  { type: 'video', src: '/media/videos/Snapchat-557301920.mp4', alt: 'Special memories' },
  { type: 'video', src: '/media/videos/Snapchat-52849901.mp4', alt: 'Our journey' },
  { type: 'video', src: '/media/videos/Snapchat-447440257.mp4', alt: 'Love story' },
  { type: 'video', src: '/media/videos/Snapchat-395500460.mp4', alt: 'Beautiful times' },
  { type: 'video', src: '/media/videos/Snapchat-391833549.mp4', alt: 'Forever us' },
  { type: 'video', src: '/media/videos/Snapchat-289084496.mp4', alt: 'Together always' },
  { type: 'video', src: '/media/videos/Snapchat-2092933222.mp4', alt: 'Sweet moments' },
  { type: 'video', src: '/media/videos/Snapchat-204424596.mp4', alt: 'Perfect day' },
  { type: 'video', src: '/media/videos/Snapchat-2010093040.mp4', alt: 'Our love' },
  { type: 'video', src: '/media/videos/Snapchat-1988161543.mp4', alt: 'Cherished times' },
  { type: 'video', src: '/media/videos/Snapchat-1919055294.mp4', alt: 'Memories together' },
  { type: 'video', src: '/media/videos/Snapchat-1874476666.mp4', alt: 'Love captured' },
  { type: 'video', src: '/media/videos/Snapchat-1829997936.mp4', alt: 'Special videos' },
  { type: 'video', src: '/media/videos/Snapchat-1798065523.mp4', alt: 'Happy moments' },
  { type: 'video', src: '/media/videos/Snapchat-1642207867.mp4', alt: 'Us together' }
];

interface MediaGalleryProps {}

export function MediaGallery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to generate video thumbnail
  const generateThumbnail = async (videoSrc: string) => {
    if (thumbnails[videoSrc]) return;

    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;

    try {
      await video.play();
      video.currentTime = 0.1; // Seek to 0.1s to get first frame

      await new Promise((resolve) => {
        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          setThumbnails(prev => ({ ...prev, [videoSrc]: thumbnailUrl }));
          video.pause();
          resolve(null);
        }, { once: true });
      });
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    }
  };

  const handleMediaChange = (newIndex: number, startPlayback = false) => {
    setIsLoading(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsPlaying(startPlayback);
      setIsTransitioning(false);
    }, 300);
  };

  const startSlideshow = () => {
    handleMediaChange(0, true);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const closeViewer = () => {
    setIsTransitioning(true);
    stopSlideshow();
    setTimeout(() => {
      setActiveIndex(-1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleVideoEnded = () => {
    if (isPlaying) {
      setActiveIndex(prev => (prev + 1) % mediaItems.length);
    }
  };

  useEffect(() => {
    if (!isPlaying || activeIndex < 0) {
      return;
    }

    if (activeIndex >= mediaItems.length) {
      stopSlideshow();
      closeViewer();
      return;
    }

    const currentItem = mediaItems[activeIndex];
    let timer: NodeJS.Timeout;
    
    if (currentItem.type === 'photo') {
      timer = setTimeout(() => {
        handleMediaChange(activeIndex + 1, true);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, activeIndex, mediaItems.length]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-3xl">Reel of Memories</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className="gap-2"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => isPlaying ? stopSlideshow() : startSlideshow()}
            className="gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Stop Reel
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play Reel
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Media Viewer Overlay */}
      {activeIndex >= 0 && activeIndex < mediaItems.length && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="animate-pulse">Loading viewer...</div>
          </div>
        }>
          <MediaViewer
            media={mediaItems[activeIndex]}
            onClose={closeViewer}
            onPrevious={activeIndex > 0 ? () => handleMediaChange(activeIndex - 1) : undefined}
            onNext={activeIndex < mediaItems.length - 1 ? () => handleMediaChange(activeIndex + 1) : undefined}
            isTransitioning={isTransitioning}
            onLoadingChange={setIsLoading}
          />
          {isLoading && !isTransitioning && (
            <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center">
              <div className="animate-pulse">Loading media...</div>
            </div>
          )}
        </Suspense>
      )}

      {/* Masonry Grid layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="relative break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            onClick={() => handleMediaChange(index)}
          >
            <div className="relative">
              {item.type === 'photo' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="relative">
                  {thumbnails[item.src] ? (
                    <Image
                      src={thumbnails[item.src]}
                      alt={item.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div 
                      className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center"
                      ref={(el) => {
                        if (el && !thumbnails[item.src]) {
                          generateThumbnail(item.src);
                        }
                      }}
                    >
                      <Play className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-12 h-12 text-white opacity-80 drop-shadow-lg" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-sm font-body p-4 w-full text-center">
                  {item.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
