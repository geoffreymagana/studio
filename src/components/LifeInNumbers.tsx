"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Smile } from "lucide-react";

export function LifeInNumbers() {
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const startDate = new Date("2020-02-14T00:00:00"); // A special starting date
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-3">
            <Calendar />
            Life in Numbers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-secondary rounded-lg">
                <Heart className="mx-auto h-8 w-8 text-accent mb-2" />
                <p className="text-4xl font-bold font-headline text-primary">{daysTogether.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-body">Days Together</p>
            </div>
             <div className="p-4 bg-secondary rounded-lg">
                <Smile className="mx-auto h-8 w-8 text-accent mb-2" />
                <p className="text-4xl font-bold font-headline text-primary">∞</p>
                <p className="text-sm text-muted-foreground font-body">Happy Memories</p>
            </div>
             <div className="p-4 bg-secondary rounded-lg">
                <Heart className="mx-auto h-8 w-8 text-accent mb-2" fill="currentColor"/>
                <p className="text-4xl font-bold font-headline text-primary">1</p>
                <p className="text-sm text-muted-foreground font-body">Shared Love</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
