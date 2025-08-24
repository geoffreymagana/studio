import { MediaItem } from '@/components/MediaGallery';

export const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => resolve();
    video.onerror = reject;
    video.src = src;
  });
};

export const generateVideoThumbnail = async (videoSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;
    
    video.onloadedmetadata = async () => {
      try {
        await video.play();
        video.currentTime = 0.1; // Seek to 0.1s to get first frame
        
        video.onseeked = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
          video.pause();
          resolve(thumbnailUrl);
        };
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = reject;
  });
};

export const optimizeVideoPlayback = (videoElement: HTMLVideoElement): void => {
  videoElement.preload = 'metadata';
  videoElement.playsInline = true;
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('webkit-playsinline', '');
  
  // Enable hardware acceleration
  videoElement.style.transform = 'translateZ(0)';
  videoElement.style.willChange = 'transform';
};
