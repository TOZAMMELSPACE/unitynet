import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      title={t("Switch to Bengali", "ইংরেজিতে পরিবর্তন করুন")}
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-medium">
        {language === "en" ? "বাংলা" : "English"}
      </span>
    </Button>
  );
}
