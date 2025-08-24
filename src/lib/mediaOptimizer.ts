import { MediaItem } from '@/components/MediaGallery';

export const THUMBNAIL_SIZE = {
  width: 400,
  height: 300
};

export const FULLSIZE_SIZE = {
  width: 1200,
  height: 800
};

export const getOptimizedImageUrl = (src: string, width: number, height: number): string => {
  // Add _thumb suffix before the extension for thumbnails
  if (width <= THUMBNAIL_SIZE.width) {
    const parts = src.split('.');
    const ext = parts.pop();
    return `${parts.join('.')}_thumb.webp`;
  }
  // Use WebP for full-size images
  const parts = src.split('.');
  parts.pop();
  return `${parts.join('.')}.webp`;
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadNextItems = async (mediaItems: MediaItem[], currentIndex: number, count: number = 3) => {
  const nextItems = mediaItems.slice(currentIndex + 1, currentIndex + 1 + count);
  return Promise.all(
    nextItems.map(item => {
      if (item.type === 'photo') {
        return preloadImage(getOptimizedImageUrl(item.src, FULLSIZE_SIZE.width, FULLSIZE_SIZE.height));
      }
      return Promise.resolve();
    })
  );
};
