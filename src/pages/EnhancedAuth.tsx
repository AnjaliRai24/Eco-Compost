import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Mail, Phone, Lock, Eye, EyeOff, MessageCircle, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = z.object({
  emailOrPhone: z.string().trim().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  emailOrPhone: z.string().trim().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  emailOrPhone: z.string().trim().min(1, "Email or phone is required"),
});

const verificationSchema = z.object({
  code: z.string().trim().min(4, "Code must be at least 4 characters").max(6),
});

type AuthMode = 'login' | 'signup' | 'forgot-password' | 'verify-email' | 'verify-phone';

export default function EnhancedAuth() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrPhone: "",
    password: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms' | 'whatsapp'>('email');
  const [pendingVerification, setPendingVerification] = useState<{
    emailOrPhone: string;
    type: 'email' | 'phone';
  } | null>(null);

  const { 
    signIn, 
    signUp, 
    signInWithPhone, 
    signUpWithPhone, 
    forgotPassword, 
    verifyCode, 
    resendCode, 
    user 
  } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const isEmail = (input: string) => emailRegex.test(input);
  const isPhone = (input: string) => phoneRegex.test(input);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = loginSchema.parse(formData);
      setLoading(true);
      
      let result;
      if (isEmail(validated.emailOrPhone)) {
        result = await signIn(validated.emailOrPhone, validated.password);
      } else if (isPhone(validated.emailOrPhone)) {
        result = await signInWithPhone(validated.emailOrPhone, validated.password);
      } else {
        throw new Error("Please enter a valid email or phone number");
      }
      
      if (result.error) {
        toast({
          title: "Login Failed",
          description: result.error.message || "Invalid credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Back!",
          description: "Turn waste into wonder",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = signupSchema.parse(formData);
      setLoading(true);
      
      let result;
      if (isEmail(validated.emailOrPhone)) {
        result = await signUp(validated.emailOrPhone, validated.password, validated.fullName);
      } else if (isPhone(validated.emailOrPhone)) {
        result = await signUpWithPhone(validated.emailOrPhone, validated.password, validated.fullName);
      } else {
        throw new Error("Please enter a valid email or phone number");
      }
      
      if (result.error) {
        toast({
          title: "Signup Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (result.requiresVerification) {
        setPendingVerification({
          emailOrPhone: validated.emailOrPhone,
          type: isEmail(validated.emailOrPhone) ? 'email' : 'phone'
        });
        setMode(isEmail(validated.emailOrPhone) ? 'verify-email' : 'verify-phone');
        toast({
          title: "Verification Required",
          description: `We've sent a verification code to your ${isEmail(validated.emailOrPhone) ? 'email' : 'phone'}`,
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Welcome to EcoCompost",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = forgotPasswordSchema.parse(formData);
      setLoading(true);
      
      const result = await forgotPassword(validated.emailOrPhone);
      
      if (result.error) {
        toast({
          title: "Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        setVerificationMethod(result.method || 'email');
        setPendingVerification({
          emailOrPhone: validated.emailOrPhone,
          type: isEmail(validated.emailOrPhone) ? 'email' : 'phone'
        });
        setMode(isEmail(validated.emailOrPhone) ? 'verify-email' : 'verify-phone');
        toast({
          title: "Code Sent",
          description: `Verification code sent via ${result.method}`,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pendingVerification) return;
    
    try {
      const validated = verificationSchema.parse(formData);
      setLoading(true);
      
      const result = await verifyCode(pendingVerification.emailOrPhone, validated.code, pendingVerification.type);
      
      if (result.error) {
        toast({
          title: "Verification Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else if (result.verified) {
        toast({
          title: "Verified!",
          description: "Your account has been verified successfully",
        });
        navigate('/');
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!pendingVerification) return;
    
    try {
      const result = await resendCode(pendingVerification.emailOrPhone, pendingVerification.type);
      
      if (result.error) {
        toast({
          title: "Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Code Resent",
          description: "A new verification code has been sent",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resend code",
        variant: "destructive",
      });
    }
  };

  const getVerificationMethodIcon = () => {
    switch (verificationMethod) {
      case 'email': return <Mail className="h-5 w-5" />;
      case 'sms': return <MessageCircle className="h-5 w-5" />;
      case 'whatsapp': return <MessageCircle className="h-5 w-5" />;
      default: return <Mail className="h-5 w-5" />;
    }
  };

  const getVerificationMethodText = () => {
    switch (verificationMethod) {
      case 'email': return 'Email';
      case 'sms': return 'SMS';
      case 'whatsapp': return 'WhatsApp';
      default: return 'Email';
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email-phone">Email or Phone Number</Label>
        <Input
          id="login-email-phone"
          type="text"
          placeholder="your@email.com or +1234567890"
          value={formData.emailOrPhone}
          onChange={(e) => setFormData(prev => ({ ...prev, emailOrPhone: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="text-sm"
          onClick={() => setMode('forgot-password')}
        >
          Forgot Password?
        </Button>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email-phone">Email or Phone Number</Label>
        <Input
          id="signup-email-phone"
          type="text"
          placeholder="your@email.com or +1234567890"
          value={formData.emailOrPhone}
          onChange={(e) => setFormData(prev => ({ ...prev, emailOrPhone: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 6 characters
        </p>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="forgot-email-phone">Email or Phone Number</Label>
        <Input
          id="forgot-email-phone"
          type="text"
          placeholder="your@email.com or +1234567890"
          value={formData.emailOrPhone}
          onChange={(e) => setFormData(prev => ({ ...prev, emailOrPhone: e.target.value }))}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Code"}
      </Button>
      <div className="text-center">
        <Button
          type="button"
          variant="link"
          className="text-sm"
          onClick={() => setMode('login')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </Button>
      </div>
    </form>
  );

  const renderVerificationForm = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          {getVerificationMethodIcon()}
        </div>
        <h3 className="text-lg font-semibold">Verify Your {getVerificationMethodText()}</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit code to {pendingVerification?.emailOrPhone}
        </p>
      </div>
      
      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verification-code">Verification Code</Label>
          <Input
            id="verification-code"
            type="text"
            placeholder="123456"
            value={formData.code}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
            required
            className="text-center text-lg tracking-widest"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
      
      <div className="text-center space-y-2">
        <Button
          type="button"
          variant="link"
          className="text-sm"
          onClick={handleResendCode}
        >
          Didn't receive the code? Resend
        </Button>
        <Button
          type="button"
          variant="link"
          className="text-sm"
          onClick={() => setMode('login')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">EcoCompost</span>
        </Link>

        {mode === 'login' && (
          <Tabs value="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup" onClick={() => setMode('signup')}>Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Login to your account to continue</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderLoginForm()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {mode === 'signup' && (
          <Tabs value="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => setMode('login')}>Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Join us in making the planet greener</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderSignupForm()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {mode === 'forgot-password' && (
          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>Enter your email or phone to receive a reset code</CardDescription>
            </CardHeader>
            <CardContent>
              {renderForgotPasswordForm()}
            </CardContent>
          </Card>
        )}

        {(mode === 'verify-email' || mode === 'verify-phone') && (
          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Email Verification
              </CardTitle>
              <CardDescription>
                We need to verify your {pendingVerification?.type === 'email' ? 'email' : 'phone'} to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderVerificationForm()}
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
