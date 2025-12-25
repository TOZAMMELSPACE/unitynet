import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Heart, Globe, Users, Target, Sparkles, BookOpen, Shield, Briefcase, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import founderImage from "@/assets/founder.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section with Founder Story */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-bengali leading-tight">
                একটা স্বপ্ন ছিল...
              </h1>
              <p className="text-xl text-muted-foreground text-bengali">
                যেভাবে শুরু হলো UnityNet-এর যাত্রা
              </p>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Founder Image & Intro */}
              <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
                <div className="relative">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={founderImage} 
                      alt="UnityNet Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg">
                    <span className="text-bengali font-semibold">প্রতিষ্ঠাতা</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    <span className="text-bengali">আমার গল্প</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-bengali leading-relaxed">
                    ৫ বছর। পুরো ৫ বছর ধরে কম্পিউটার অপারেটরের চাকরি করছি।
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-bengali text-lg">
                    ১.৬ বছর আগে স্বপ্ন নিয়ে ঢাকায় এসেছিলাম। ভেবেছিলাম হয়তো এখানে কিছু হবে। কিছু একটা বদলাবে।
                  </p>
                </div>
              </div>

              {/* The Reality */}
              <div className="bg-card border border-border/30 rounded-2xl p-8 md:p-10 mb-12">
                <h3 className="text-xl font-bold text-foreground mb-4 text-bengali flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  বাস্তবতা অন্যরকম
                </h3>
                <p className="text-muted-foreground leading-relaxed text-bengali text-lg mb-6">
                  সকাল ১০টা থেকে রাত ৯টা। প্রতিদিন। একই রুটিন। একই চেহারা। একই স্বপ্নহীন দিন। 
                  কখনো কখনো মনে হয়, আমি হারিয়ে যাচ্ছি এই ভিড়ে। হারিয়ে যাচ্ছে সেই স্বপ্নগুলো, 
                  যেগুলো একদিন চোখে জ্বলত।
                </p>
                <p className="text-primary font-semibold text-bengali text-xl">
                  কিন্তু না। আমি থেমে যাইনি।
                </p>
              </div>

              {/* The Dream */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-bengali">সেই স্বপ্নটা এখনো আছে...</span>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-bengali text-lg mb-6">
                    মনে আছে, একসময় স্বপ্ন দেখতাম একটা ভিন্ন পৃথিবীর। এমন একটা জায়গার, যেখানে 
                    মানুষ মানুষের জন্য সময় দেবে। যেখানে বিশ্বাস আছে, ভালোবাসা আছে, সহানুভূতি আছে।
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed text-bengali text-lg mb-6">
                    এমন একটা প্ল্যাটফর্মের, যেটা আজকের দিনের সোশ্যাল মিডিয়ার মতো বিষাক্ত হবে না। যেখানে:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <p className="text-foreground text-bengali">নেগেটিভিটির বদলে থাকবে <strong>পজিটিভিটি</strong></p>
                    </div>
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
                      <p className="text-foreground text-bengali">হিংসার বদলে থাকবে <strong>ভালোবাসা</strong></p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                      <p className="text-foreground text-bengali">ঘৃণার বদলে থাকবে <strong>সহযোগিতা</strong></p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                      <p className="text-foreground text-bengali">ক্রিন্জ কনটেন্টের বদলে থাকবে <strong>জ্ঞান ও সৃষ্টিশীলতা</strong></p>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed text-bengali text-lg font-medium">
                    এমন একটা জায়গা, যেখানে ভালো মানুষ আরও ভালো হবে। আর যারা খারাপ পথে হাঁটছে, 
                    তারাও এসে একটু একটু করে বদলে যাবে। ভালো হবে।
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed text-bengali text-lg mt-6">
                    মানুষের প্রতি মানুষের বিশ্বাস ফিরে আসবে। নৈতিকতা বাড়বে। সমাজ একটু একটু করে সুন্দর হবে। 
                    এই স্বপ্নটা আমার বুকে জ্বলত। প্রতিদিন।
                  </p>
                </div>
              </div>

              {/* The Decision */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 md:p-10 mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-bengali">
                  তারপর একদিন...
                </h3>
                <p className="text-foreground leading-relaxed text-bengali text-lg mb-6">
                  সিদ্ধান্ত নিলাম - শুধু স্বপ্ন দেখে কী হবে? কাজের ফাঁকে ফাঁকে, রাতের পর রাত জেগে, 
                  ক্লান্ত শরীর নিয়ে - শুরু করলাম কাজ।
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4">
                    <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-bengali">কোনো টিম নেই</p>
                  </div>
                  <div className="text-center p-4">
                    <span className="text-3xl mb-2 block">💰</span>
                    <p className="text-muted-foreground text-bengali">কোনো ফান্ডিং নেই</p>
                  </div>
                  <div className="text-center p-4">
                    <Globe className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-bengali">কোনো বড় কানেকশন নেই</p>
                  </div>
                </div>
                <p className="text-primary font-bold text-bengali text-xl text-center">
                  কিন্তু আছে একটা স্বপ্ন। আর সেই স্বপ্নকে সত্যি করার জেদ।
                </p>
              </div>

              {/* UnityNet Introduction */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-bengali">
                  আর তাই, ধীরে ধীরে তৈরি করে ফেলেছি —
                </h2>
                <p className="text-5xl md:text-6xl font-bold text-primary mb-8">
                  UnityNet
                </p>
              </div>

              {/* Features */}
              <div className="mb-16">
                <h3 className="text-xl font-semibold text-foreground mb-8 text-center text-bengali">
                  একটা প্ল্যাটফর্ম যেখানে:
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">স্থানীয় সমস্যা রিপোর্ট</h4>
                    <p className="text-sm text-muted-foreground text-bengali">ওয়ার্ড বেসড সমস্যা রিপোর্টিং সিস্টেম</p>
                  </div>
                  
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">AI Learning Zone</h4>
                    <p className="text-sm text-muted-foreground text-bengali">নতুন স্কিল শিখুন AI-এর সাহায্যে</p>
                  </div>
                  
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">কমিউনিটি কানেক্ট</h4>
                    <p className="text-sm text-muted-foreground text-bengali">আপনার এলাকার মানুষদের সাথে যুক্ত হন</p>
                  </div>
                  
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">ট্রাস্ট স্কোর</h4>
                    <p className="text-sm text-muted-foreground text-bengali">বিশ্বস্ত মানুষ খুঁজে পান সহজেই</p>
                  </div>
                  
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">চাকরির সুযোগ</h4>
                    <p className="text-sm text-muted-foreground text-bengali">লোকাল জব বোর্ড ও সুযোগ</p>
                  </div>
                  
                  <div className="bg-card border border-border/30 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-bengali">ইভেন্ট</h4>
                    <p className="text-sm text-muted-foreground text-bengali">স্থানীয় ইভেন্ট ও অনুষ্ঠান</p>
                  </div>
                </div>
                
                <p className="text-center text-muted-foreground mt-8 text-bengali text-lg">
                  মানে একটা সম্পূর্ণ ইকোসিস্টেম — শুধু আপনার কমিউনিটির জন্য।
                </p>
              </div>

              {/* Why */}
              <div className="bg-card border border-border/30 rounded-2xl p-8 md:p-10 mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-bengali">
                  কেন বানালাম?
                </h3>
                <p className="text-muted-foreground leading-relaxed text-bengali text-lg mb-6">
                  কারণ আমার মতো হাজারো মানুষ আছে — যারা আটকে আছে। যাদের স্বপ্ন আছে কিন্তু পথ নেই।
                </p>
                <p className="text-foreground leading-relaxed text-bengali text-lg">
                  <strong>সত্যি কথা?</strong> আমি জানি না এটা সফল হবে কিনা। আমার কাছে টাকা নেই, টিম নেই, কানেকশন নেই। 
                  <span className="text-primary font-bold"> কিন্তু হাল ছাড়িনি।</span>
                </p>
              </div>

              {/* Call for Help */}
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-bengali">
                  এই পোস্টটা লিখছি কারণ:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-foreground text-bengali">হয়তো কোনো <strong>ইনভেস্টর</strong> দেখবে</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-foreground text-bengali">হয়তো কোনো <strong>মেন্টর</strong> সাহায্য করবে</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-foreground text-bengali">হয়তো কেউ <strong>টিমে জয়েন</strong> করবে</p>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-foreground text-bengali">অথবা হয়তো আমার মতো আরেকজন বুঝবে — <strong>সে একা নয়</strong></p>
                  </div>
                </div>
                <p className="text-foreground text-bengali text-lg mb-8">
                  আমি জানি না এই পোস্ট কতজন দেখবে। কিন্তু যদি একজনও দেখে এবং মনে করে 
                  <span className="text-primary font-bold"> "আমিও পারি"</span> — তাহলেই জিতে গেছি।
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" onClick={() => navigate('/', { state: { showSignup: true } })}>
                    <span className="text-bengali">আজই যোগ দিন</span>
                  </Button>
                  <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="text-bengali">যোগাযোগ করুন</span>
                  </Button>
                </div>
              </div>

              {/* Final Message */}
              <div className="text-center">
                <p className="text-xl text-muted-foreground text-bengali">
                  আর যদি কেউ সাহায্য করতে চায় — <span className="text-primary font-semibold">আমার DM খোলা আছে।</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
