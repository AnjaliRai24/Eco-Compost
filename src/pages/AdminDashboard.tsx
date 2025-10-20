import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/AdminHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiAdminUpdate } from "@/lib/api";
import { Package, ShoppingCart, Database, CheckCircle2, Clock, X } from "lucide-react";

export default function AdminDashboard() {
  const [pickups, setPickups] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [mongoConfig, setMongoConfig] = useState({ connectionString: "", databaseName: "" });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pickupsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/pickups', { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }).then(r => r.json()),
        fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }).then(r => r.json()),
      ]);
      setPickups(pickupsRes.pickups || []);
      setOrders(ordersRes.orders || []);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (table: 'pickups' | 'orders', id: string, status: string) => {
    try {
      await apiAdminUpdate(table, id, status);
      toast({
        title: "Status Updated",
        description: `${table === 'pickups' ? 'Pickup' : 'Order'} status updated successfully`,
      });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error?.message || 'Failed to update',
        variant: "destructive",
      });
    }
  };

  const saveMongoConfig = async () => {
    toast({ title: 'Info', description: 'MongoDB is configured via server/.env', });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: { variant: "outline", icon: Clock, text: "Pending" },
      completed: { variant: "default", icon: CheckCircle2, text: "Completed" },
      cancelled: { variant: "destructive", icon: X, text: "Cancelled" },
    };

    const config = variants[status] || variants.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="pickups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="pickups">
              <Package className="h-4 w-4 mr-2" />
              Pickups ({pickups.length})
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger value="mongodb">
              <Database className="h-4 w-4 mr-2" />
              MongoDB
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pickups" className="space-y-4">
            {pickups.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No pickups scheduled yet
                </CardContent>
              </Card>
            ) : (
              pickups.map((pickup) => (
                <Card key={pickup.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pickup.full_name}</CardTitle>
                        <CardDescription>{pickup.email} • {pickup.phone}</CardDescription>
                      </div>
                      {getStatusBadge(pickup.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Address</p>
                        <p className="font-medium">{pickup.address}, {pickup.city} - {pickup.pincode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Schedule</p>
                        <p className="font-medium">{pickup.preferred_date} • {pickup.preferred_time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Waste Type</p>
                        <p className="font-medium capitalize">{pickup.waste_type.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Estimated Weight</p>
                        <p className="font-medium">{pickup.estimated_weight ? `${pickup.estimated_weight} kg` : 'Not specified'}</p>
                      </div>
                    </div>
                    {pickup.notes && (
                      <div>
                        <p className="text-muted-foreground text-sm">Notes</p>
                        <p className="text-sm">{pickup.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateStatus('pickups', pickup.id, 'completed')}
                        disabled={pickup.status === 'completed'}
                      >
                        Mark Completed
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStatus('pickups', pickup.id, 'cancelled')}
                        disabled={pickup.status === 'cancelled'}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No orders placed yet
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{order.full_name}</CardTitle>
                        <CardDescription>{order.email} • {order.phone}</CardDescription>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Delivery Address</p>
                        <p className="font-medium">{order.address}, {order.city} - {order.pincode}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Product</p>
                        <p className="font-medium">{order.product_name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-medium">{order.quantity} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Amount</p>
                        <p className="font-medium text-primary text-lg">₹{order.total_amount}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateStatus('orders', order.id, 'completed')}
                        disabled={order.status === 'completed'}
                      >
                        Mark Delivered
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStatus('orders', order.id, 'cancelled')}
                        disabled={order.status === 'cancelled'}
                      >
                        Cancel Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="mongodb">
            <Card>
              <CardHeader>
                <CardTitle>MongoDB Configuration</CardTitle>
                <CardDescription>Configure MongoDB connection for backend integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="connectionString">Connection String</Label>
                  <Input
                    id="connectionString"
                    type="text"
                    placeholder="mongodb+srv://username:password@cluster.mongodb.net/"
                    value={mongoConfig.connectionString}
                    onChange={(e) => setMongoConfig({ ...mongoConfig, connectionString: e.target.value })}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="databaseName">Database Name</Label>
                  <Input
                    id="databaseName"
                    type="text"
                    placeholder="waste_collection_db"
                    value={mongoConfig.databaseName}
                    onChange={(e) => setMongoConfig({ ...mongoConfig, databaseName: e.target.value })}
                  />
                </div>

                <Button onClick={saveMongoConfig}>
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}