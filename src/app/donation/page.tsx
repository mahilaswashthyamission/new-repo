"use client";

import { Hero } from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationSchema, type DonationFormData } from "@/lib/validations";
import { createDonation } from "@/app/actions/donation";
import { useState } from "react";
import { CheckCircle2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const presetAmounts = [500, 1000, 2500, 5000];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setValue("amount", amount);
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setValue("amount", numValue);
    }
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: data.amount }),
      });

      const order = await orderResponse.json();

      // Mock Razorpay payment for demo
      const mockPayment = {
        razorpay_order_id: order.id,
        razorpay_payment_id: `pay_${Date.now()}`,
        razorpay_signature: "mock_signature_for_demo",
      };

      // Process donation
      const result = await createDonation({
        donorName: data.donorName,
        email: data.email,
        phone: data.phone,
        amount: data.amount,
        pan: data.pan,
        orderId: mockPayment.razorpay_order_id,
        paymentId: mockPayment.razorpay_payment_id,
        signature: mockPayment.razorpay_signature,
      });

      if (result.success) {
        setIsSuccess(true);
        reset();
        setSelectedAmount(null);
        setCustomAmount("");
      } else {
        alert(result.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Hero title="Thank You!" />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="pt-12 pb-12">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Donation Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your generous donation. A receipt has been sent to your email.
                </p>
                <div className="space-y-3">
                  <Button onClick={() => setIsSuccess(false)} size="lg">
                    Make Another Donation
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Your support helps us continue our mission to create positive change.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Hero
        title="Make a Donation"
        subtitle="Support Our Cause"
        description="Your contribution helps us create lasting impact in communities"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Impact Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">₹500</p>
                    <p className="text-sm text-muted-foreground">Provides educational materials for 5 children</p>
                  </div>
                  <div>
                    <p className="font-semibold">₹1,000</p>
                    <p className="text-sm text-muted-foreground">Supports healthcare for a family</p>
                  </div>
                  <div>
                    <p className="font-semibold">₹2,500</p>
                    <p className="text-sm text-muted-foreground">Funds a skill development workshop</p>
                  </div>
                  <div>
                    <p className="font-semibold">₹5,000</p>
                    <p className="text-sm text-muted-foreground">Sponsors a community program</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Details</CardTitle>
                  <CardDescription>All donations are secure and tax-deductible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Amount Selection */}
                    <div className="space-y-3">
                      <Label>Select Amount *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {presetAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            onClick={() => handleAmountSelect(amount)}
                            className="h-16"
                          >
                            ₹{amount.toLocaleString("en-IN")}
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customAmount">Or Enter Custom Amount</Label>
                        <Input
                          id="customAmount"
                          type="number"
                          value={customAmount}
                          onChange={(e) => handleCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          min="100"
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-sm text-destructive">{errors.amount.message}</p>
                      )}
                    </div>

                    {/* Donor Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">Full Name *</Label>
                        <Input
                          id="donorName"
                          {...register("donorName")}
                          placeholder="Your name"
                        />
                        {errors.donorName && (
                          <p className="text-sm text-destructive">{errors.donorName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          placeholder="9876543210"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pan">PAN (Optional - for 80G certificate)</Label>
                        <Input
                          id="pan"
                          {...register("pan")}
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isProcessing || !selectedAmount && !customAmount}
                    >
                      {isProcessing ? "Processing..." : "Proceed to Payment"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment powered by Razorpay. We accept UPI, Cards, and Net Banking.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
