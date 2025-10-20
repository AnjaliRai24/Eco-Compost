import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface UserProgress {
  totalPickups: number;
  totalWeight: number;
  totalEarnings: number;
  streakDays: number;
  achievements: string[];
  environmentalImpact: {
    co2Saved: number;
    wasteDiverted: number;
    treesEquivalent: number;
  };
  level: number;
  experience: number;
  nextLevelExp: number;
}

interface ProgressContextType {
  progress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  addExperience: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  totalPickups: 0,
  totalWeight: 0,
  totalEarnings: 0,
  streakDays: 0,
  achievements: [],
  environmentalImpact: {
    co2Saved: 0,
    wasteDiverted: 0,
    treesEquivalent: 0
  },
  level: 1,
  experience: 0,
  nextLevelExp: 100
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  // Load progress from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`progress_${user.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } else {
      setProgress(defaultProgress);
    }
  }, [user]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(progress));
    }
  }, [progress, user]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => {
      const newProgress = { ...prev, ...updates };
      
      // Update environmental impact when weight changes
      if (updates.totalWeight !== undefined) {
        newProgress.environmentalImpact = {
          co2Saved: updates.totalWeight * 0.5, // 0.5kg CO2 per kg waste
          wasteDiverted: updates.totalWeight,
          treesEquivalent: Math.round(updates.totalWeight * 0.1) // 0.1 trees per kg
        };
      }

      // Calculate level based on experience
      const newLevel = Math.floor(newProgress.experience / 100) + 1;
      const newNextLevelExp = newLevel * 100;
      
      if (newLevel !== newProgress.level) {
        newProgress.level = newLevel;
        newProgress.nextLevelExp = newNextLevelExp;
      }

      return newProgress;
    });
  };

  const addExperience = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      experience: prev.experience + amount
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setProgress(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievementId]
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    if (user) {
      localStorage.removeItem(`progress_${user.id}`);
    }
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      addExperience,
      unlockAchievement,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
