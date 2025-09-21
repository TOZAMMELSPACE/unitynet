import { useState } from "react";
import { User } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditProps {
  user: User;
  onUpdateProfile: (updatedUser: User) => void;
}

export const ProfileEdit = ({ user, onUpdateProfile }: ProfileEditProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [nidMasked, setNidMasked] = useState(user.nidMasked);
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "ত্রুটি",
        description: "নাম খালি থাকতে পারে না",
        variant: "destructive",
      });
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      nidMasked: nidMasked.trim() || user.nidMasked,
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