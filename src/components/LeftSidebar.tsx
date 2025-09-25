import { NavLink, useLocation } from "react-router-dom";
import { Home, Bell, User, MessageCircle, Search, Users, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", icon: Home, label: "Home", bengaliLabel: "হোম" },
  { path: "/explore", icon: Search, label: "Explore", bengaliLabel: "এক্সপ্লোর" },
  { path: "/notifications", icon: Bell, label: "Notifications", bengaliLabel: "নোটিফিকেশন" },
  { path: "/messages", icon: MessageCircle, label: "Messages", bengaliLabel: "মেসেজ" },
  { path: "/groups", icon: Users, label: "Groups", bengaliLabel: "গ্রুপ" },
  { path: "/profile", icon: User, label: "Profile", bengaliLabel: "প্রোফাইল" },
  { path: "/settings", icon: Settings, label: "Settings", bengaliLabel: "সেটিংস" },
];

interface LeftSidebarProps {
  onCreatePost?: () => void;
}

export const LeftSidebar = ({ onCreatePost }: LeftSidebarProps) => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              UnityNet
            </h1>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label, bengaliLabel }) => {
            const isActive = location.pathname === path;
            
            return (
              <NavLink
                key={path}
                to={path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/15 text-primary shadow-md border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon 
                  size={24} 
                  className={`${isActive ? "text-primary" : "group-hover:text-foreground"}`} 
                />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{label}</span>
                  <span className="text-xs text-bengali opacity-75">{bengaliLabel}</span>
                </div>
                {/* Notification indicator for Bell icon */}
                {path === "/notifications" && (
                  <div className="ml-auto w-2 h-2 bg-destructive rounded-full"></div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Create Post Button */}
        {onCreatePost && (
          <div className="mt-8">
            <Button
              onClick={onCreatePost}
              className="w-full btn-hero flex items-center justify-center gap-2 py-3 shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              <span className="font-semibold text-bengali">নতুন পোস্ট</span>
            </Button>
          </div>
        )}
      </div>

      {/* Bottom section with branding */}
      <div className="mt-auto p-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center text-bengali">
          Trust • Learn • Unite
        </p>
      </div>
    </aside>
  );
};