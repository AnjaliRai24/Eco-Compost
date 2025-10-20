import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Phone, Users, Sprout, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const JoinInitiative = () => {
  const { t } = useLanguage();

  return (
    <section id="join" className="relative overflow-hidden py-20 bg-gradient-to-b from-yellow-50 to-orange-100">
      {/* Interactive-looking gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_10%,hsl(var(--primary)/0.25),transparent_60%),radial-gradient(50%_40%_at_80%_20%,hsl(var(--secondary)/0.25),transparent_60%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]"
      />
      {/* Soft floating blobs */}
      <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl animate-pulse" />
      <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl animate-float" />
      <div aria-hidden className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-red-200/15 blur-2xl animate-bounce" />

      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <div className="mx-auto h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-4">
            <Users className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold">{t('joinOurInitiative')}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('joinInitiativeDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Environmental Impact</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Composting cuts greenhouse gases, restores soil health, and supports urban farming—every small action compounds impact.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Community Leadership</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Mobilize friends and neighborhoods, run compost drives, and become a sustainability champion.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Skill & Career Growth</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Build real sustainability experience—great for college resumes, portfolios, and green careers.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1fr,420px] gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Get Involved</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Organize a wet-waste collection in your society or college.</li>
              <li>Volunteer on awareness campaigns and compost workshops.</li>
              <li>Help digitize pickups and deliveries—tech for good.</li>
            </ul>
          </div>

          <Card className="shadow-[var(--shadow-medium)]">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="text-lg font-medium">Anjali Rai</p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+918356956601" className="hover:underline">+91 8356956601</a>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" className="gap-2">
                  <a href="https://www.linkedin.com/in/anjalirai2" target="_blank" rel="noreferrer">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <a href="https://github.com/AnjaliRai24" target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};


