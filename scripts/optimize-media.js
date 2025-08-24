// This script converts images to WebP format and creates thumbnails
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const THUMBNAIL_SIZE = {
  width: 400,
  height: 300
};

const FULLSIZE_SIZE = {
  width: 1200,
  height: 800
};

async function processMedia() {
  // Process photos
  const photosDir = path.join(__dirname, '../public/media/photos');
  const files = await fs.readdir(photosDir);
  
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
    
    const filePath = path.join(photosDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    
    // Create WebP version
    await sharp(filePath)
      .resize(FULLSIZE_SIZE.width, FULLSIZE_SIZE.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(path.join(photosDir, `${fileNameWithoutExt}.webp`));
    
    // Create thumbnail
    await sharp(filePath)
      .resize(THUMBNAIL_SIZE.width, THUMBNAIL_SIZE.height, {
        fit: 'cover'
      })
      .webp({ quality: 70 })
      .toFile(path.join(photosDir, `${fileNameWithoutExt}_thumb.webp`));
  }
  
  // Generate video thumbnails at first frame
  const videosDir = path.join(__dirname, '../public/media/videos');
  const videoFiles = await fs.readdir(videosDir);
  
  // Note: Video thumbnail generation would require ffmpeg
  // This is a placeholder for the video thumbnail generation logic
}

processMedia().catch(console.error);
