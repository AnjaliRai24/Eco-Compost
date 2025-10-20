import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Users, Target, Award, Leaf, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const MissionVisionSection = () => {
  const { t } = useLanguage();

  const missionPoints = [
    {
      icon: Heart,
      title: t('environmentalProtection'),
      description: t('environmentalProtectionDesc'),
      color: "text-green-600"
    },
    {
      icon: Users,
      title: t('communityBuilding'),
      description: t('communityBuildingDesc'),
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: t('economicEmpowerment'),
      description: t('economicEmpowermentDesc'),
      color: "text-purple-600"
    },
    {
      icon: Globe,
      title: t('globalImpact'),
      description: t('globalImpactDesc'),
      color: "text-orange-600"
    }
  ];

  const visionGoals = [
    {
      icon: Target,
      title: t('zeroWasteCities'),
      description: t('zeroWasteCitiesDesc'),
      progress: "75%"
    },
    {
      icon: Shield,
      title: t('carbonNeutral'),
      description: t('carbonNeutralDesc'),
      progress: "60%"
    },
    {
      icon: Award,
      title: t('millionFamilies'),
      description: t('millionFamiliesDesc'),
      progress: "25%"
    },
    {
      icon: Leaf,
      title: t('greenEconomy'),
      description: t('greenEconomyDesc'),
      progress: "40%"
    }
  ];

  const impactStats = [
    { number: "50,000+", label: t('familiesConnected'), icon: Users },
    { number: "500 Tons", label: t('wasteProcessed'), icon: Leaf },
    { number: "1000+", label: t('co2TonsSaved'), icon: Shield },
    { number: "25 Cities", label: t('activeOperations'), icon: Globe }
  ];

  return (
    <section id="mission-vision" className="py-20 bg-gradient-to-b from-emerald-50 to-teal-100 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-8 left-8 w-56 h-56 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-8 right-8 w-48 h-48 bg-teal-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-200/20 rounded-full blur-xl animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-cyan-200/15 rounded-full blur-2xl animate-pulse" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('missionVisionTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('missionVisionSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('missionVisionDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Mission Text */}
          <div className="order-2 lg:order-1">
            <Card className="border-primary/20 shadow-[var(--shadow-medium)]">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Our Mission Statement
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      We are dedicated to transforming organic waste into valuable resources while building 
                      sustainable communities. Our mission is to create a circular economy where waste becomes 
                      wealth, and every household contributes to a greener, healthier planet.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <Target className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-emerald-800 mb-1">Zero Waste Goal</h4>
                      <p className="text-sm text-emerald-600">Eliminating landfill waste through innovative processing</p>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-teal-800 mb-1">Community Impact</h4>
                      <p className="text-sm text-teal-600">Empowering families with sustainable income opportunities</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mission Points */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <Heart className="h-8 w-8 text-primary" />
                  Our Mission
                </h3>
                <div className="grid gap-4">
                  {missionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-primary/20">
                      <div className={`h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                        <point.icon className={`h-5 w-5 ${point.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{point.title}</h4>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Goals */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            Our Vision Goals
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionGoals.map((goal, index) => (
              <Card key={index} className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <goal.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{goal.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                      style={{ width: goal.progress }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{goal.progress} Complete</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">
                Our Impact So Far
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
            <Leaf className="h-8 w-8 text-primary" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Ready to be part of the change?</p>
              <p className="text-sm text-muted-foreground">Join our mission to create a sustainable future</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
