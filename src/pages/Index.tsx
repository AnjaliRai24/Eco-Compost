import { EnhancedHeader } from "@/components/EnhancedHeader";
import { Hero } from "@/components/Hero";
import { WhatWeAccept } from "@/components/WhatWeAccept";
import { HowItWorks } from "@/components/HowItWorks";
import { VermicompostSection } from "@/components/VermicompostSection";
import { WetWasteSelling } from "@/components/WetWasteSelling";
import { VideoSection } from "@/components/VideoSection";
import { MissionVisionSection } from "@/components/MissionVisionSection";
import { Leaderboard } from "@/components/Leaderboard";
import { PartnersSection } from "@/components/PartnersSection";
import { Footer } from "@/components/Footer";
import { JoinInitiative } from "@/components/JoinInitiative";
import { Chatbot } from "@/components/Chatbot";
import { AccessibilityEnhancements } from "@/components/AccessibilityEnhancements";
import { SEOHead } from "@/components/SEOHead";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { usePageTracking, useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  // Track page views and analytics
  usePageTracking();
  const analytics = useAnalytics();

  return (
    <>
      <SEOHead 
        title="EcoCompost - Transform Waste into Wonder"
        description="Join EcoCompost in creating a sustainable future. Sell your organic waste, buy premium vermicompost, and contribute to a cleaner environment. Turn waste into wealth!"
        keywords="waste management, composting, vermicompost, organic waste, sustainable living, eco-friendly, waste to wealth, Mumbai, India"
      />
      <div id="main-content" className="min-h-screen bg-background">
      <EnhancedHeader />
      <Hero />
      <WhatWeAccept />
      <HowItWorks />
      <VermicompostSection />
      <WetWasteSelling />
      <VideoSection />
      <MissionVisionSection />
      <Leaderboard />
      <PartnersSection />
      <JoinInitiative />
      <Footer />
        <Chatbot />
        <AccessibilityEnhancements />
        <PWAInstallPrompt />
        <PerformanceMonitor />
      </div>
    </>
  );
};

export default Index;
