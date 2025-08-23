"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Heart } from 'lucide-react';

interface HeartStyle extends React.CSSProperties {
  '--randomX': number;
  '--randomY': number;
}

const FloatingHearts = ({ count = 20 }) => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: count }, (_, i) => i + 1));
  }, [count]);

  const heartElements = useMemo(() => {
    return hearts.map((id) => {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 3}s`,
        animationDelay: `${Math.random() * 2}s`,
      };
      const size = Math.random() * 20 + 10;
      const color = `hsl(337, 100%, ${Math.random() * 15 + 70}%)`;

      return (
        <div key={id} className="absolute bottom-0 floating-heart" style={style}>
          <Heart width={size} height={size} className="text-accent" fill={color} strokeWidth={1} />
        </div>
      );
    });
  }, [hearts]);

  return <div className="absolute inset-0 pointer-events-none w-full h-full">{heartElements}</div>;
};

export default FloatingHearts;
