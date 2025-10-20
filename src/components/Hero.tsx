import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Sparkles, Leaf, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-compost.jpg";

export const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden perspective-1000">
      <div
        className="absolute inset-0 z-0 transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Reduced overlay opacity for better background visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(34,197,94,0.05),transparent_50%)]" />
        {/* Additional subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20" />
      </div>

      <div className="absolute top-20 right-10 w-20 h-20 bg-green-300/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-purple-300/25 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />

      <div className="container relative z-10 py-24">
        <div className="max-w-3xl space-y-8 animate-slide-in-bottom bg-background/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20 shadow-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-scale-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Transform Waste into Wealth</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight transform-3d">
            <span className="text-foreground drop-shadow-lg">
              {t('heroTitle')}
            </span>
          </h1>

          <p className="text-3xl md:text-4xl font-bold text-foreground drop-shadow-md">
            {t('heroSubtitle')}
          </p>

          <p className="text-xl text-foreground/90 max-w-2xl leading-relaxed drop-shadow-sm">
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 hover-lift text-lg px-8 py-6"
              onClick={() => navigate('/book-pickup')}
            >
              {t('bookPickup')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 hover-lift text-lg px-8 py-6"
              onClick={() => navigate('/shop')}
            >
              <Leaf className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {t('buyCompost')}
            </Button>
          </div>

          <div className="flex items-center gap-12 pt-12">
            <div className="space-y-2 transform-3d hover:scale-110 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
                ₹2-5
              </div>
              <div className="text-foreground/80 font-medium drop-shadow-sm">Per kg waste</div>
            </div>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
            <div className="space-y-2 transform-3d hover:scale-110 transition-transform">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
                100%
              </div>
              <div className="text-foreground/80 font-medium drop-shadow-sm">Natural compost</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
