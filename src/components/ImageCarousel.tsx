import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalImages = images.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle touch events for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  const openFullscreen = (imageUrl: string) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm';
    overlay.onclick = () => overlay.remove();
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl';
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  };

  if (totalImages === 0) return null;

  // Single image - no carousel needed
  if (totalImages === 1) {
    return (
      <div className={cn("rounded-xl overflow-hidden", className)}>
        <img
          src={images[0]}
          alt="Post image"
          className="w-full max-h-[400px] object-cover cursor-pointer hover:brightness-95 transition-all"
          onClick={() => openFullscreen(images[0])}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-xl overflow-hidden group", className)}>
      {/* Main Image Container */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-muted"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1} of ${totalImages}`}
          className="w-full h-full object-contain cursor-pointer transition-transform duration-300"
          onClick={() => openFullscreen(images[currentIndex])}
        />

        {/* Image Counter Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-medium">
          {currentIndex + 1} / {totalImages}
        </div>

        {/* Navigation Arrows - Desktop */}
        {totalImages > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {totalImages > 1 && totalImages <= 10 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "bg-white w-4" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
            />
          ))}
        </div>
      )}

      {/* Progress Bar for many images */}
      {totalImages > 10 && (
        <div className="absolute bottom-3 left-4 right-4">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Thumbnail Preview Strip */}
      {totalImages > 1 && totalImages <= 10 && (
        <div className="flex gap-1 p-2 bg-muted/50 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-all",
                index === currentIndex 
                  ? "border-primary ring-2 ring-primary/30" 
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              onClick={() => goToSlide(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
