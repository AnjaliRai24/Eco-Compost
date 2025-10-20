import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiCreateOrder } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";
import vermicompostImage from "@/assets/vermicompost-product.jpg";
import { z } from "zod";

const orderSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10).max(15),
  address: z.string().trim().min(10).max(500),
  city: z.string().trim().min(2).max(100),
  pincode: z.string().trim().min(5).max(10),
  quantity: z.number().positive(),
});

export default function Shop() {
  const products = [
    { id: '1kg', name: 'Natural Vermicompost 1 kg', price: 15, quantity: 1 },
    { id: '5kg', name: 'Natural Vermicompost 5 kg', price: 70, quantity: 5 },
    { id: '10kg', name: 'Natural Vermicompost 10 kg', price: 135, quantity: 10 },
  ];

  const [selectedProduct, setSelectedProduct] = useState('');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedProductDetails = products.find(p => p.id === selectedProduct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please Login",
        description: "You must be logged in to place an order",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!selectedProductDetails) {
      toast({
        title: "Select a Product",
        description: "Please select a product to order",
        variant: "destructive",
      });
      return;
    }

    try {
      const validated = orderSchema.parse({
        ...formData,
        quantity: selectedProductDetails.quantity,
      });

      setLoading(true);

      await apiCreateOrder({
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        city: validated.city,
        pincode: validated.pincode,
        productName: selectedProductDetails.name,
        quantity: validated.quantity,
        price: selectedProductDetails.price,
        totalAmount: selectedProductDetails.price,
      });

      toast({
        title: "Order Placed!",
        description: "We'll deliver your vermicompost soon",
      });

      navigate('/');
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Order Failed",
          description: "Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Buy Vermicompost</h1>
            <p className="text-muted-foreground">Order organic compost for your garden</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle>Product</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={vermicompostImage} 
                  alt="Vermicompost" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-4">
                  <Label>Select Quantity</Label>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedProduct === product.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedProduct(product.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.quantity} kg</p>
                        </div>
                        <p className="text-2xl font-bold text-primary">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-[var(--shadow-medium)]">
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
                <CardDescription>Where should we deliver your order?</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {selectedProductDetails && (
                    <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="font-medium">{selectedProductDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">{selectedProductDetails.quantity} kg</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-primary border-t pt-2">
                        <span>Total:</span>
                        <span>₹{selectedProductDetails.price}</span>
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading || !selectedProduct}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}