import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  const { signOut } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Admin Dashboard</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/">View Site</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
















