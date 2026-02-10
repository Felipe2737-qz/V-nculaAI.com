interface VinculaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { container: 'w-8 h-8', svg: 28 },
  md: { container: 'w-10 h-10', svg: 36 },
  lg: { container: 'w-14 h-14', svg: 50 },
  xl: { container: 'w-20 h-20', svg: 72 },
};

export function VinculaLogo({ size = 'md', showText = false, className = '' }: VinculaLogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${s.container} rounded-xl gradient-vincula flex items-center justify-center relative overflow-hidden`}>
        {/* Heart-shaped V logo: big V with two small inverted v's on top forming a heart */}
        <svg
          width={s.svg}
          height={s.svg}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left small inverted v - forms left lobe of heart */}
          <path
            d="M22 28 L36 12 L50 28"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
          {/* Right small inverted v - forms right lobe of heart */}
          <path
            d="M50 28 L64 12 L78 28"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
          {/* Big V - forms bottom of heart */}
          <path
            d="M22 28 L50 88 L78 28"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
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
