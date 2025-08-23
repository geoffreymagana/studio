"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface HeartCanvasProps {
  onDrawSuccess: () => void;
  className?: string;
  width?: number;
  height?: number;
}

export function HeartCanvas({ 
  onDrawSuccess, 
  className, 
  width = 300, 
  height = 150 
}: HeartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Draw faint heart guide
    context.strokeStyle = "hsla(var(--accent) / 0.3)";
    context.lineWidth = 2;
    context.beginPath();
    
    const x = width / 2;
    const y = height / 2.5;
    const heartWidth = width / 12;
    const heartHeight = height / 8;

    context.moveTo(x, y + heartHeight);
    context.bezierCurveTo(x + heartWidth, y - heartHeight, x + (4 * heartWidth), y, x, y + (3 * heartHeight));
    context.bezierCurveTo(x - (4 * heartWidth), y, x - heartWidth, y - heartHeight, x, y + heartHeight);

    context.stroke();
    context.closePath();

  }, [width, height]);
  
  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent && e.nativeEvent.touches.length > 0) {
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e.nativeEvent) { // MouseEvent
        return {
            x: e.nativeEvent.clientX - rect.left,
            y: e.nativeEvent.clientY - rect.top
        };
    }
    return {
        x: 'offsetX' in e.nativeEvent ? e.nativeEvent.offsetX : 0,
        y: 'offsetY' in e.nativeEvent ? e.nativeEvent.offsetY : 0,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isComplete) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    
    setIsDrawing(true);
    const coords = getCoords(e);
    context.beginPath();
    context.moveTo(coords.x, coords.y);
    context.lineWidth = 4;
    context.strokeStyle = "hsl(var(--accent))";
    context.lineCap = 'round';
    context.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isComplete) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    
    const coords = getCoords(e);
    context.lineTo(coords.x, coords.y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;

    // Simple check: for this demo, any drawing is a success
    setIsComplete(true);
    onDrawSuccess();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className={cn(
        "rounded-md border-2 border-dashed bg-muted/50 w-full touch-none",
        isComplete && "border-accent",
        className
      )}
    />
  );
}
