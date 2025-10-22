import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface ProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProposalDialog({ open, onOpenChange }: ProposalDialogProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    country: "",
    category: "",
    impact: "",
    unityReward: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.country || !formData.category) {
      toast.error(t("Please fill all required fields", "সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন"));
      return;
    }

    // Submit logic here
    toast.success(t(
      "Proposal submitted successfully! It will be reviewed by the community.",
      "প্রস্তাব সফলভাবে জমা দেওয়া হয়েছে! এটি কমিউনিটি দ্বারা পর্যালোচনা করা হবে।"
    ));
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      country: "",
      category: "",
      impact: "",
      unityReward: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("Submit New Proposal", "নতুন প্রস্তাব জমা দিন")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">
              {t("Title", "শিরোনাম")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t("Enter proposal title...", "প্রস্তাবের শিরোনাম লিখুন...")}
            />
          </div>

          <div>
            <Label htmlFor="description">
              {t("Description", "বিবরণ")} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t("Describe your proposal...", "আপনার প্রস্তাব বর্ণনা করুন...")}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">
                {t("Country/Region", "দেশ/অঞ্চল")} <span className="text-destructive">*</span>
              </Label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">{t("Select...", "নির্বাচন করুন...")}</option>
                <option value="Global">{t("Global", "বৈশ্বিক")}</option>
                <option value="Bangladesh">{t("Bangladesh", "বাংলাদেশ")}</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
              </select>
            </div>

            <div>
              <Label htmlFor="category">
                {t("Category", "বিভাগ")} <span className="text-destructive">*</span>
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="">{t("Select...", "নির্বাচন করুন...")}</option>
                <option value="Environment">{t("Environment", "পরিবেশ")}</option>
                <option value="Health">{t("Health", "স্বাস্থ্য")}</option>
                <option value="Education">{t("Education", "শিক্ষা")}</option>
                <option value="Economy">{t("Economy", "অর্থনীতি")}</option>
                <option value="Technology">{t("Technology", "প্রযুক্তি")}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="impact">
                {t("Expected Impact", "প্রত্যাশিত প্রভাব")}
              </Label>
              <Input
                id="impact"
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                placeholder={t("e.g., 1M people", "যেমন, ১০ লক্ষ মানুষ")}
              />
            </div>

            <div>
              <Label htmlFor="unityReward">
                {t("Suggested Unity Note Reward", "প্রস্তাবিত ইউনিটি নোট পুরস্কার")}
              </Label>
              <Input
                id="unityReward"
                type="number"
                value={formData.unityReward}
                onChange={(e) => setFormData({ ...formData, unityReward: e.target.value })}
                placeholder="5"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel", "বাতিল")}
            </Button>
            <Button type="submit">
              {t("Submit Proposal", "প্রস্তাব জমা দিন")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
