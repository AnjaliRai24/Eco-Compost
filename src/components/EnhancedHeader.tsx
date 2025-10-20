import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Leaf, Menu, X, Globe, User, Search, Bell, LogOut, MoreHorizontal, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";

export const EnhancedHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { notifications } = useNotifications();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-gradient-to-r from-background/70 via-primary/10 to-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-primary/5">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/40 group-hover:scale-105 transition-transform">
              <Leaf className="h-5 w-5 text-primary-foreground drop-shadow-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-accent transition-all duration-300">
              EcoCompost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {/* Primary Navigation Items */}
            <a href="#how-it-works" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-2 py-1 hover:bg-primary/5 rounded-md">
              {t('howItWorks')}
            </a>
            <a href="#what-we-accept" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-2 py-1 hover:bg-primary/5 rounded-md">
              {t('whatWeAccept')}
            </a>
            <a href="#vermicompost" className="relative text-muted-foreground hover:text-primary transition-all font-medium group px-2 py-1 hover:bg-primary/5 rounded-md">
              {t('vermicompost')}
            </a>
            
            {/* More Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary font-medium px-2 py-1 h-auto">
                  More
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <a href="#wet-waste-selling" className="flex items-center">
                    {t('sellWaste')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#video-tutorial" className="flex items-center">
                    {t('videoTutorial')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#mission-vision" className="flex items-center">
                    {t('ourMission')}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="#leaderboard" className="flex items-center">
                    {t('leaderboard')}
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side - Search, Theme, Language toggle and Login */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-muted-foreground hover:text-primary h-9 w-9 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications - only show if user is logged in */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-primary transition-all h-9 w-9 p-0"
              >
                <Bell className="h-4 w-4" />
                {notifications.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <span className="text-base">{currentLanguage?.flag || '🌍'}</span>
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? 'bg-primary/10' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Login/Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.fullName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      {t('myAccount')}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">
                        <User className="mr-2 h-4 w-4" />
                        {t('adminDashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/auth">{t('login')}</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-9 w-9 p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/20 bg-background/70 backdrop-blur-md">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start" onClick={() => setIsSearchOpen(true)}>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <a href="#how-it-works" className="text-left text-muted-foreground hover:text-primary transition-all font-medium px-3 py-2 rounded-lg hover:bg-primary/10">
                  {t('howItWorks')}
                </a>
                <a href="#what-we-accept" className="text-left text-muted-foreground hover:text-primary transition-all font-medium px-3 py-2 rounded-lg hover:bg-primary/10">
                  {t('whatWeAccept')}
                </a>
                <a href="#vermicompost" className="text-left text-muted-foreground hover:text-primary transition-all font-medium px-3 py-2 rounded-lg hover:bg-primary/10">
                  {t('vermicompost')}
                </a>
                <a href="#wet-waste-selling" className="text-left text-muted-foreground hover:text-accent transition-all font-medium px-3 py-2 rounded-lg hover:bg-accent/10">
                  {t('sellWaste')}
                </a>
                <a href="#video-tutorial" className="text-left text-muted-foreground hover:text-primary transition-all font-medium px-3 py-2 rounded-lg hover:bg-primary/10">
                  {t('videoTutorial')}
                </a>
                <a href="#mission-vision" className="text-left text-muted-foreground hover:text-accent transition-all font-medium px-3 py-2 rounded-lg hover:bg-accent/10">
                  {t('ourMission')}
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
