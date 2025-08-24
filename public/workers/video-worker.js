// Web Worker for video processing
self.onmessage = async (e) => {
  const { videoUrl, action } = e.data;
  
  switch (action) {
    case 'generateThumbnail':
      try {
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        const canvas = new OffscreenCanvas(320, 180);
        const video = document.createElement('video');
        video.src = objectUrl;
        
        await new Promise((resolve) => {
          video.onloadedmetadata = () => {
            video.currentTime = 0.1;
            video.onseeked = () => {
              const ctx = canvas.getContext('2d');
              ctx.drawImage(video, 0, 0, 320, 180);
              resolve();
            };
          };
        });
        
        const thumbnail = await canvas.convertToBlob({
          type: 'image/jpeg',
          quality: 0.7
        });
        
        self.postMessage({
          type: 'thumbnail',
          data: URL.createObjectURL(thumbnail)
        });
      } catch (error) {
        self.postMessage({
          type: 'error',
          error: error.message
        });
      }
      break;
      
    default:
      self.postMessage({
        type: 'error',
        error: 'Unknown action'
      });
  }
};
