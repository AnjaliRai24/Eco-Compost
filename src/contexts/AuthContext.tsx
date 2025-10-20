import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ApiUser, apiLogin, apiMe, apiSignup, apiLoginWithPhone, apiSignupWithPhone, apiForgotPassword, apiVerifyCode, apiResendCode } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: ApiUser | null;
  session: null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, phoneNumber?: string) => Promise<{ error: any; requiresVerification?: boolean }>;
  signInWithPhone: (phoneNumber: string, password: string) => Promise<{ error: any }>;
  signUpWithPhone: (phoneNumber: string, password: string, fullName: string) => Promise<{ error: any; requiresVerification?: boolean }>;
  forgotPassword: (emailOrPhone: string) => Promise<{ error: any; method?: 'email' | 'sms' | 'whatsapp' }>;
  verifyCode: (emailOrPhone: string, code: string, type: 'email' | 'phone') => Promise<{ error: any; verified?: boolean }>;
  resendCode: (emailOrPhone: string, type: 'email' | 'phone') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [session] = useState<null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    apiMe()
      .then(({ user }) => {
        setUser(user);
        setIsAdmin(!!user.isAdmin);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { token, user } = await apiLogin(email, password);
      localStorage.setItem('token', token);
      setUser(user);
      setIsAdmin(!!user.isAdmin);
      navigate('/');
      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'Login failed' } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phoneNumber?: string) => {
    try {
      const { token, user, requiresVerification } = await apiSignup(email, password, fullName, phoneNumber);
      if (requiresVerification) {
        return { error: null, requiresVerification: true };
      }
      localStorage.setItem('token', token);
      setUser(user);
      setIsAdmin(!!user.isAdmin);
      navigate('/');
      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'Signup failed' } };
    }
  };

  const signInWithPhone = async (phoneNumber: string, password: string) => {
    try {
      const { token, user } = await apiLoginWithPhone(phoneNumber, password);
      localStorage.setItem('token', token);
      setUser(user);
      setIsAdmin(!!user.isAdmin);
      navigate('/');
      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'Login failed' } };
    }
  };

  const signUpWithPhone = async (phoneNumber: string, password: string, fullName: string) => {
    try {
      const { requiresVerification } = await apiSignupWithPhone(phoneNumber, password, fullName);
      return { error: null, requiresVerification };
    } catch (e: any) {
      return { error: { message: e.message || 'Signup failed' } };
    }
  };

  const forgotPassword = async (emailOrPhone: string) => {
    try {
      const { method } = await apiForgotPassword(emailOrPhone);
      return { error: null, method };
    } catch (e: any) {
      return { error: { message: e.message || 'Forgot password failed' } };
    }
  };

  const verifyCode = async (emailOrPhone: string, code: string, type: 'email' | 'phone') => {
    try {
      const { verified } = await apiVerifyCode(emailOrPhone, code, type);
      return { error: null, verified };
    } catch (e: any) {
      return { error: { message: e.message || 'Verification failed' } };
    }
  };

  const resendCode = async (emailOrPhone: string, type: 'email' | 'phone') => {
    try {
      await apiResendCode(emailOrPhone, type);
      return { error: null };
    } catch (e: any) {
      return { error: { message: e.message || 'Resend code failed' } };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isAdmin, 
      isLoading, 
      signIn, 
      signUp, 
      signInWithPhone, 
      signUpWithPhone, 
      forgotPassword, 
      verifyCode, 
      resendCode, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};