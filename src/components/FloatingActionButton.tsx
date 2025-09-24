import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  FileText, 
  Camera, 
  Video, 
  BarChart3, 
  Calendar, 
  Briefcase,
  X
} from "lucide-react";

interface FloatingActionButtonProps {
  onCreatePost: (type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'job') => void;
}

export const FloatingActionButton = ({ onCreatePost }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { type: 'text' as const, icon: FileText, label: 'টেক্সট', color: 'bg-primary hover:bg-primary/90' },
    { type: 'image' as const, icon: Camera, label: 'ছবি', color: 'bg-accent hover:bg-accent/90' },
    { type: 'video' as const, icon: Video, label: 'ভিডিও', color: 'bg-warning hover:bg-warning/90' },
    { type: 'poll' as const, icon: BarChart3, label: 'পোল', color: 'bg-success hover:bg-success/90' },
    { type: 'event' as const, icon: Calendar, label: 'ইভেন্ট', color: 'bg-secondary hover:bg-secondary/90' },
    { type: 'job' as const, icon: Briefcase, label: 'কাজ', color: 'bg-destructive hover:bg-destructive/90' },
  ];

  const handleActionClick = (type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'job') => {
    onCreatePost(type);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action) => (
          <Button
            key={action.type}
            onClick={() => handleActionClick(action.type)}
            className={`w-12 h-12 rounded-full shadow-lg ${action.color} text-white hover:scale-110 transition-all duration-200`}
            title={`${action.label} পোস্ট তৈরি করুন`}
          >
            <action.icon className="w-5 h-5" />
          </Button>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-destructive hover:bg-destructive/90 rotate-45' 
            : 'bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 -z-10" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};