import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const photos = [
  { src: "https://placehold.co/600x400.png", alt: "A happy memory", hint: "couple smiling" },
  { src: "https://placehold.co/400x600.png", alt: "A beautiful landscape from a trip", hint: "travel landscape" },
  { src: "https://placehold.co/600x400.png", alt: "A candid moment", hint: "candid moment" },
  { src: "https://placehold.co/600x400.png", alt: "A celebratory event", hint: "celebration dinner" },
  { src: "https://placehold.co/400x600.png", alt: "A silly face", hint: "silly selfie" },
];

export function PhotoGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Reel of Memories</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                    <div className="relative aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={600}
                            height={400}
                            data-ai-hint={photo.hint}
                            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </CardContent>
    </Card>
  );
}
