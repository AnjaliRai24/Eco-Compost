import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shield, Leaf, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { signIn, forgotPassword, user, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = loginSchema.parse({ email, password });
      setLoading(true);

      const { error } = await signIn(validated.email, validated.password);

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid admin credentials",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Admin",
          description: "Successfully logged in",
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your admin email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error, method } = await forgotPassword(resetEmail);

      if (error) {
        toast({
          title: "Failed",
          description: error.message || "Failed to send reset code",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Code Sent",
          description: `Password reset code sent to your ${method} address`,
        });
        setForgotPasswordMode(false);
        setResetEmail("");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminRegister = async () => {
    const emailInput = prompt('Enter @eco admin email:');
    const passwordInput = prompt('Enter password (min 6 chars):');
    const fullNameInput = prompt('Enter full name:');
    if (!emailInput || !passwordInput || !fullNameInput) return;
    try {
      const res = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput, fullName: fullNameInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      localStorage.setItem('token', data.token);
      toast({ title: 'Admin Registered', description: 'Welcome!', });
      navigate('/admin');
    } catch (err: any) {
      toast({ title: 'Registration Failed', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/10 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/50 animate-pulse">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-white">EcoCompost</span>
            </div>
            <span className="text-sm text-primary font-semibold">Admin Portal</span>
          </div>
        </Link>

        <Card className="shadow-2xl border-primary/20 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {!forgotPasswordMode ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@ecocompost.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="transition-all focus:ring-2 focus:ring-primary pr-10"
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
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/30"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Access Admin Dashboard
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-4 space-y-2">
                  <div>
                    <Button
                      type="button"
                      variant="link"
                      className="text-primary hover:underline text-sm"
                      onClick={() => setForgotPasswordMode(true)}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Link to="/auth" className="text-primary hover:underline">
                      Regular user login
                    </Link>
                    <span>•</span>
                    <button type="button" onClick={handleAdminRegister} className="text-primary hover:underline">
                      Register admin (@eco)
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Admin Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="admin@ecocompost.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/30"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Reset Code
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary hover:underline text-sm"
                    onClick={() => setForgotPasswordMode(false)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Login
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/60 mt-6">
          Restricted access only. Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}
