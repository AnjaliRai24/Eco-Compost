import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gauge, Clock, HardDrive, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  connectionSpeed: string;
  memoryUsage: number;
  isOnline: boolean;
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
    connectionSpeed: 'unknown',
    memoryUsage: 0,
    isOnline: navigator.onLine
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Measure performance metrics
    const measurePerformance = () => {
      if (!performance.getEntriesByType) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      const webVitals = performance.getEntriesByType('largest-contentful-paint');
      
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      const lcp = webVitals[webVitals.length - 1];
      
      // Get connection speed
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionSpeed = connection ? connection.effectiveType : 'unknown';

      // Get memory usage
      const memory = (performance as any).memory;
      const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0;

      setMetrics(prev => ({
        ...prev,
        loadTime: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
        firstContentfulPaint: fcp ? Math.round(fcp.startTime) : 0,
        largestContentfulPaint: lcp ? Math.round(lcp.startTime) : 0,
        cumulativeLayoutShift: 0, // Would need web-vitals library for accurate measurement
        firstInputDelay: 0, // Would need web-vitals library for accurate measurement
        connectionSpeed,
        memoryUsage
      }));
    };

    // Measure after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Listen for online/offline status
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('load', measurePerformance);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPerformanceScore = () => {
    let score = 100;
    
    // Deduct points for slow metrics
    if (metrics.loadTime > 3000) score -= 20;
    if (metrics.firstContentfulPaint > 1800) score -= 15;
    if (metrics.largestContentfulPaint > 2500) score -= 15;
    if (metrics.memoryUsage > 50) score -= 10;
    if (!metrics.isOnline) score -= 10;
    
    return Math.max(0, score);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const performanceScore = getPerformanceScore();

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600"
        size="sm"
      >
        <Gauge className="h-4 w-4 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed top-4 right-4 z-50 w-80 shadow-2xl border-2 border-blue-200 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Performance Monitor</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Performance Score */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(performanceScore)}`}>
            {performanceScore >= 90 ? <CheckCircle className="h-4 w-4" /> : 
             performanceScore >= 70 ? <AlertTriangle className="h-4 w-4" /> : 
             <AlertTriangle className="h-4 w-4" />}
            Performance Score: {performanceScore}/100
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Load Time: {metrics.loadTime}ms</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-blue-600" />
            <span>Memory: {metrics.memoryUsage}MB</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {metrics.isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm font-medium">
              {metrics.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {metrics.connectionSpeed}
          </Badge>
        </div>

        {/* Performance Tips */}
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            {metrics.loadTime > 3000 && <li>Consider optimizing images</li>}
            {metrics.memoryUsage > 50 && <li>Close unused tabs</li>}
            {!metrics.isOnline && <li>Check your internet connection</li>}
            {performanceScore >= 90 && <li>Great performance! 🎉</li>}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Refresh Page
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const data = JSON.stringify(metrics, null, 2);
              navigator.clipboard.writeText(data);
            }}
            className="flex-1"
          >
            Copy Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
