import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Globe, Users, Clock, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

export const VideoSection = () => {
  const { t, language } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Update selectedLanguage when language changes
  useEffect(() => {
    setSelectedLanguage(language);
    // Reset video states when language changes
    setVideoError(false);
    setVideoLoading(true);
    setCurrentVideoIndex(0);
  }, [language]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  // Video data - using your actual video files with multiple source options
  const videos = {
    en: {
      title: "Waste to Wonder",
      description: "Learn how to transform your waste into wonder with EcoCompost platform",
      videoSources: [
        "/videos/Waste to Wonder.mp4",
        "/videos/Waste%20to%20Wonder.mp4",
        "videos/Waste to Wonder.mp4"
      ],
      thumbnail: "/images/organic-waste-guide.png",
      duration: "4:30"
    },
    hi: {
      title: "गीला कचरा, बड़ा बदलाव",
      description: "गीला कचरा से बड़ा बदलाव लाने के लिए EcoCompost प्लेटफॉर्म का उपयोग कैसे करें",
      videoSources: [
        "/videos/गीला कचरा, बड़ा बदलाव.mp4",
        "/videos/गीला%20कचरा,%20बड़ा%20बदलाव.mp4",
        "videos/गीला कचरा, बड़ा बदलाव.mp4"
      ],
      thumbnail: "/images/organic-waste-guide.png",
      duration: "4:45"
    },
    mr: {
      title: "Marathi Wet Waste",
      description: "गीला कचरा व्यवस्थापनासाठी EcoCompost प्लॅटफॉर्मचा वापर कसा करावा",
      videoSources: [
        "/videos/Marathi wet waste.mp4",
        "/videos/Marathi%20wet%20waste.mp4",
        "videos/Marathi wet waste.mp4"
      ],
      thumbnail: "/images/organic-waste-guide.png",
      duration: "4:20"
    }
  };

  const currentVideo = videos[selectedLanguage as keyof typeof videos] || videos.en;

  const features = [
    {
      icon: Globe,
      title: t('multiLanguageSupport'),
      description: t('multiLanguageSupportDesc')
    },
    {
      icon: Users,
      title: t('easyToUnderstand'),
      description: t('easyToUnderstandDesc')
    },
    {
      icon: Clock,
      title: t('quickLearning'),
      description: t('quickLearningDesc')
    }
  ];

  return (
    <section id="video-tutorial" className="py-20 bg-gradient-to-b from-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-12 left-12 w-52 h-52 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-12 right-12 w-40 h-40 bg-blue-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-200/20 rounded-full blur-xl animate-bounce" />
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('videoTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('videoSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('videoDesc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          {/* Video Player */}
          <div className="order-2 lg:order-1">
            <Card className="border-primary/20 shadow-[var(--shadow-medium)] overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10">
                {/* Video Element */}
                {videoError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 text-center p-8">
                    <Play className="h-16 w-16 text-primary/50 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Video Not Available</h3>
                    <p className="text-muted-foreground mb-4">
                      The video file could not be loaded. Please try refreshing the page or contact support.
                    </p>
                    <Button 
                      onClick={() => {
                        setVideoError(false);
                        setVideoLoading(true);
                        setCurrentVideoIndex(0);
                      }}
                      variant="outline"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <video
                    key={`${selectedLanguage}-${currentVideoIndex}`} // Force re-render when language or source changes
                    className="w-full h-full object-cover"
                    controls
                    muted={isMuted}
                    poster={currentVideo.thumbnail}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadStart={() => {
                      console.log('Video loading started:', currentVideo.videoSources[currentVideoIndex]);
                      setVideoLoading(true);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play:', currentVideo.videoSources[currentVideoIndex]);
                      setVideoLoading(false);
                    }}
                    onError={(e) => {
                      console.error('Video error:', e, 'URL:', currentVideo.videoSources[currentVideoIndex]);
                      if (currentVideoIndex < currentVideo.videoSources.length - 1) {
                        console.log('Trying next video source...');
                        setCurrentVideoIndex(currentVideoIndex + 1);
                        setVideoLoading(true);
                      } else {
                        setVideoError(true);
                        setVideoLoading(false);
                      }
                    }}
                    preload="metadata"
                    crossOrigin="anonymous"
                  >
                    {currentVideo.videoSources.map((source, index) => (
                      <source 
                        key={index} 
                        src={source} 
                        type="video/mp4" 
                      />
                    ))}
                    <p className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      Your browser doesn't support HTML5 video. Please update your browser or use a different one.
                    </p>
                  </video>
                )}
                
                {/* Loading Overlay */}
                {videoLoading && !videoError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-white mt-2 text-sm">Loading video...</p>
                    </div>
                  </div>
                )}
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {currentVideo.duration}
                    </Badge>
                    {process.env.NODE_ENV === 'development' && (
                      <Badge variant="outline" className="bg-white/20 text-white text-xs">
                        Source: {currentVideoIndex + 1}/{currentVideo.videoSources.length}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {currentVideo.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {currentVideo.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Language Selection & Features */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* Language Selection */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Choose Your Language
                </h3>
                <div className="grid gap-3">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant={selectedLanguage === language.code ? "default" : "outline"}
                      className={`justify-start h-14 text-left ${
                        selectedLanguage === language.code 
                          ? 'bg-primary hover:bg-primary/90' 
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setVideoError(false);
                        setVideoLoading(true);
                        setCurrentVideoIndex(0);
                      }}
                    >
                      <span className="text-2xl mr-3">{language.flag}</span>
                      <div>
                        <div className="font-semibold">{language.name}</div>
                        <div className="text-sm opacity-75">
                          {language.code === 'en' ? 'English Tutorial' : 
                           language.code === 'hi' ? 'हिन्दी ट्यूटोरियल' : 
                           'मराठी ट्यूटोरियल'}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  What You'll Learn
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Video Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--shadow-soft)] bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                After watching the tutorial, you'll know exactly how to use our platform to manage waste, 
                purchase compost, and contribute to a greener environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Our Community
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
