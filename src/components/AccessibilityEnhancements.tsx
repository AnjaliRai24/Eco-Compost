import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Type, 
  Contrast,
  Keyboard,
  MousePointer
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusVisible: boolean;
}

export const AccessibilityEnhancements = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: false
  });

  const [isOpen, setIsOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    if (settings.focusVisible) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetSettings = () => {
    setSettings({
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: false,
      focusVisible: false
    });
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        size="lg"
        aria-label="Open accessibility settings"
      >
        <Eye className="h-5 w-5 text-white" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card className="fixed bottom-32 right-6 w-80 shadow-2xl border-2 border-blue-200 z-50 bg-white">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-800">Accessibility Settings</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close accessibility settings"
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Contrast className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">High Contrast</span>
                  </div>
                  <Button
                    variant={settings.highContrast ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSetting('highContrast')}
                  >
                    {settings.highContrast ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Large Text */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Large Text</span>
                  </div>
                  <Button
                    variant={settings.largeText ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSetting('largeText')}
                  >
                    {settings.largeText ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Reduced Motion</span>
                  </div>
                  <Button
                    variant={settings.reducedMotion ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSetting('reducedMotion')}
                  >
                    {settings.reducedMotion ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Focus Visible */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Keyboard className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Enhanced Focus</span>
                  </div>
                  <Button
                    variant={settings.focusVisible ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSetting('focusVisible')}
                  >
                    {settings.focusVisible ? 'On' : 'Off'}
                  </Button>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant={theme === 'light' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme('light')}
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === 'dark' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTheme('dark')}
                    >
                      Dark
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSettings}
                  className="w-full"
                >
                  Reset Settings
                </Button>
              </div>

              <div className="text-xs text-gray-500">
                <p>Accessibility settings are saved locally and will persist across sessions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
