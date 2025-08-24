"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Pause, Film } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const mediaFiles = [
  // Photos
  { type: 'image', src: '/media/photos/IMG20250112184232.jpg', alt: 'A happy memory' },
  { type: 'image', src: '/media/photos/Snapchat-112040398.jpg', alt: 'A precious moment' },
  { type: 'image', src: '/media/photos/Snapchat-1245804745.jpg', alt: 'A beautiful snapshot' },
  { type: 'image', src: '/media/photos/Snapchat-1320930739.jpg', alt: 'Together' },
  { type: 'image', src: '/media/photos/Snapchat-1430641249.jpg', alt: 'Our memories' },
  { type: 'image', src: '/media/photos/Snapchat-143579249.jpg', alt: 'Special time' },
  { type: 'image', src: '/media/photos/Snapchat-1522934482.jpg', alt: 'Us' },
  { type: 'image', src: '/media/photos/Snapchat-156953678.jpg', alt: 'Love snapshot' },
  { type: 'image', src: '/media/photos/Snapchat-1597882860.jpg', alt: 'Happy times' },
  { type: 'image', src: '/media/photos/Snapchat-1610072343.jpg', alt: 'Together forever' },
  // Videos
  { type: 'video', src: '/media/videos/VID20250112185157.mp4', thumbnail: '/media/photos/Snapchat-1610072343.jpg', alt: 'Our moments' },
  { type: 'video', src: '/media/videos/Snapchat-1191599252.mp4', thumbnail: '/media/photos/Snapchat-156953678.jpg', alt: 'Special video' },
  { type: 'video', src: '/media/videos/Snapchat-125874955.mp4', thumbnail: '/media/photos/Snapchat-1597882860.jpg', alt: 'Together' },
];

export function PhotoGallery() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startSlideshow = () => {
    setIsPlaying(true);
    setActiveIndex(0);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
    setActiveIndex(-1);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!isPlaying || activeIndex < 0) {
      return;
    }

    if (activeIndex >= mediaFiles.length) {
      setIsPlaying(false);
      setActiveIndex(-1);
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex(prev => prev + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, activeIndex, mediaFiles.length]);

  const [selectedMedia, setSelectedMedia] = useState<null | typeof mediaFiles[0]>(null);
  const [mediaSize, setMediaSize] = useState<{ [key: string]: { width: number; height: number } }>({});

  // Function to calculate aspect ratio and determine grid span
  const getGridSpan = (width: number, height: number) => {
    const ratio = width / height;
    if (ratio > 1.5) return 'col-span-2 row-span-1'; // Wide
    if (ratio < 0.7) return 'col-span-1 row-span-2'; // Tall
    return 'col-span-1 row-span-1'; // Square-ish
  };

  // Effect to pre-calculate media dimensions
  useEffect(() => {
    mediaFiles.forEach((media) => {
      if (media.type === 'image') {
        const img = new window.Image();
        img.src = media.src;
        img.onload = () => {
          setMediaSize(prev => ({
            ...prev,
            [media.src]: { width: img.naturalWidth, height: img.naturalHeight }
          }));
        };
      }
    });
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-3xl">Our Gallery</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => isPlaying ? stopSlideshow() : startSlideshow()}
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4" />
              Stop Slideshow
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Play Slideshow
            </>
          )}
        </Button>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {mediaFiles.map((media, index) => {
          const dimensions = mediaSize[media.src];
          const spanClass = dimensions ? getGridSpan(dimensions.width, dimensions.height) : 'col-span-1 row-span-1';
          
          return (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden shadow-md group ${spanClass}`}
              onClick={() => setSelectedMedia(media)}
            >
              {media.type === 'image' ? (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={media.thumbnail || media.src}
                    alt={media.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Film className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-sm font-body">{media.alt}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Viewer Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-7xl w-full p-0 bg-transparent border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedMedia?.type === 'image' ? (
              <Image
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                width={1200}
                height={800}
                className="w-auto h-auto max-h-[90vh] rounded-lg"
              />
            ) : selectedMedia?.type === 'video' && (
              <video
                src={selectedMedia.src}
                controls
                className="w-auto h-auto max-h-[90vh] rounded-lg"
                autoPlay
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Slideshow Overlay */}
      {isPlaying && activeIndex >= 0 && activeIndex < mediaFiles.length && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-auto">
            {mediaFiles[activeIndex].type === 'image' ? (
              <Image
                src={mediaFiles[activeIndex].src}
                alt={mediaFiles[activeIndex].alt}
                width={1200}
                height={800}
                className="w-auto h-auto max-h-[90vh] rounded-lg mx-auto"
              />
            ) : (
              <video
                src={mediaFiles[activeIndex].src}
                className="w-auto h-auto max-h-[90vh] rounded-lg mx-auto"
                autoPlay
                muted
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
