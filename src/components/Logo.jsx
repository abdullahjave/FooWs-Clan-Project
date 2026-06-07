import { useState } from 'react';
import { Shield } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28',
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!imageError ? (
        <img 
          src="/foow-logo.png" 
          alt="FooW Clan Logo" 
          className={`${sizes[size]} object-contain transition-transform duration-300 hover:scale-110`}
          onError={handleImageError}
        />
      ) : (
        <div className={`${sizes[size]} flex items-center justify-center glass-card rounded-lg`}>
          <Shield className="w-2/3 h-2/3" style={{ color: 'var(--color-accent-blue)' }} />
        </div>
      )}
      {showText && (
        <span 
          className="text-xl font-bold" 
          style={{ 
            fontFamily: 'Cinzel, serif', 
            background: 'linear-gradient(to right, var(--color-accent-blue), var(--color-accent-silver))', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text' 
          }}
        >
          FooW Clan
        </span>
      )}
    </div>
  );
};

export default Logo;
