import { User } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  currentUser: User | null;
  onSignOut: () => void;
}

export const Header = ({ currentUser, onSignOut }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="card-enhanced p-6 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            UnityNet
          </h1>
          <p className="text-muted-foreground text-bengali font-medium">
            Trust • Learn • Unite
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-semibold text-bengali">{currentUser.name}</div>
                <div className="trust-score">
                  Trust: {Math.round(currentUser.trustScore)}
                </div>
              </div>
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg 
                          transition-smooth text-sm font-medium"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="text-muted-foreground">Not signed in</div>
          )}
        </div>
      </div>
    </header>
  );
};