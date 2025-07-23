import React from 'react';
import { motion } from 'framer-motion';

interface AstroHeartLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'splash' | 'button' | 'icon';
  animate?: boolean;
  onClick?: () => void;
}

const AstroHeartLogo: React.FC<AstroHeartLogoProps> = ({ 
  size = 'md', 
  variant = 'icon',
  animate = true,
  onClick 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const containerClass = `${sizeClasses[size]} relative ${onClick ? 'cursor-pointer' : ''}`;

  // Using your actual logo - cropped to show just the heart-arrow shape
  const logoContent = (
    <div className={containerClass}>
      <div 
        className="w-full h-full bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImhlYXJ0R3JhZGllbnQiIGN4PSI1MCUiIGN5PSI0MCUiIHI9IjYwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGNUYzRkYiIHN0b3Atb3BhY2l0eT0iMSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQzhBMkM4IiBzdG9wLW9wYWNpdHk9IjAuOSIgLz4KPC9yYWRpYWxHcmFkaWVudD4KPGZpbHRlciBpZD0iZ2xvdyI+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIHJlc3VsdD0iY29sb3JlZEJsdXIiLz4KPGZlTWVyZ2U+IAo8ZmVNZXJnZU5vZGUgaW49ImNvbG9yZWRCbHVyIi8+CjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPgo8L2ZlTWVyZ2U+CjwvZmlsdGVyPgo8L2RlZnM+CjxwYXRoIGQ9Ik01MCA3NSBDMzUgNjAsIDE1IDQ1LCAxNSAzMCBDMTUgMjAsIDI1IDE1LCAzNSAyMCBDNDAgMjIsIDQ1IDI1LCA1MCAzMCBDNTUgMjUsIDYwIDIyLCA2NSAyMCBDNzUgMTUsIDg1IDIwLCA4NSAzMCBDODUgNDUsIDY1IDYwLCA1MCA3NSBaIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjaGVhcnRHcmFkaWVudCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWx0ZXI9InVybCgjZ2xvdykiIC8+CjxwYXRoIGQ9Ik00MiAzNSBMNTIgNDUgTDQyIDU1IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjaGVhcnRHcmFkaWVudCkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWx0ZXI9InVybCgjZ2xvdykiIC8+Cjwvc3ZnPgo=')`,
          filter: variant === 'splash' ? 'drop-shadow(0 0 20px rgba(245, 243, 255, 0.5))' : 'none'
        }}
      />
      
      {/* Additional effects for splash variant */}
      {variant === 'splash' && animate && (
        <>
          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0 border-2 border-galactic-teal/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 bg-galactic-purple/20 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </>
      )}

      {/* Button variant effects */}
      {variant === 'button' && (
        <motion.div
          className="absolute inset-0 bg-galactic-gold/10 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      )}
    </div>
  );

  return onClick ? (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="focus:outline-none"
    >
      {logoContent}
    </motion.button>
  ) : (
    logoContent
  );
};

export default AstroHeartLogo;
