import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shield, Leaf, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const adminRegisterSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
  fullName: z.string().trim().min(2),
});

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) navigate('/admin');
  }, [user, isAdmin, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = adminRegisterSchema.parse({ email, password, fullName });
      if (!/@eco(\.|$)/i.test(validated.email)) {
        toast({ title: 'Not Allowed', description: 'Admin registration is restricted to @eco emails', variant: 'destructive' });
        return;
      }
      setLoading(true);

      const res = await fetch('/api/auth/admin-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Registration failed');
      localStorage.setItem('token', data.token);
      toast({ title: 'Admin Registered', description: 'Welcome!' });
      navigate('/admin');
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        toast({ title: 'Validation Error', description: err.errors[0].message, variant: 'destructive' });
      } else {
        toast({ title: 'Registration Failed', description: err.message, variant: 'destructive' });
      }
    } finally {
      setLoading(false);
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
            <span className="text-sm text-primary font-semibold">Admin Registration</span>
          </div>
        </Link>

        <Card className="shadow-2xl border-primary/20 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Create Admin Account
            </CardTitle>
            <CardDescription>Restricted to @eco email addresses</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">@eco Email</Label>
                <Input id="admin-email" type="email" placeholder="name@eco.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : <span className="inline-flex items-center gap-2"><UserPlus className="h-4 w-4" /> Register Admin</span>}
              </Button>
              <div className="text-center text-sm text-muted-foreground pt-2">
                Already have an account? <Link to="/admin/login" className="text-primary hover:underline">Admin login</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
















