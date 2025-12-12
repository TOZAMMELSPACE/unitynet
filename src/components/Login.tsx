import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { User } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, LogIn, Eye, EyeOff, FileText, Shield, Users, Scale, Lock, Heart, AlertTriangle, Phone, Globe, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface LoginProps {
  users: User[];
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
}

// Signup schema with email
const signupSchema = z.object({
  fullName: z.string().min(2, "নাম দিন"),
  email: z.string().email("সঠিক ইমেইল দিন"),
  phone: z.string().optional(),
  password: z.string().min(6, "কমপক্ষে ৬ অক্ষর"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "পাসওয়ার্ড মিলছে না",
  path: ["confirmPassword"],
});

// Login schema
const loginSchema = z.object({
  email: z.string().email("সঠিক ইমেইল দিন"),
  password: z.string().min(1, "পাসওয়ার্ড দিন"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export const Login = ({ users, onLogin, onRegister }: LoginProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const termsContent = [
    { icon: FileText, title: "সেবার শর্তাবলী", titleEn: "Terms of Service", content: "UnityNets প্ল্যাটফর্ম ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। এটি একটি সম্প্রদায়-ভিত্তিক প্ল্যাটফর্ম যেখানে সদস্যরা পারস্পরিক সহযোগিতার মাধ্যমে সেবা আদান-প্রদান করে।" },
    { icon: Shield, title: "গোপনীয়তা নীতি", titleEn: "Privacy Policy", content: "আপনার ব্যক্তিগত তথ্য সুরক্ষিত থাকবে। আমরা আপনার তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না। শুধুমাত্র প্ল্যাটফর্ম পরিচালনার জন্য প্রয়োজনীয় তথ্য সংগ্রহ করা হয়।" },
    { icon: Users, title: "সম্প্রদায় নির্দেশিকা", titleEn: "Community Guidelines", content: "সকল সদস্যকে সম্মান করুন। হয়রানি, ঘৃণামূলক বক্তব্য, বা অবৈধ কার্যকলাপ সম্পূর্ণ নিষিদ্ধ। ইতিবাচক এবং সহায়ক পরিবেশ বজায় রাখুন।" },
    { icon: Scale, title: "Unity Note নীতি", titleEn: "Unity Note Policy", content: "১ ঘণ্টা সেবা = ১ Unity Note। এই সময়-ভিত্তিক মুদ্রা ব্যবস্থা সকলের সময়ের সমান মূল্য নিশ্চিত করে। Unity Note শুধুমাত্র প্ল্যাটফর্মের মধ্যে ব্যবহারযোগ্য।" },
    { icon: Lock, title: "নিরাপত্তা", titleEn: "Security", content: "আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন। সন্দেহজনক কার্যকলাপ রিপোর্ট করুন। অন্যের সাথে পাসওয়ার্ড শেয়ার করবেন না।" },
    { icon: Heart, title: "সেবা মান", titleEn: "Service Quality", content: "প্রতিশ্রুত সেবা সততার সাথে প্রদান করুন। মানসম্মত কাজ করুন। সময়মতো সেবা দিন এবং প্রয়োজনে যোগাযোগ বজায় রাখুন।" },
    { icon: AlertTriangle, title: "বিরোধ নিষ্পত্তি", titleEn: "Dispute Resolution", content: "কোনো সমস্যা হলে প্রথমে পারস্পরিক আলোচনায় সমাধান করুন। সমাধান না হলে প্ল্যাটফর্ম সহায়তা টিমের সাথে যোগাযোগ করুন।" },
    { icon: Phone, title: "যোগাযোগ", titleEn: "Contact", content: "যেকোনো প্রশ্ন বা সমস্যায় আমাদের সাথে যোগাযোগ করুন: support@unitynets.com। আমরা ২৪-৪৮ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।" },
  ];

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: data.fullName.trim(),
            phone: data.phone || '',
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: t("Error", "ত্রুটি"),
            description: t("This email is already registered", "এই ইমেইল ইতিমধ্যে নিবন্ধিত"),
            variant: "destructive"
          });
        } else {
          toast({
            title: t("Error", "ত্রুটি"),
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }

      toast({
        title: t("Welcome! 🎉", "স্বাগতম! 🎉"),
        description: t("Your account has been created", "আপনার একাউন্ট তৈরি হয়েছে")
      });
      
    } catch (error) {
      toast({
        title: t("Error", "ত্রুটি"),
        description: t("Failed to create account", "একাউন্ট তৈরিতে সমস্যা হয়েছে"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: t("Error", "ত্রুটি"),
          description: t("Invalid email or password", "ইমেইল বা পাসওয়ার্ড ভুল"),
          variant: "destructive"
        });
        return;
      }

      toast({
        title: t("Welcome!", "স্বাগতম!"),
        description: t("You have successfully logged in", "আপনি সফলভাবে লগইন করেছেন")
      });
      
    } catch (error) {
      toast({
        title: t("Error", "ত্রুটি"),
        description: t("Login failed", "লগইন ব্যর্থ হয়েছে"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium">
              {language === "en" ? "বাংলা" : "English"}
            </span>
          </Button>
        </div>

        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">U</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            UnityNets
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("Together We Are Strong", "একত্রে শক্তিশালী")}
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {/* Tab Switch */}
            <div className="flex mb-6 bg-muted rounded-lg p-1">
              <button
                type="button"
                onClick={() => setIsRegistering(false)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                  !isRegistering 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t("Login", "লগইন")}
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(true)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                  isRegistering 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t("Register", "নিবন্ধন")}
              </button>
            </div>

            {isRegistering ? (
              /* Signup Form */
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    {t("Your Name", "আপনার নাম")}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t("Enter full name", "সম্পূর্ণ নাম লিখুন")}
                    className="h-11"
                    {...signupForm.register("fullName")}
                  />
                  {signupForm.formState.errors.fullName && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("Email", "ইমেইল")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("your@email.com", "আপনার@ইমেইল.com")}
                      className="h-11 pl-10"
                      {...signupForm.register("email")}
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    {t("Mobile Number (Optional)", "মোবাইল নম্বর (ঐচ্ছিক)")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="h-11"
                    {...signupForm.register("phone")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t("Password", "পাসওয়ার্ড")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("At least 6 characters", "কমপক্ষে ৬ অক্ষর")}
                      className="h-11 pr-10"
                      {...signupForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    {t("Confirm Password", "পাসওয়ার্ড নিশ্চিত করুন")}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t("Re-enter password", "আবার পাসওয়ার্ড লিখুন")}
                    className="h-11"
                    {...signupForm.register("confirmPassword")}
                  />
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {signupForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full h-11" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <UserPlus className="w-4 h-4 mr-2" />
                  )}
                  {t("Register", "নিবন্ধন করুন")}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  {t("By registering you agree to our", "নিবন্ধন করে আপনি আমাদের")}{" "}
                  <button 
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    {t("Terms & Conditions", "শর্তাবলী")}
                  </button>{" "}
                  {t("", "মেনে নিচ্ছেন")}
                </p>
              </form>
            ) : (
              /* Login Form */
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="loginEmail" className="text-sm font-medium">
                    {t("Email", "ইমেইল")}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder={t("your@email.com", "আপনার@ইমেইল.com")}
                      className="h-11 pl-10"
                      {...loginForm.register("email")}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="loginPassword" className="text-sm font-medium">
                    {t("Password", "পাসওয়ার্ড")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("Your password", "আপনার পাসওয়ার্ড")}
                      className="h-11 pr-10"
                      {...loginForm.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => toast({ title: t("Coming Soon", "শীঘ্রই আসছে"), description: t("Password reset feature coming soon", "পাসওয়ার্ড রিসেট ফিচার শীঘ্রই আসছে") })}
                  >
                    {t("Forgot Password?", "পাসওয়ার্ড ভুলে গেছেন?")}
                  </button>
                </div>

                <Button type="submit" className="w-full h-11" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  {t("Login", "লগইন করুন")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Terms Dialog */}
        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <DialogContent className="max-w-lg max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {t("Terms & Conditions", "শর্তাবলী")}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {termsContent.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <section.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">
                        {language === "en" ? section.titleEn : section.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 UnityNets. {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
        </div>
      </div>
    </div>
  );
};
