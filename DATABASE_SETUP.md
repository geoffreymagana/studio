# Database Setup Guide

## Firebase Configuration

This anniversary app now uses Firebase Firestore to sync data between both partners. Here's how to set it up:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to you

### 3. Get Your Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web app icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the config object

### 4. Set Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 5. Security Rules (Optional)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for now
    // In production, you might want to add authentication
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Features Now Synced

✅ **Love Counter**: Both partners see the same count in real-time
✅ **Love Letters**: All messages are shared and visible to both partners
✅ **Distance Widget**: Location data is synced between devices
✅ **Authentication**: Login status is tracked in the database

## Real-time Updates

The app uses Firebase's real-time listeners, so when one partner:
- Clicks the "I Love You" button
- Sends a love letter
- Updates the distance calculation

The other partner will see the changes immediately without refreshing!

## Fallback Support

The app still uses localStorage as a fallback if the database is unavailable, ensuring it works even without internet connection.
