import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Truck, 
  DollarSign, 
  Leaf, 
  Trophy, 
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Target,
  Recycle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoadingSpinner, Skeleton } from "@/components/ui/loading";

interface PickupRequest {
  id: string;
  date: string;
  weight: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  earnings: number;
  address: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app this would come from API
  const [pickupRequests] = useState<PickupRequest[]>([
    {
      id: '1',
      date: '2024-01-15',
      weight: 12.5,
      status: 'completed',
      earnings: 37.50,
      address: '123 Green Street, Mumbai'
    },
    {
      id: '2',
      date: '2024-01-20',
      weight: 8.2,
      status: 'scheduled',
      earnings: 0,
      address: '123 Green Street, Mumbai'
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Pickup',
      description: 'Complete your first waste pickup',
      icon: Recycle,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Eco Warrior',
      description: 'Complete 10 pickups',
      icon: Trophy,
      unlocked: false,
      progress: 2,
      maxProgress: 10
    },
    {
      id: '3',
      title: 'Weight Master',
      description: 'Contribute 100kg of waste',
      icon: Target,
      unlocked: false,
      progress: 20.7,
      maxProgress: 100
    },
    {
      id: '4',
      title: 'Monthly Champion',
      description: 'Earn ₹500 in a month',
      icon: Award,
      unlocked: false,
      progress: 37.50,
      maxProgress: 500
    }
  ]);

  const totalEarnings = pickupRequests.reduce((sum, req) => sum + req.earnings, 0);
  const totalWeight = pickupRequests.reduce((sum, req) => sum + req.weight, 0);
  const completedPickups = pickupRequests.filter(req => req.status === 'completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.fullName}!</h1>
              <p className="text-muted-foreground">Track your eco-friendly journey</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +₹37.50 from last pickup
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pickups Completed</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedPickups}</div>
              <p className="text-xs text-muted-foreground">
                {pickupRequests.length} total requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waste Contributed</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWeight.toFixed(1)} kg</div>
              <p className="text-xs text-muted-foreground">
                Environmental impact
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <p className="text-xs text-muted-foreground">
                of {achievements.length} total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pickups">Pickups</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest eco-friendly actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pickupRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          Pickup {request.status === 'completed' ? 'completed' : 'scheduled'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.date).toLocaleDateString()} • {request.weight}kg
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Truck className="mr-2 h-4 w-4" />
                    Schedule New Pickup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    View Earnings History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pickups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup History</CardTitle>
                <CardDescription>Track all your waste pickup requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pickupRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {getStatusIcon(request.status)}
                          </div>
                          <div>
                            <p className="font-medium">Pickup #{request.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(request.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.weight} kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{request.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">₹{request.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Unlock badges by completing eco-friendly actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className={`h-auto w-10 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <achievement.icon className={`h-5 w-5 ${
                            achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{achievement.title}</h4>
                            {achievement.unlocked && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Unlocked
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">{user.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm text-muted-foreground">January 2024</p>
                  </div>
                  <Button className="w-full">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Address
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
