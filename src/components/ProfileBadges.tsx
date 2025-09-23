import { Award, Shield, Star, Trophy, Zap, Heart, Users, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProfileBadgesProps {
  achievements: string[];
  trustScore: number;
  isVerified: boolean;
}

export const ProfileBadges = ({ achievements, trustScore, isVerified }: ProfileBadgesProps) => {
  const badgeConfig = {
    'top_contributor': { icon: Trophy, label: 'টপ কন্ট্রিবিউটর', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    'verified_educator': { icon: Award, label: 'ভেরিফাইড এডুকেটর', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
    'popular_creator': { icon: Star, label: 'পপুলার ক্রিয়েটর', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    'trusted_member': { icon: Shield, label: 'ট্রাস্টেড মেম্বার', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    'community_leader': { icon: Users, label: 'কমিউনিটি লিডার', color: 'bg-gradient-to-r from-purple-500 to-violet-500' },
    'early_adopter': { icon: Zap, label: 'আর্লি অ্যাডপ্টার', color: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    'helpful_member': { icon: Heart, label: 'সহায়ক সদস্য', color: 'bg-gradient-to-r from-red-500 to-pink-500' }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-bengali">অ্যাচিভমেন্ট</h3>
        {isVerified && (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle className="w-3 h-3 text-primary" />
            <span className="text-bengali text-xs">ভেরিফাইড</span>
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {achievements.map((achievement, index) => {
          const config = badgeConfig[achievement as keyof typeof badgeConfig];
          if (!config) return null;
          
          const Icon = config.icon;
          return (
            <Badge key={index} className={`${config.color} text-white border-none gap-1`}>
              <Icon className="w-3 h-3" />
              <span className="text-bengali text-xs">{config.label}</span>
            </Badge>
          );
        })}
        
        {trustScore >= 80 && (
          <Badge className="bg-gradient-to-r from-accent to-accent-glow text-white border-none gap-1">
            <Award className="w-3 h-3" />
            <span className="text-bengali text-xs">হাই ট্রাস্ট</span>
          </Badge>
        )}
      </div>
      
      {achievements.length === 0 && (
        <p className="text-sm text-muted-foreground text-bengali">
          কমিউনিটিতে অংশগ্রহণ করুন এবং ব্যাজ অর্জন করুন
        </p>
      )}
    </div>
  );
};