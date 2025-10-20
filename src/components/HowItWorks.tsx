import { Trash2, Calendar, Scale, Coins } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Trash2,
      title: t('step1Title'),
      description: t('step1Desc'),
      color: 'from-primary to-primary/70',
      delay: 'delay-0'
    },
    {
      icon: Calendar,
      title: t('step2Title'),
      description: t('step2Desc'),
      color: 'from-accent to-accent/70',
      delay: 'delay-100'
    },
    {
      icon: Scale,
      title: t('step3Title'),
      description: t('step3Desc'),
      color: 'from-primary to-primary/70',
      delay: 'delay-200'
    },
    {
      icon: Coins,
      title: t('step4Title'),
      description: t('step4Desc'),
      color: 'from-accent to-accent/70',
      delay: 'delay-300'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-secondary/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center mb-20 animate-slide-in-bottom">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {t('howItWorks')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple steps to turn your waste into value
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 max-w-7xl mx-auto perspective-1000">
          {steps.map((step, index) => (
            <div key={index} className={`relative animate-slide-in-bottom ${step.delay}`}>
              <div className="group flex flex-col items-center text-center space-y-6">
                <div className="relative transform-3d hover-lift">
                  <div className={`h-24 w-24 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl shadow-primary/30 animate-float group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-accent-foreground font-bold text-lg shadow-xl animate-glow">
                    {index + 1}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-gradient-to-r from-primary via-accent to-primary/30 animate-shimmer">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
