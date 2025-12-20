import { useEffect, useRef } from 'react';

interface EzoicAdProps {
  placeholderId: number;
  className?: string;
}

declare global {
  interface Window {
    ezstandalone: {
      cmd: Array<() => void>;
      showAds: (id: number) => void;
    };
  }
}

const EzoicAd = ({ placeholderId, className = '' }: EzoicAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;
    
    try {
      if (typeof window !== 'undefined' && window.ezstandalone) {
        window.ezstandalone.cmd.push(function() {
          window.ezstandalone.showAds(placeholderId);
        });
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('Ezoic error:', error);
    }
  }, [placeholderId]);

  return (
    <div className={`ezoic-container ${className}`}>
      <div 
        ref={adRef}
        id={`ezoic-pub-ad-placeholder-${placeholderId}`}
      />
    </div>
  );
};

export default EzoicAd;
