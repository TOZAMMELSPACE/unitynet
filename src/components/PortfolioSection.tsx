import { ExternalLink, Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PortfolioItem } from "@/lib/storage";

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
  isOwnProfile: boolean;
  onAddItem?: () => void;
  onEditItem?: (item: PortfolioItem) => void;
  onDeleteItem?: (itemId: string) => void;
}

export const PortfolioSection = ({ 
  portfolioItems, 
  isOwnProfile, 
  onAddItem, 
  onEditItem, 
  onDeleteItem 
}: PortfolioSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-bengali">পোর্টফোলিও</h3>
        {isOwnProfile && (
          <Button variant="outline" size="sm" onClick={onAddItem} className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="text-bengali">যোগ করুন</span>
          </Button>
        )}
      </div>

      {portfolioItems.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-bengali">
              {isOwnProfile ? "আপনার কাজের নমুনা যোগ করুন" : "এখনও কোনো কাজের নমুনা নেই"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="card-enhanced overflow-hidden">
              {item.image && (
                <div className="aspect-video bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-semibold text-bengali">
                    {item.title}
                  </CardTitle>
                  {isOwnProfile && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditItem?.(item)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteItem?.(item.id)}
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground text-bengali mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {item.url && (
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                      <span className="text-bengali">দেখুন</span>
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};