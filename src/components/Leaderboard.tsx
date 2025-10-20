import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Users, Star, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Leaderboard = () => {
  const { t } = useLanguage();
  
  // Mock data for leaderboard - in real app this would come from API
  const topContributors = [
    {
      rank: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      wasteContributed: 245,
      points: 2450,
      badge: "Champion",
      avatar: "PS",
      color: "from-yellow-400 to-orange-500"
    },
    {
      rank: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      wasteContributed: 198,
      points: 1980,
      badge: "Eco Hero",
      avatar: "RK",
      color: "from-gray-300 to-gray-500"
    },
    {
      rank: 3,
      name: "Anita Patel",
      location: "Ahmedabad",
      wasteContributed: 176,
      points: 1760,
      badge: "Green Warrior",
      avatar: "AP",
      color: "from-amber-600 to-yellow-700"
    },
    {
      rank: 4,
      name: "Suresh Reddy",
      location: "Bangalore",
      wasteContributed: 154,
      points: 1540,
      badge: "Eco Champion",
      avatar: "SR",
      color: "from-blue-500 to-blue-700"
    },
    {
      rank: 5,
      name: "Meera Singh",
      location: "Pune",
      wasteContributed: 142,
      points: 1420,
      badge: "Nature Lover",
      avatar: "MS",
      color: "from-green-500 to-green-700"
    }
  ];

  const stats = [
    { label: t('totalContributors'), value: "1,247", icon: Users, color: "text-primary" },
    { label: t('wasteProcessed'), value: "15,420 kg", icon: TrendingUp, color: "text-accent" },
    { label: t('co2Saved'), value: "3,084 kg", icon: Star, color: "text-green-500" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <section id="leaderboard" className="py-20 bg-gradient-to-b from-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Colorful floating elements */}
      <div className="absolute top-12 left-12 w-44 h-44 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-12 right-12 w-36 h-36 bg-purple-200/25 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-xl animate-bounce" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            {t('leaderboardTitle')}
          </h2>
          <p className="text-2xl text-primary font-semibold mb-4">
            {t('leaderboardSubtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('leaderboardDesc')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground flex items-center justify-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                Top Contributors This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-md ${
                      contributor.rank <= 3 
                        ? 'bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20' 
                        : 'bg-secondary/30 hover:bg-secondary/40'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getRankIcon(contributor.rank)}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${contributor.color} flex items-center justify-center text-white font-bold shadow-md`}>
                        {contributor.avatar}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{contributor.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {contributor.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{contributor.location}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{contributor.wasteContributed} kg</div>
                      <div className="text-sm text-muted-foreground">{contributor.points} points</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-2">Join the Leaderboard!</h3>
                <p className="text-muted-foreground mb-4">
                  Start contributing to our waste management program and climb the leaderboard.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Earn points for each kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span>Monthly rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span>Community recognition</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
