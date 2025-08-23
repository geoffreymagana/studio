"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin, MessageCircleHeart, Flame, Gift, Flower } from "lucide-react";

export function LifeInNumbers() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [daysLoved, setDaysLoved] = useState(0);
  const [daysSinceFirstKiss, setDaysSinceFirstKiss] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateDays = (startDate: string) => {
      const start = new Date(startDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Calculate final values
    const finalDaysTogether = calculateDays("2023-06-13");
    const finalDaysLoved = calculateDays("2024-08-25");
    const finalDaysSinceFirstKiss = calculateDays("2024-05-05");

    // Start animation after a short delay
    setTimeout(() => {
      setIsAnimating(true);
      
      // Animate days together
      const animateDaysTogether = () => {
        let current = 0;
        const increment = Math.ceil(finalDaysTogether / 50); // 50 steps
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalDaysTogether) {
            current = finalDaysTogether;
            clearInterval(timer);
          }
          setDaysTogether(current);
        }, 50); // 50ms per step = 2.5 seconds total
      };

      // Animate days loved
      const animateDaysLoved = () => {
        let current = 0;
        const increment = Math.ceil(finalDaysLoved / 50);
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalDaysLoved) {
            current = finalDaysLoved;
            clearInterval(timer);
          }
          setDaysLoved(current);
        }, 50);
      };

      // Animate days since first kiss
      const animateDaysSinceFirstKiss = () => {
        let current = 0;
        const increment = Math.ceil(finalDaysSinceFirstKiss / 50);
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalDaysSinceFirstKiss) {
            current = finalDaysSinceFirstKiss;
            clearInterval(timer);
          }
          setDaysSinceFirstKiss(current);
        }, 50);
      };

      // Start all animations with slight delays for staggered effect
      animateDaysTogether();
      setTimeout(animateDaysLoved, 200);
      setTimeout(animateDaysSinceFirstKiss, 400);
    }, 500);
  }, [isClient]);

  const stats = [
    {
      icon: <MapPin className="h-8 w-8" />,
      number: daysTogether,
      label: "Days Since We Met",
      description: "Every day with you is a blessing",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      icon: <MessageCircleHeart className="h-8 w-8" />,
      number: daysLoved,
      label: "Days Since 'I Love You'",
      description: "The day our hearts spoke the same language",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50"
    },
    {
      icon: <Flame className="h-8 w-8" />,
      number: daysSinceFirstKiss,
      label: "Days Since First Kiss",
      description: "A magical moment that changed everything",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      number: 2,
      label: "Hearts Beating as One",
      description: "Two souls, one love story",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      icon: <Gift className="h-8 w-8" />,
      number: 365,
      label: "Days of Forever",
      description: "Every day is a new chapter in our love",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
    },
    {
      icon: <Flower className="h-8 w-8" />,
      number: 24,
      label: "Hours of Love",
      description: "Every hour, every minute, every second",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
    }
  ];

  if (!isClient) {
    return (
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-4xl md:text-5xl flex items-center justify-center gap-3">
            <Heart className="text-accent" />
            Life in Numbers
          </CardTitle>
          <p className="font-body text-lg text-muted-foreground">Our love story by the numbers</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <Card className={`h-full ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <h3 className="font-romantic text-3xl font-bold text-gray-800 mb-2">
                      0
                    </h3>
                    <p className="font-body font-semibold text-gray-700 mb-2">
                      {stat.label}
                    </p>
                    <p className="font-body text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-4xl md:text-5xl flex items-center justify-center gap-3">
          <Heart className="text-accent" />
          Life in Numbers
        </CardTitle>
        <p className="font-body text-lg text-muted-foreground">Our love story by the numbers</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <Card className={`h-full ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <h3 className={`font-romantic text-3xl font-bold text-gray-800 mb-2 transition-all duration-300 ${isAnimating ? 'scale-110 number-count' : 'scale-100'}`}>
                    {stat.number.toLocaleString()}
                  </h3>
                  <p className="font-body font-semibold text-gray-700 mb-2">
                    {stat.label}
                  </p>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
