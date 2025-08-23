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
  const [drawingProgress, setDrawingProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // Draw simple heart guide with subtle outline
    context.strokeStyle = "hsla(337, 100%, 75%, 0.15)";
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    
    const x = width / 2;
    const y = height / 2.5;
    const heartWidth = width / 10;
    const heartHeight = height / 6;

    // Draw heart path
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
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if ('touches' in e.nativeEvent && e.nativeEvent.touches.length > 0) {
      clientX = e.nativeEvent.touches[0].clientX;
      clientY = e.nativeEvent.touches[0].clientY;
    } else if ('clientX' in e.nativeEvent) {
      clientX = e.nativeEvent.clientX;
      clientY = e.nativeEvent.clientY;
    } else {
      return { x: 0, y: 0 };
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
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
    
    // Simple drawing style without neon effects
    context.beginPath();
    context.moveTo(coords.x, coords.y);
    context.lineWidth = 4;
    context.strokeStyle = "hsl(337, 100%, 75%)"; // Simple pink
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowColor = "hsl(337, 100%, 75%)";
    context.shadowBlur = 2;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
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
    
    // Update progress
    setDrawingProgress(prev => Math.min(prev + 1, 100));
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;

    // Check if enough drawing was done (simple threshold)
    if (drawingProgress > 15) {
      setIsComplete(true);
      onDrawSuccess();
      
      // Simple completion effect
      setTimeout(() => {
        if (context) {
          context.shadowBlur = 4;
          context.stroke();
        }
      }, 100);
    } else {
      // Reset if not enough drawing
      setDrawingProgress(0);
      context.clearRect(0, 0, width, height);
      // Redraw guide
      context.strokeStyle = "hsla(337, 100%, 75%, 0.15)";
      context.lineWidth = 2;
      context.shadowBlur = 0;
      context.beginPath();
      
      const x = width / 2;
      const y = height / 2.5;
      const heartWidth = width / 10;
      const heartHeight = height / 6;

      context.moveTo(x, y + heartHeight);
      context.bezierCurveTo(x + heartWidth, y - heartHeight, x + (4 * heartWidth), y, x, y + (3 * heartHeight));
      context.bezierCurveTo(x - (4 * heartWidth), y, x - heartWidth, y - heartHeight, x, y + heartHeight);
      context.stroke();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isDrawing && !isComplete) {
      const coords = getCoords(e);
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (context) {
        context.lineTo(coords.x, coords.y);
        context.stroke();
      }
    }
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onMouseEnter={handleMouseEnter}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={cn(
          "rounded-xl border-2 border-dashed bg-gradient-to-br from-muted/30 to-muted/50 w-full touch-none cursor-crosshair transition-all duration-300",
          isComplete && "border-accent shadow-lg shadow-accent/20",
          isDrawing && "border-accent/50",
          className
        )}
      />
      {!isComplete && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm text-muted-foreground font-body bg-background/80 px-2 py-1 rounded">
            Draw a heart here
          </p>
        </div>
      )}
      {isComplete && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-accent/20 px-3 py-1 rounded-full">
            <p className="text-sm text-accent-foreground font-body">Perfect! ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
}
