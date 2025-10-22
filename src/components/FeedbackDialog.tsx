import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guideline: any;
}

export function FeedbackDialog({ open, onOpenChange, guideline }: FeedbackDialogProps) {
  const { t, language } = useLanguage();
  const [feedback, setFeedback] = useState("");
  const [implementationPlan, setImplementationPlan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback) {
      toast.error(t("Please provide your feedback", "আপনার মতামত প্রদান করুন"));
      return;
    }

    toast.success(t(
      "Feedback submitted successfully!",
      "মতামত সফলভাবে জমা দেওয়া হয়েছে!"
    ));
    
    setFeedback("");
    setImplementationPlan("");
    onOpenChange(false);
  };

  if (!guideline) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("Provide Feedback", "মতামত প্রদান করুন")}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">
            {language === 'bn' ? guideline.titleBn : guideline.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === 'bn' ? guideline.descriptionBn : guideline.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feedback">
              {t("Your Feedback", "আপনার মতামত")} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t(
                "Share your thoughts on this guideline...",
                "এই নির্দেশনা সম্পর্কে আপনার মতামত শেয়ার করুন..."
              )}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="implementation">
              {t("Implementation Plan (Optional)", "বাস্তবায়ন পরিকল্পনা (ঐচ্ছিক)")}
            </Label>
            <Textarea
              id="implementation"
              value={implementationPlan}
              onChange={(e) => setImplementationPlan(e.target.value)}
              placeholder={t(
                "How would you implement this guideline in your community?",
                "আপনি কীভাবে এই নির্দেশনা আপনার কমিউনিটিতে বাস্তবায়ন করবেন?"
              )}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("Cancel", "বাতিল")}
            </Button>
            <Button type="submit">
              {t("Submit Feedback", "মতামত জমা দিন")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
