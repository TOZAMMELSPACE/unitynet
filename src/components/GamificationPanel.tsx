import { useState } from "react";
import { User } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  Award,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";

interface GamificationPanelProps {
  user: User | null;
  users: User[];
}

export const GamificationPanel = ({ user, users }: GamificationPanelProps) => {
  const [showFollowers, setShowFollowers] = useState(false);
  
  if (!user) return null;

  // Calculate user stats
  const userRank = users
    .sort((a, b) => b.trustScore - a.trustScore)
    .findIndex(u => u.id === user.id) + 1;
  
  // Get followers list (mock data - in real app would come from database)
  const followersList = users
    .filter(u => u.id !== user.id)
    .slice(0, Math.min(user.followers, 10));

  const nextLevel = Math.ceil(user.trustScore / 20) * 20;
  const progressToNextLevel = ((user.trustScore % 20) / 20) * 100;
  
  // Mock streak data (in real app, this would come from user activity)
  const loginStreak = Math.floor(Math.random() * 15) + 1;
  const weeklyGoal = 100;
  const weeklyProgress = Math.min(user.trustScore % 100, weeklyGoal);

  const achievements = [
    { 
      id: 'first_post', 
      name: 'প্রথম পোস্ট', 
      icon: '🎯', 
      unlocked: true,
      description: 'আপনার প্রথম পোস্ট করেছেন'
    },
    { 
      id: 'trusted_member', 
      name: 'বিশ্বস্ত সদস্য', 
      icon: '🛡️', 
      unlocked: user.trustScore >= 50,
      description: '৫০+ ট্রাস্ট স্কোর অর্জন'
    },
    { 
      id: 'community_leader', 
      name: 'কমিউনিটি নেতা', 
      icon: '👑', 
      unlocked: user.trustScore >= 80,
      description: '৮০+ ট্রাস্ট স্কোর অর্জন'
    },
    { 
      id: 'popular_creator', 
      name: 'জনপ্রিয় ক্রিয়েটর', 
      icon: '⭐', 
      unlocked: user.followers >= 100,
      description: '১০০+ ফলোয়ার অর্জন'
    },
    { 
      id: 'helpful_member', 
      name: 'সহায়ক সদস্য', 
      icon: '🤝', 
      unlocked: user.trustScore >= 30,
      description: 'কমিউনিটিতে সাহায্য করেছেন'
    },
    { 
      id: 'early_adopter', 
      name: 'প্রাথমিক ব্যবহারকারী', 
      icon: '🚀', 
      unlocked: true,
      description: 'প্ল্যাটফর্মের প্রাথমিক সদস্য'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalAchievements = achievements.length;

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          আপনার অগ্রগতি
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Trust Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">ট্রাস্ট লেভেল</span>
            <span className="text-sm text-muted-foreground">
              {user.trustScore}/{nextLevel}
            </span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="w-3 h-3" />
            লেভেল {Math.floor(user.trustScore / 20) + 1}
          </div>
        </div>

        {/* Rank */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">কমিউনিটি র‍্যাঙ্ক</span>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            #{userRank}
          </Badge>
        </div>

        {/* Login Streak */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-warning/10 to-destructive/10 rounded-lg">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">লগইন স্ট্রিক</span>
          </div>
          <Badge variant="secondary" className="bg-warning/20 text-warning">
            {loginStreak} দিন
          </Badge>
        </div>

        {/* Weekly Goal */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">সাপ্তাহিক লক্ষ্য</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {weeklyProgress}/{weeklyGoal}
            </span>
          </div>
          <Progress value={(weeklyProgress / weeklyGoal) * 100} className="h-2" />
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">অর্জনসমূহ</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {unlockedAchievements.length}/{totalAchievements}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {achievements.slice(0, 6).map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-2 rounded-lg text-center transition-all ${
                  achievement.unlocked 
                    ? 'bg-success/10 border border-success/20' 
                    : 'bg-muted/20 border border-border opacity-50'
                }`}
                title={achievement.description}
              >
                <div className="text-lg mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium line-clamp-2">
                  {achievement.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
          <Button 
            variant="ghost" 
            className="h-auto p-3 flex flex-col items-center hover:bg-primary/5"
            onClick={() => setShowFollowers(true)}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">ফলোয়ার</span>
            </div>
            <div className="font-semibold">{user.followers}</div>
          </Button>
          <div className="text-center p-3">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">সদস্য হওয়ার তারিখ</span>
            </div>
            <div className="font-semibold text-xs">
              {new Date(user.joinDate).toLocaleDateString('bn-BD')}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Followers Dialog */}
      <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              ফলোয়ার ({user.followers})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {followersList.length > 0 ? (
              followersList.map((follower) => (
                <div 
                  key={follower.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {follower.profileImage ? (
                    <img 
                      src={follower.profileImage} 
                      alt={follower.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-semibold">
                      {follower.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{follower.name}</div>
                    <div className="text-xs text-muted-foreground">
                      @{follower.username}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(follower.trustScore)}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">এখনো কোনো ফলোয়ার নেই</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};