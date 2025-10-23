"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, GraduationCap } from 'lucide-react';
import LandingHeader from '@/components/layout/LandingHeader';
import LandingFooter from '@/components/layout/LandingFooter';
import Link from 'next/link';

const features = {
    free: [
        "Up to 1 Active Class",
        "Basic Attendance Tracking",
        "Student Randomizer Tool",
        "Planner & Note Taking",
        "Student Suggestions (Limited)",
    ],
    pro: [
        "Unlimited Classes & Archiving",
        "Full Assessment Management & Grading",
        "Advanced Analytics & Reporting",
        "Student Profile & Data Export",
        "Priority Support",
        "All Free Tier Features",
    ]
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LandingHeader />
      <main className="flex-grow p-8 container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">Simple Pricing for Educators</h1>
          <p className="text-lg text-muted-foreground">Choose the plan that fits your classroom needs.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Free Tier</CardTitle>
              <CardDescription className="text-4xl font-extrabold mt-2">$0<span className="text-base font-normal text-muted-foreground">/month</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <ul className="space-y-3 mb-6">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center text-left">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
                <li className="flex items-center text-left text-muted-foreground line-through">
                    <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    Advanced Analytics
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-auto" asChild>
                <Link href="/register">Start for Free</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="flex flex-col border-primary border-2 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary">Pro Tier</CardTitle>
              <CardDescription className="text-4xl font-extrabold mt-2">$9<span className="text-base font-normal text-muted-foreground">/month</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <ul className="space-y-3 mb-6">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center text-left">
                    <GraduationCap className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-auto" asChild>
                <Link href="/register">Upgrade to Pro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default Pricing;