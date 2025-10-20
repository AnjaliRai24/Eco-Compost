import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Download, Smartphone, Monitor, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show prompt after 30 seconds if not dismissed before
    const timer = setTimeout(() => {
      if (!localStorage.getItem('pwa-install-dismissed') && !isInstalled) {
        setShowInstallPrompt(true);
      }
    }, 30000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timer);
    };
  }, [isInstalled]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
    
    // Reset dismissal after 7 days
    setTimeout(() => {
      localStorage.removeItem('pwa-install-dismissed');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  const handleManualInstall = () => {
    // Show instructions for manual installation
    alert(`To install EcoCompost as an app:

For Chrome/Edge:
1. Click the menu button (three dots) in your browser
2. Select "Install EcoCompost" or "Add to Home Screen"

For Safari:
1. Tap the Share button
2. Select "Add to Home Screen"

For Firefox:
1. Click the menu button (three lines)
2. Select "Install"`);
  };

  if (isInstalled || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <Card className="shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Download className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-lg">Install EcoCompost</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Get the full EcoCompost experience with our mobile app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Mobile App</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
              <Monitor className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Desktop App</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span>Works offline after installation</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-orange-500" />
                <span>Install when online for best experience</span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {deferredPrompt && isOnline ? (
              <Button onClick={handleInstall} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Install Now
              </Button>
            ) : (
              <Button onClick={handleManualInstall} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Install Instructions
              </Button>
            )}
            <Button variant="ghost" onClick={handleDismiss}>
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
