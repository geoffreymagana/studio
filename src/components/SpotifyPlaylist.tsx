import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

export function SpotifyPlaylist() {
  // Updated playlist URL as requested
  const playlistUrl = "https://open.spotify.com/embed/playlist/1fdpXEQbAb6HFzrcb88X08?utm_source=generator";

  return (
    <Card className="bg-card shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
          <Music className="text-accent" />
          Our Soundtrack
        </CardTitle>
        <p className="font-body text-muted-foreground">
          The songs that tell our love story
        </p>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-hidden rounded-xl">
          <iframe
            style={{ borderRadius: '12px' }}
            src={playlistUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full h-[352px] rounded-xl shadow-lg max-w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
