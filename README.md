# Our Love Story: Interactive Anniversary Celebration 💝

A beautifully crafted web application to celebrate our love story, built with Next.js, TypeScript, and Firebase. This interactive experience features love letters, photo memories, distance tracking, and more.

## 🌟 Features

### Authentication with a Touch of Romance
- Secret phrase authentication system with smart hints
- Interactive heart drawing verification
- Dynamic feedback with color-coded hints

### Love Letters 💌
- Real-time love letter exchange
- Threaded conversations with elegant visuals
- Draft and reply functionality
- Beautiful typography with romantic styling
- Empty state with "Draft Letter" action

### Media Gallery 📸
- Collection of 28 photos and 27 videos
- Masonry grid layout
- Smooth transitions and loading states
- Video thumbnail generation
- Slideshow functionality with audio controls

### Distance Widget 🗺️
- Calculate distance between locations
- Real-time geolocation support
- Animated distance calculations
- Precise measurements to 2 decimal places

### Interactive Timeline ⌛
- Visualization of our journey together
- Important dates and milestones
- Beautiful animations

## 🛠️ Technology Stack

- **Frontend:**
  - Next.js 13 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui Components
  - Lucide Icons

- **Backend:**
  - Firebase Realtime Database
  - Firebase Authentication
  - Firebase Storage

- **Features:**
  - Real-time updates
  - Responsive design
  - Progressive Web App support
  - Dynamic imports for performance
  - Client-side animations

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/geoffreymagana/studio.git
   cd studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## � Deployment

### Vercel Deployment

1. **Configure Vercel**
   - Fork this repository
   - Import the project to Vercel
   - Add environment variables in Vercel project settings
   - Enable automatic deployments

2. **Build Configuration**
   The project includes necessary configuration files:
   - `.babelrc` - Babel configuration for Next.js
   - `next.config.js` - Next.js configuration with PWA support
   - `vercel.json` - Vercel-specific configurations

3. **Troubleshooting Builds**
   If you encounter build issues:
   - Ensure all environment variables are set in Vercel
   - Verify the `.babelrc` file contains:
     ```json
     {
       "presets": ["next/babel"],
       "plugins": []
     }
     ```
   - Check Node.js version matches local development

4. **Post-Deployment**
   - Test the deployed application
   - Verify PWA functionality
   - Check media loading and real-time features
   - Test authentication flow

## �📱 PWA Support

The application is PWA-enabled, allowing installation on mobile devices for a native app-like experience.

## 🎨 Customization

### Themes
- Custom color schemes in `tailwind.config.ts`
- Font configurations in `globals.css`
- Component styling through shadcn/ui

### Media
- Add photos to `/public/media/photos`
- Add videos to `/public/media/videos`
- Update media entries in `MediaGallery.tsx`

## 📝 Project Structure

```
src/
├── app/             # App router pages
├── components/      # Reusable components
├── lib/            # Utilities and Firebase config
├── hooks/          # Custom React hooks
├── styles/         # Global styles
└── types/          # TypeScript definitions
```

## 🤝 Contributing

This is a personal project but feel free to fork and customize for your own anniversary celebration!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💕 Acknowledgments

Special thanks to my love, for being the inspiration behind this project and for all the wonderful memories we've created together.

---

Made with ❤️ by Geoffrey Magana
