import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Mail, Phone, Globe, Handshake, Target, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const PartnersSection = () => {
  const { t } = useLanguage();
  
  const partnershipTypes = [
    {
      title: t('governmentOfficers'),
      description: t('governmentOfficersDesc'),
      icon: Building2,
      benefits: [
        t('policyDevelopmentSupport'),
        t('dataAnalyticsReports'),
        t('communityEngagementPrograms'),
        t('environmentalImpactTracking')
      ],
      contact: {
        email: "gov.partnerships@ecocompost.in",
        phone: "+91 98765 43210"
      },
      color: "from-blue-500 to-blue-700"
    },
    {
      title: t('retailersBusinesses'),
      description: t('retailersBusinessesDesc'),
      icon: Users,
      benefits: [
        t('whiteLabelProducts'),
        t('bulkSupplyAgreements'),
        t('marketingSupport'),
        t('revenueSharingModel')
      ],
      contact: {
        email: "business@ecocompost.in",
        phone: "+91 98765 43211"
      },
      color: "from-green-500 to-green-700"
    }
  ];

  const successStories = [
    {
      partner: "Mumbai Municipal Corporation",
      type: "Government",
      achievement: "Reduced landfill waste by 40%",
      impact: "50,000+ households covered"
    },
    {
      partner: "Green Earth Retail Chain",
      type: "Retailer",
      achievement: "Sold 10,000+ compost bags",
      impact: "25% increase in customer retention"
    },
    {
      partner: "Delhi Environment Department",
      type: "Government",
      achievement: "Launched city-wide program",
      impact: "100,000+ citizens engaged"
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-teal-50 to-cyan-100 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-8 left-8 w-48 h-48 bg-teal-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-8 right-8 w-40 h-40 bg-cyan-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/3 left-1/3 w-28 h-28 bg-blue-200/20 rounded-full blur-xl animate-bounce" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('partnerTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('partnerSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('partnerDesc')}
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {partnershipTypes.map((partnership, index) => (
            <Card key={index} className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${partnership.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <partnership.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-foreground">{partnership.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      Partnership Program
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {partnership.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Partnership Benefits
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Handshake className="h-5 w-5 text-primary" />
                    Get In Touch
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <a 
                        href={`mailto:${partnership.contact.email}`}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {partnership.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <a 
                        href={`tel:${partnership.contact.phone}`}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {partnership.contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open(`mailto:${partnership.contact.email}?subject=Partnership Inquiry`, '_blank')}
                >
                  Contact Us for Partnership
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{story.partner}</h4>
                      <Badge variant="outline" className="text-xs">
                        {story.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Achievement:</span> {story.achievement}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Impact:</span> {story.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto border-primary/20 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join our growing network of partners and help us create a more sustainable future. 
                Together, we can make a real impact on waste management and environmental conservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => window.open('mailto:partnerships@ecocompost.in?subject=Partnership Inquiry', '_blank')}
                >
                  Start Partnership
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                  onClick={() => window.open('tel:+919876543210', '_blank')}
                >
                  Call Us Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
