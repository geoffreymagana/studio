"use client";

import React, { useState, useEffect, useMemo } from 'react';

type CSSPropertiesWithCustomVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 20 }) => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: count }, (_, i) => i + 1));
  }, [count]);

  const heartElements = useMemo(() => {
    return hearts.map((id) => {
      const randomX = Math.random() * 100;
      const randomSize = Math.random() * 20 + 15; // 15-35px
      const randomDelay = Math.random() * 2;
      const randomDuration = Math.random() * 2 + 3; // 3-5s
      const randomSway = Math.random() * 30 - 15; // -15 to 15px sway

      const style: CSSPropertiesWithCustomVars = {
        left: `${randomX}%`,
        '--randomSize': randomSize,
        '--randomDelay': randomDelay,
        '--randomDuration': randomDuration,
        '--randomSway': randomSway,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
      };

      return (
        <div 
          key={id} 
          className="absolute bottom-0 floating-heart-tiktok pointer-events-none" 
          style={style}
        >
          <img 
            src="https://img.icons8.com/pulsar-color/48/like.png" 
            alt="heart"
            width={randomSize}
            height={randomSize}
            className="drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          />
        </div>
      );
    });
  }, [hearts]);

  return <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">{heartElements}</div>;
};

export default FloatingHearts;
