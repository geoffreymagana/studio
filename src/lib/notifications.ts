import { authService } from './database';

class NotificationService {
  private async requestPermission() {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        return registration;
      } catch (error) {
        console.error('Service worker registration failed:', error);
        return null;
      }
    }
    return null;
  }

  async init() {
    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      return false;
    }

    const registration = await this.registerServiceWorker();
    return !!registration;
  }

  async showNotification(title: string, options: NotificationOptions = {}) {
    if (Notification.permission !== 'granted') {
      return false;
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options,
      });
      return true;
    }

    // Fallback to regular notifications if service worker is not available
    new Notification(title, options);
    return true;
  }
}

export const notificationService = new NotificationService();
