import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { EmployerProfile } from "@shared/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, User, Mail, Phone, FileBadge } from "lucide-react";
import { toast } from "sonner";
export function EmployerSettingsPage() {
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [formData, setFormData] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await api<EmployerProfile>("/api/employer/profile");
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch employer profile:", error);
        toast.error("Failed to load company profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { id, value } = e.target;
    setFormData(prev => (prev ? { ...prev, [id]: value } : null));
    setIsDirty(true);
  };
  const handleSaveChanges = () => {
    // Mock save action
    toast.success("Company profile updated successfully!");
    setIsDirty(false);
    if (formData) {
      setProfile(formData);
    }
    // In a real app, you would make a POST/PUT API call here
  };
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-8 w-1/2" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!profile || !formData) {
    return <div>Error loading profile data. Please try again.</div>;
  }
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">Manage your company's profile and contact information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
          <CardDescription>Update your company's details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <div className="relative">
                <Building className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="companyName" value={formData.companyName} onChange={handleInputChange} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessRegistrationNumber">Business Registration No.</Label>
              <div className="relative">
                <FileBadge className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="businessRegistrationNumber" value={formData.businessRegistrationNumber} readOnly disabled className="pl-8" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <div className="relative">
                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="pl-8" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="contactEmail" type="email" value={formData.contactEmail} onChange={handleInputChange} className="pl-8" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="contactPhone" type="tel" value={formData.contactPhone} onChange={handleInputChange} className="pl-8" />
            </div>
          </div>
        </CardContent>
        <div className="p-6 pt-0">
          <Button onClick={handleSaveChanges} disabled={!isDirty}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}