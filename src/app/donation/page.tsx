"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationSchema, type DonationFormData } from "@/lib/validations";
import { createDonation } from "@/app/actions/donation";
import { useState } from "react";
import { CheckCircle2, Heart, Users, GraduationCap, Home, Sparkles, Shield, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const presetAmounts = [500, 1000, 2500, 5000, 10000];

const impactData = [
  {
    amount: 500,
    icon: GraduationCap,
    title: "Education Support",
    description: "Provides educational materials for 5 children",
    color: "from-blue-500 to-cyan-500"
  },
  {
    amount: 1000,
    icon: Heart,
    title: "Healthcare Aid",
    description: "Supports healthcare for a family",
    color: "from-rose-500 to-pink-500"
  },
  {
    amount: 2500,
    icon: Users,
    title: "Skill Development",
    description: "Funds a skill development workshop",
    color: "from-purple-500 to-indigo-500"
  },
  {
    amount: 5000,
    icon: Home,
    title: "Community Program",
    description: "Sponsors a complete community program",
    color: "from-amber-500 to-orange-500"
  },
];

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
  const [donationData, setDonationData] = useState<{
    donorName: string;
    email: string;
    phone: string;
    amount: number;
    transactionId: string;
  } | null>(null);

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsProcessing(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load payment gateway. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Create order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: data.amount }),
      });

      const order = await orderResponse.json();

      if (!order.id) {
        throw new Error("Failed to create order");
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_RfBjeDUVr0dCCK",
        amount: order.amount,
        currency: order.currency,
        name: "Mahila Swashth Mission",
        description: "Donation",
        order_id: order.id,
        prefill: {
          name: data.donorName,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#3b82f6",
        },
        handler: async function (response: any) {
          // Payment successful
          try {
            const result = await createDonation({
              donorName: data.donorName,
              email: data.email,
              phone: data.phone,
              amount: data.amount,
              pan: data.pan,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (result.success) {
              setDonationData({
                donorName: data.donorName,
                email: data.email,
                phone: data.phone,
                amount: data.amount,
                transactionId: response.razorpay_payment_id,
              });
              setIsSuccess(true);
              reset();
              setSelectedAmount(null);
              setCustomAmount("");
            } else {
              alert(result.error || "Failed to process donation");
            }
          } catch (error) {
            console.error("Donation processing error:", error);
            alert("Failed to process donation. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response: any) {
        setIsProcessing(false);
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (!donationData) return;

    try {
      const response = await fetch("/api/download-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName: donationData.donorName,
          email: donationData.email,
          phone: donationData.phone,
          amount: donationData.amount,
          transactionId: donationData.transactionId,
          date: new Date().toLocaleDateString("en-IN"),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `donation_receipt_${donationData.transactionId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Failed to download receipt");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download receipt");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white dark:bg-gray-950 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 text-center border border-primary/20">
            <div className="relative inline-block mb-4 md:mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
              <CheckCircle2 className="h-16 w-16 md:h-20 md:w-20 text-primary relative z-10 mx-auto" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Thank You for Your Generosity!
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto px-2">
              Your donation has been received successfully. A receipt has been sent to your email address.
            </p>
            
            {donationData && (
              <div className="bg-primary/5 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
                <p className="text-xs md:text-sm text-muted-foreground mb-3">Transaction Details</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Amount:</span> ₹{donationData.amount.toLocaleString("en-IN")}</p>
                  <p><span className="font-semibold">Transaction ID:</span> {donationData.transactionId}</p>
                </div>
              </div>
            )}

            <div className="bg-primary/5 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Your contribution will help us</p>
              <p className="text-base md:text-xl font-semibold text-primary">Create Lasting Impact in Communities</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleDownloadReceipt} 
                size="lg" 
                variant="outline"
                className="rounded-full px-6 md:px-8 h-11 md:h-12 text-sm md:text-base border-2"
              >
                Download Receipt
              </Button>
              <Button 
                onClick={() => {
                  setIsSuccess(false);
                  setDonationData(null);
                }} 
                size="lg" 
                className="rounded-full px-6 md:px-8 h-11 md:h-12 text-sm md:text-base"
              >
                Make Another Donation
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              Make a Difference Today
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
              Transform Lives Through Giving
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Every contribution creates ripples of positive change. Join us in building a better tomorrow for communities in need.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12">
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">80G Tax Benefits</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="font-medium">100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Your Impact at Every Level</h2>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {impactData.map((impact) => {
                  const Icon = impact.icon;
                  return (
                    <div
                      key={impact.amount}
                      className="group relative bg-white dark:bg-gray-950 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-800 w-[280px] flex-shrink-0"
                    >
                      <div className={cn(
                        "absolute inset-0 rounded-2xl opacity-10 bg-gradient-to-br",
                        impact.color
                      )}></div>
                      <div className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 relative z-10",
                        impact.color
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold mb-2 relative z-10">₹{impact.amount.toLocaleString("en-IN")}</div>
                      <h3 className="font-semibold mb-2 relative z-10">{impact.title}</h3>
                      <p className="text-sm text-muted-foreground relative z-10">{impact.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactData.map((impact) => {
                const Icon = impact.icon;
                return (
                  <div
                    key={impact.amount}
                    className="group relative bg-white dark:bg-gray-950 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:scale-105"
                  >
                    <div className={cn(
                      "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br",
                      impact.color
                    )}></div>
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                      impact.color
                    )}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-2">₹{impact.amount.toLocaleString("en-IN")}</div>
                    <h3 className="font-semibold mb-2">{impact.title}</h3>
                    <p className="text-sm text-muted-foreground">{impact.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-8 md:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-950 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 border border-gray-200 dark:border-gray-800">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Complete Your Donation</h2>
                <p className="text-sm md:text-base text-muted-foreground">All donations are secure and tax-deductible under 80G</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Amount Selection */}
                <div className="space-y-4">
                  <Label className="text-base md:text-lg font-semibold">Choose Your Contribution</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handleAmountSelect(amount)}
                        className={cn(
                          "relative h-16 md:h-20 rounded-lg md:rounded-xl font-semibold text-base md:text-lg transition-all duration-300",
                          selectedAmount === amount
                            ? "bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg scale-105"
                            : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 border-2 border-transparent hover:border-primary/50"
                        )}
                      >
                        ₹{amount.toLocaleString("en-IN")}
                        {selectedAmount === amount && (
                          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white dark:bg-gray-950 rounded-full p-0.5 md:p-1">
                            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-3 md:px-4 bg-white dark:bg-gray-950 text-muted-foreground">or enter custom amount</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="customAmount"
                      type="number"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      placeholder="Enter custom amount (min ₹100)"
                      min="100"
                      className="h-12 md:h-14 text-base md:text-lg rounded-lg md:rounded-xl"
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="font-medium">{errors.amount.message}</span>
                    </p>
                  )}
                </div>

                {/* Donor Details */}
                <div className="space-y-4 md:space-y-5 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <Label className="text-base md:text-lg font-semibold">Your Information</Label>
                  
                  <div className="space-y-2">
                    <Label htmlFor="donorName" className="text-sm md:text-base">Full Name *</Label>
                    <Input
                      id="donorName"
                      {...register("donorName")}
                      placeholder="Enter your full name"
                      className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                    />
                    {errors.donorName && (
                      <p className="text-xs md:text-sm text-destructive">{errors.donorName.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm md:text-base">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                      />
                      {errors.email && (
                        <p className="text-xs md:text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm md:text-base">Phone Number *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="9876543210"
                        className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                      />
                      {errors.phone && (
                        <p className="text-xs md:text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm md:text-base">
                      <span>PAN Number</span>
                      <span className="text-xs text-muted-foreground font-normal">(Optional - Required for 80G tax certificate)</span>
                    </Label>
                    <Input
                      id="pan"
                      {...register("pan")}
                      placeholder="ABCDE1234F"
                      className="h-11 md:h-12 rounded-lg md:rounded-xl text-sm md:text-base"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 md:h-14 text-base md:text-lg rounded-lg md:rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isProcessing || (!selectedAmount && !customAmount)}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 md:h-5 md:w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Processing Payment...</span>
                      <span className="sm:hidden">Processing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Heart className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="hidden sm:inline">Proceed to Secure Payment</span>
                      <span className="sm:hidden">Proceed to Payment</span>
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground text-center">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Secure payment powered by Razorpay • UPI, Cards & Net Banking accepted</span>
                  <span className="sm:hidden">Secure payment by Razorpay</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 md:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Every Contribution Matters</h2>
            <p className="text-sm md:text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join thousands of donors who are making a real difference. Together, we can create lasting change and build stronger communities.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">10,000+</div>
                <div className="opacity-90">Lives Impacted</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">500+</div>
                <div className="opacity-90">Active Donors</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
                <div className="opacity-90">Communities Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
