import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sprout, Recycle, Heart, TrendingDown, TreeDeciduous, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import vermicompostImage from "@/assets/vermicompost-product.jpg";

export const VermicompostSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const benefits = [
    {
      icon: Leaf,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
    },
    {
      icon: Sprout,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
    },
    {
      icon: Recycle,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
    },
    {
      icon: Heart,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
    },
  ];
  
  const pricingOptions = [
    { weight: '1 kg', price: '₹15', popular: false },
    { weight: '5 kg', price: '₹70', popular: true },
    { weight: '10+ kg', price: t('contactUs'), popular: false },
  ];
  
  return (
    <section id="vermicompost" className="py-20 bg-gradient-to-b from-green-50 to-emerald-100 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime-200/20 rounded-full blur-xl animate-bounce" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('vermicompostTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('vermicompostSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('vermicompostDesc')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-medium)]">
              <img 
                src={vermicompostImage} 
                alt="Natural Vermicompost" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-8">
                <div className="text-primary-foreground">
                  <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
                  <p className="text-sm">Rich in nutrients, perfect for your plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-2xl p-8 mb-12 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            {t('impactTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, text: t('impactStat1') },
              { icon: Recycle, text: t('impactStat2') },
              { icon: TreeDeciduous, text: t('impactStat3') },
            ].map((stat, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-foreground font-medium">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            {t('pricePerKg')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${
                  option.popular 
                    ? 'border-primary shadow-[var(--shadow-medium)] scale-105' 
                    : 'border-border shadow-[var(--shadow-soft)]'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Best Value
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-3xl font-bold text-foreground">{option.weight}</CardTitle>
                  <p className="text-4xl font-bold text-primary mt-2">{option.price}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">100% Natural</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Nutrient Rich</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Eco-Friendly</span>
                  </div>
                  <Button 
                    className={`w-full mt-4 ${
                      option.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={option.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/shop')}
                  >
                    {t('orderNow')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
