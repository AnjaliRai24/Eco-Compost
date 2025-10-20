import { Leaf, LogOut, User as UserIcon } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Header = () => {
  const { t } = useLanguage();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background/95 via-primary/5 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/10">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform animate-float">
            <Leaf className="h-7 w-7 text-primary-foreground drop-shadow-sm" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-300">
            EcoCompost
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-base">
          <a href="#how-it-works" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-3 py-2 rounded-lg hover:bg-primary/10">
            {t('howItWorks')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
          <a href="#what-we-accept" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-3 py-2 rounded-lg hover:bg-primary/10">
            {t('whatWeAccept')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
          <a href="#vermicompost" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-3 py-2 rounded-lg hover:bg-primary/10">
            {t('vermicompost')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
          <a href="#wet-waste-selling" className="relative text-muted-foreground hover:text-accent transition-all font-medium group px-3 py-2 rounded-lg hover:bg-accent/10">
            {t('sellWaste')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
          <a href="#video-tutorial" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-3 py-2 rounded-lg hover:bg-primary/10">
            {t('videoTutorial')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
          <a href="#mission-vision" className="relative text-muted-foreground hover:text-accent transition-all font-medium group px-3 py-2 rounded-lg hover:bg-accent/10">
            {t('ourMission')}
            <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent group-hover:w-[calc(100%-1.5rem)] transition-all duration-300" />
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <LanguageToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="gap-2 hover-lift border-primary/30 hover:border-primary hover:bg-primary/10">
                  <UserIcon className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">{t('account')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin ? (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">{t('adminDashboard')}</Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/admin/login">{t('adminLogin')}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="default" className="hover-lift border-primary/30 hover:border-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 font-medium shadow-md hover:shadow-lg transition-all duration-300">
              <Link to="/auth">{t('login')}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
