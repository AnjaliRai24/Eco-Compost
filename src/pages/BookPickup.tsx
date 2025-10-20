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
import { apiCreatePickup } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Package } from "lucide-react";
import { z } from "zod";

const pickupSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10).max(15),
  address: z.string().trim().min(10).max(500),
  city: z.string().trim().min(2).max(100),
  pincode: z.string().trim().min(5).max(10),
  preferredDate: z.string(),
  preferredTime: z.string(),
  wasteType: z.string(),
  estimatedWeight: z.number().positive().optional(),
  notes: z.string().max(500).optional(),
});

export default function BookPickup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    preferredDate: "",
    preferredTime: "",
    wasteType: "",
    estimatedWeight: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please Login",
        description: "You must be logged in to book a pickup",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      const validated = pickupSchema.parse({
        ...formData,
        estimatedWeight: formData.estimatedWeight ? parseFloat(formData.estimatedWeight) : undefined,
      });

      setLoading(true);

      await apiCreatePickup({
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        city: validated.city,
        pincode: validated.pincode,
        preferredDate: validated.preferredDate,
        preferredTime: validated.preferredTime,
        wasteType: validated.wasteType,
        estimatedWeight: validated.estimatedWeight,
        notes: validated.notes,
      });

      toast({
        title: "Pickup Booked!",
        description: "We'll contact you soon to confirm your pickup",
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
          title: "Booking Failed",
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Book a Pickup</h1>
            <p className="text-muted-foreground">Schedule your wet waste collection</p>
          </div>

          <Card className="shadow-[var(--shadow-medium)]">
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
              <CardDescription>Fill in the information below to schedule your pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="wasteType">Waste Type</Label>
                    <Select value={formData.wasteType} onValueChange={(val) => setFormData({ ...formData, wasteType: val })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wet_kitchen">Wet Kitchen Waste</SelectItem>
                        <SelectItem value="dry_organic">Dry Organic Waste</SelectItem>
                        <SelectItem value="mixed">Mixed (Wet + Dry Organic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="pl-10"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Select value={formData.preferredTime} onValueChange={(val) => setFormData({ ...formData, preferredTime: val })}>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9-12">9:00 AM - 12:00 PM</SelectItem>
                          <SelectItem value="12-15">12:00 PM - 3:00 PM</SelectItem>
                          <SelectItem value="15-18">3:00 PM - 6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedWeight">Estimated Weight (kg) - Optional</Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="estimatedWeight"
                      type="number"
                      step="0.1"
                      value={formData.estimatedWeight}
                      onChange={(e) => setFormData({ ...formData, estimatedWeight: e.target.value })}
                      className="pl-10"
                      placeholder="Approximate weight"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes - Optional</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Any special instructions or requirements"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Booking..." : "Confirm Pickup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}