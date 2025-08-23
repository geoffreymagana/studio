import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plane, Martini, Heart } from "lucide-react";

const timelineEvents = [
  {
    date: "Feb 14, 2020",
    title: "Our First Chapter",
    description: "The day our adventure began. Everything changed for the better.",
    icon: <MapPin />,
  },
  {
    date: "June 22, 2021",
    title: "First Big Trip",
    description: "We explored new horizons together, making memories that will last a lifetime.",
    icon: <Plane />,
  },
  {
    date: "Dec 31, 2022",
    title: "A Toast to Us",
    description: "Celebrating another year of love, laughter, and happiness.",
    icon: <Martini />,
  },
  {
    date: "Today",
    title: "Another Beautiful Day",
    description: "And the best is yet to come. Happy Anniversary!",
    icon: <Heart />,
  },
];

export function InteractiveTimeline() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Our Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-[34px] top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          
          <div className="space-y-10">
            {timelineEvents.map((event, index) => (
              <div key={index} className="relative flex items-start">
                {/* Icon and Dot */}
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground flex-shrink-0">
                  {event.icon}
                </div>
                <div className="pl-6">
                  <p className="font-headline text-xl text-primary">{event.title}</p>
                  <p className="text-sm text-muted-foreground font-body">{event.date}</p>
                  <p className="mt-2 font-body">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
