"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { User, CreditCard, Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";
import Link from "next/link";
import ProfilePictureUploader from "@/components/ProfilePictureUploader";
import { Teacher } from "@/models/types";

const TeacherProfileForm = () => {
    const { user, updateProfile } = useAuthStore();
    const teacher = user as Teacher;
    const [name, setName] = useState(teacher?.name || '');
    const [email, setEmail] = useState(teacher?.email || '');
    const [photoUrl, setPhotoUrl] = useState(teacher?.profilePhotoUrl || undefined);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSave = async () => {
        if (!teacher) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        updateProfile({
            name: name,
            profilePhotoUrl: photoUrl,
        });
        
        setIsLoading(false);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-center mb-6">
                <ProfilePictureUploader 
                    currentPhotoUrl={photoUrl}
                    onPhotoSelect={setPhotoUrl}
                    name={name}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>
            <Button onClick={handleSave} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Profile</>}
            </Button>
        </div>
    );
}

const BillingSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleManage = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccess("Redirecting to mock billing portal...");
        setIsLoading(false);
    }
    
    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                You are currently on the Free Tier. Upgrade to Pro for unlimited classes and advanced features.
            </p>
            <Button onClick={handleManage} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Manage Subscription / Upgrade'}
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/pricing">View Pricing</Link>
            </Button>
        </div>
    );
}

const Settings = () => {
  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center"><User className="h-4 w-4 mr-2" /> Profile</TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center"><CreditCard className="h-4 w-4 mr-2" /> Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Teacher Profile</CardTitle></CardHeader>
              <CardContent><TeacherProfileForm /></CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader><CardTitle>Subscription & Billing</CardTitle></CardHeader>
              <CardContent><BillingSettings /></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Settings;