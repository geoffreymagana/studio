import { fileURLToPath } from 'url';
import { dirname } from 'path';
import NextPWA from 'next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withPWA = NextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        // Add loaders for different file types
        '.png': ['url-loader'],
        '.jpg': ['url-loader'],
        '.webp': ['url-loader'],
        '.mp4': ['file-loader'],
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 100000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /[\\/]node_modules[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000;
            },
            name(module) {
              const rawRequest = module.rawRequest ? module.rawRequest : '';
              const moduleName = rawRequest.split('/')[0] || 'lib';
              return `chunk.${moduleName.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },
};

export default withPWA(nextConfig);
