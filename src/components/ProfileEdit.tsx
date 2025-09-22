import { useState, useRef } from "react";
import { User } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditProps {
  user: User;
  onUpdateProfile: (updatedUser: User) => void;
}

export const ProfileEdit = ({ user, onUpdateProfile }: ProfileEditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [nidMasked, setNidMasked] = useState(user.nidMasked);
  const [profileImage, setProfileImage] = useState(user.profileImage || "");
  const [imagePreview, setImagePreview] = useState(user.profileImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "ত্রুটি",
          description: "ছবির সাইজ ৫ MB এর বেশি হতে পারে না",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setProfileImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "ত্রুটি",
        description: "নাম খালি থাকতে পারে না",
        variant: "destructive",
      });
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "ত্রুটি",
        description: "সঠিক ইমেইল ঠিকানা দিন",
        variant: "destructive",
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim() || undefined,
      nidMasked: nidMasked.trim() || user.nidMasked,
      profileImage: profileImage || undefined,
    };

    onUpdateProfile(updatedUser);
    setIsOpen(false);
    toast({
      title: "সফল",
      description: "প্রোফাইল আপডেট করা হয়েছে",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit size={16} />
          সম্পাদনা
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-bengali">প্রোফাইল সম্পাদনা</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label className="text-bengali">প্রোফাইল ছবি</Label>
            <div className="flex items-center gap-4">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                      onClick={removeImage}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Camera size={16} />
                  ছবি নির্বাচন
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  সর্বোচ্চ ৫ MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-bengali">নাম</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="text-bengali"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-bengali">ইমেইল (ঐচ্ছিক)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          {/* NID */}
          <div className="space-y-2">
            <Label htmlFor="nid" className="text-bengali">NID (শেষের ৪ ডিজিট)</Label>
            <Input
              id="nid"
              value={nidMasked}
              onChange={(e) => setNidMasked(e.target.value)}
              placeholder="****1234"
              maxLength={8}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleSave}>
              সংরক্ষণ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};