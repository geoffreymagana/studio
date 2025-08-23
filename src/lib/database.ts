import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Database collection names
const COLLECTIONS = {
  LOVE_COUNTER: 'loveCounter',
  LOVE_LETTERS: 'loveLetters',
  LOCATIONS: 'locations',
  AUTH: 'auth'
} as const;

// Types for our data
export interface LoveCounterData {
  count: number;
  lastUpdated: Date;
}

export interface LoveLetterData {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
}

export interface LocationData {
  location1: string;
  location2: string;
  distance: number;
  lastUpdated: Date;
}

export interface AuthData {
  isAuthenticated: boolean;
  lastLogin: Date;
}

// Love Counter Operations
export const loveCounterService = {
  // Get current love counter
  async getCount(): Promise<number> {
    try {
      const docRef = doc(db, COLLECTIONS.LOVE_COUNTER, 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data().count || 0;
      } else {
        // Initialize if doesn't exist
        await setDoc(docRef, { count: 0, lastUpdated: new Date() });
        return 0;
      }
    } catch (error) {
      console.error('Error getting love counter:', error);
      return 0;
    }
  },

  // Increment love counter
  async incrementCount(): Promise<number> {
    try {
      const docRef = doc(db, COLLECTIONS.LOVE_COUNTER, 'main');
      const docSnap = await getDoc(docRef);
      
      let currentCount = 0;
      if (docSnap.exists()) {
        currentCount = docSnap.data().count || 0;
      }
      
      const newCount = currentCount + 1;
      await setDoc(docRef, { 
        count: newCount, 
        lastUpdated: new Date() 
      });
      
      return newCount;
    } catch (error) {
      console.error('Error incrementing love counter:', error);
      return 0;
    }
  },

  // Subscribe to love counter changes
  subscribeToCount(callback: (count: number) => void) {
    const docRef = doc(db, COLLECTIONS.LOVE_COUNTER, 'main');
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data().count || 0);
      } else {
        callback(0);
      }
    });
  }
};

// Love Letters Operations
export const loveLetterService = {
  // Get all love letters
  async getLetters(): Promise<LoveLetterData[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.LOVE_LETTERS),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDoc(q);
      const letters: LoveLetterData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        letters.push({
          id: doc.id,
          content: data.content,
          timestamp: data.timestamp?.toDate() || new Date(),
          author: data.author || 'Anonymous'
        });
      });
      
      return letters;
    } catch (error) {
      console.error('Error getting love letters:', error);
      return [];
    }
  },

  // Add new love letter
  async addLetter(content: string, author: string = 'Anonymous'): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.LOVE_LETTERS), {
        content,
        author,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding love letter:', error);
      throw error;
    }
  },

  // Subscribe to love letters changes
  subscribeToLetters(callback: (letters: LoveLetterData[]) => void) {
    const q = query(
      collection(db, COLLECTIONS.LOVE_LETTERS),
      orderBy('timestamp', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (querySnapshot) => {
      const letters: LoveLetterData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        letters.push({
          id: doc.id,
          content: data.content,
          timestamp: data.timestamp?.toDate() || new Date(),
          author: data.author || 'Anonymous'
        });
      });
      callback(letters);
    });
  }
};

// Location Operations
export const locationService = {
  // Get current location data
  async getLocationData(): Promise<LocationData | null> {
    try {
      const docRef = doc(db, COLLECTIONS.LOCATIONS, 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          location1: data.location1 || '',
          location2: data.location2 || '',
          distance: data.distance || 0,
          lastUpdated: data.lastUpdated?.toDate() || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting location data:', error);
      return null;
    }
  },

  // Update location data
  async updateLocationData(location1: string, location2: string, distance: number): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.LOCATIONS, 'main');
      await setDoc(docRef, {
        location1,
        location2,
        distance,
        lastUpdated: new Date()
      });
    } catch (error) {
      console.error('Error updating location data:', error);
      throw error;
    }
  },

  // Subscribe to location changes
  subscribeToLocation(callback: (data: LocationData | null) => void) {
    const docRef = doc(db, COLLECTIONS.LOCATIONS, 'main');
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback({
          location1: data.location1 || '',
          location2: data.location2 || '',
          distance: data.distance || 0,
          lastUpdated: data.lastUpdated?.toDate() || new Date()
        });
      } else {
        callback(null);
      }
    });
  }
};

// Auth Operations
export const authService = {
  // Set authentication status
  async setAuthStatus(isAuthenticated: boolean): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.AUTH, 'main');
      await setDoc(docRef, {
        isAuthenticated,
        lastLogin: new Date()
      });
    } catch (error) {
      console.error('Error setting auth status:', error);
      throw error;
    }
  },

  // Get authentication status
  async getAuthStatus(): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTIONS.AUTH, 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data().isAuthenticated || false;
      }
      return false;
    } catch (error) {
      console.error('Error getting auth status:', error);
      return false;
    }
  }
};
