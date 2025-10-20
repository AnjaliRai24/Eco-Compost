import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Recycle, Truck, CheckCircle2, Leaf, Zap, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export const WetWasteSelling = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const benefits = [
    {
      icon: DollarSign,
      title: t('earnMoney'),
      description: t('earnMoneyDesc'),
    },
    {
      icon: Recycle,
      title: t('environmentalImpact'),
      description: t('environmentalImpactDesc'),
    },
    {
      icon: Truck,
      title: t('freePickup'),
      description: t('freePickupDesc'),
    },
    {
      icon: Zap,
      title: t('quickProcess'),
      description: t('quickProcessDesc'),
    },
  ];
  
  const pricingTiers = [
    { 
      weight: '5-10 kg', 
      price: '₹2/kg', 
      description: 'Perfect for small households',
      popular: false 
    },
    { 
      weight: '10-20 kg', 
      price: '₹3/kg', 
      description: 'Great for medium families',
      popular: true 
    },
    { 
      weight: '20+ kg', 
      price: '₹4/kg', 
      description: 'Ideal for large households',
      popular: false 
    },
  ];
  
  return (
    <section id="wet-waste-selling" className="py-20 bg-gradient-to-b from-orange-50 to-red-50 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-16 right-16 w-36 h-36 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 left-16 w-28 h-28 bg-red-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-yellow-200/20 rounded-full blur-xl animate-bounce" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('sellWasteTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('sellWasteSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('sellWasteDesc')}
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
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] bg-gradient-to-br from-primary/10 to-accent/10 p-8">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <DollarSign className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Earn While You Recycle</h3>
                <p className="text-muted-foreground mb-6">
                  Get instant payment for your organic waste. The more you contribute, the more you earn!
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Quick Pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Instant Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Pricing Per Kilogram
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative border-2 ${
                  tier.popular 
                    ? 'border-primary shadow-[var(--shadow-medium)] scale-105' 
                    : 'border-border shadow-[var(--shadow-soft)]'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">{tier.weight}</CardTitle>
                  <p className="text-3xl font-bold text-primary mt-2">{tier.price}</p>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Free Pickup Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Weekly Collection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Instant Payment</span>
                  </div>
                  <Button 
                    className={`w-full mt-4 ${
                      tier.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/book-pickup')}
                  >
                    Start Selling
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/20">
            <Leaf className="h-8 w-8 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Join 1000+ families already earning from waste!</p>
              <p className="text-sm text-muted-foreground">Start your waste-to-wealth journey today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
