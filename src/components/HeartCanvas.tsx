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
    const topCurveHeight = height * 0.3;
    const bottomCurveHeight = height * 0.7;
    context.moveTo(width / 2, topCurveHeight);
    context.bezierCurveTo(width / 2, topCurveHeight, width / 2 - width / 4, topCurveHeight - topCurveHeight / 2, width/2 - width/4, topCurveHeight + topCurveHeight /2);
    context.bezierCurveTo(width/2-width/2, height, width/2, bottomCurveHeight, width/2, height);
    context.bezierCurveTo(width/2, bottomCurveHeight, width/2+width/2, height, width/2+width/4, topCurveHeight + topCurveHeight /2);
    context.bezierCurveTo(width/2 + width /4, topCurveHeight - topCurveHeight /2, width/2, topCurveHeight, width/2, topCurveHeight);
    context.stroke();

  }, [width, height]);
  
  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
      return {
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isComplete) return;
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
