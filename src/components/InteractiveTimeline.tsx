"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plane, Martini, Heart, Calendar, Star, Users, Music, RotateCcw } from "lucide-react";

const timelineEvents = [
  {
    date: "June 13, 2023",
    title: "Boy Meets Girl",
    description: "Our paths crossed and everything changed. The beginning of our beautiful story.",
    icon: <MapPin className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    date: "May 5, 2024",
    title: "Boy Kisses Girl",
    description: "A magical moment that sealed our connection. Boy kissed girl and hearts soared.",
    icon: <Heart className="h-6 w-6" />,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
  },
  {
    date: "August 24, 2024",
    title: "Boy Asks Girl Out",
    description: "The day boy gathered courage and asked girl to be his girlfriend.",
    icon: <Calendar className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50"
  },
  {
    date: "August 25, 2024",
    title: "Girl Says I Love You",
    description: "The first time we both said those three magical words. Girl tells boy 'I love you'.",
    icon: <Heart className="h-6 w-6" />,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  {
    date: "September 17, 2024",
    title: "Second Date Adventure",
    description: "Another beautiful day together, creating more memories and strengthening our bond.",
    icon: <Star className="h-6 w-6" />,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
  },
  {
    date: "February 10, 2025",
    title: "Girl Makes Playlist",
    description: "Girl creates a special playlist for boy, sharing her favorite songs and feelings.",
    icon: <Music className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
  },
  {
    date: "February 14, 2025",
    title: "First Valentine Together",
    description: "Our first Valentine's Day celebration, filled with love, surprises, and sweet moments.",
    icon: <Heart className="h-6 w-6" />,
    color: "from-rose-500 to-red-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-red-50"
  },
  {
    date: "May 4, 2025",
    title: "Girl Asks Boy Out",
    description: "A beautiful reversal - girl takes the initiative and asks boy out on a special date.",
    icon: <Users className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
  },
  {
    date: "June 10, 2025",
    title: "Weekend Getaway",
    description: "Our first weekend alone together, creating intimate memories and strengthening our bond in our own private space.",
    icon: <Plane className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50"
  }
];

export function InteractiveTimeline() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
          <Heart className="text-accent" />
          Our Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="relative h-64 cursor-pointer perspective-1000"
              onClick={() => toggleCard(index)}
            >
              <div className={`flashcard w-full h-full ${flippedCards.has(index) ? 'flipped' : ''}`}>
                {/* Front of card */}
                <div className="flashcard-front">
                  <Card className={`h-full ${event.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${event.color} text-white mb-4`}>
                        {event.icon}
                      </div>
                      <h3 className="font-romantic text-lg font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      <p className="font-body text-sm text-gray-600">
                        {event.date}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                        <RotateCcw className="h-3 w-3" />
                        <span>Tap to flip</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div className="flashcard-back">
                  <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
                    <CardContent className="flex flex-col justify-center h-full p-6 text-center">
                      <h4 className="font-romantic text-lg font-semibold text-gray-800 mb-3">
                        {event.title}
                      </h4>
                      <p className="font-body text-sm text-gray-700 leading-relaxed">
                        {event.description}
                      </p>
                      <p className="font-body text-xs text-gray-500 mt-4">
                        {event.date}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
