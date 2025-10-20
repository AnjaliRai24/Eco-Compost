import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  );
};

interface LoadingDotsProps {
  className?: string;
}

export const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton = ({ className, children, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg border flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" className="text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar = ({ progress, className, showPercentage = false }: ProgressBarProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-muted-foreground mt-1 text-center">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
};
