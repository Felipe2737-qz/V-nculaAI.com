// Víncula Logo Component - V grande com 2 v menores de ponta cabeça

interface VinculaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { container: 'w-8 h-8', bigV: 'text-lg', smallV: 'text-[8px]', gap: '-top-0.5' },
  md: { container: 'w-10 h-10', bigV: 'text-xl', smallV: 'text-[9px]', gap: '-top-1' },
  lg: { container: 'w-14 h-14', bigV: 'text-2xl', smallV: 'text-[10px]', gap: '-top-1' },
  xl: { container: 'w-20 h-20', bigV: 'text-4xl', smallV: 'text-xs', gap: '-top-1.5' },
};

export function VinculaLogo({ size = 'md', showText = false, className = '' }: VinculaLogoProps) {
  const s = sizeMap[size];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${s.container} rounded-xl gradient-vincula flex flex-col items-center justify-center relative overflow-hidden`}>
        {/* Two small inverted v's on top */}
        <div className={`flex gap-0.5 ${s.gap} relative z-10`}>
          <span 
            className={`${s.smallV} font-bold text-primary-foreground/80 rotate-180 leading-none`}
            style={{ transform: 'rotate(180deg)' }}
          >
            v
          </span>
          <span 
            className={`${s.smallV} font-bold text-primary-foreground/80 rotate-180 leading-none`}
            style={{ transform: 'rotate(180deg)' }}
          >
            v
          </span>
        </div>
        {/* Big V */}
        <span className={`${s.bigV} font-bold text-primary-foreground leading-none -mt-1`}>
          V
        </span>
      </div>
      
      {showText && (
        <span className="text-xl font-bold gradient-vincula-text">Víncula</span>
      )}
    </div>
  );
}

export function VinculaLogoText({ className = '' }: { className?: string }) {
  return (
    <span className={`font-bold gradient-vincula-text ${className}`}>Víncula</span>
  );
}
