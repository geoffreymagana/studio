import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";

export function SpotifyPlaylist() {
  // A romantic playlist from Spotify
  const playlistUrl = "https://open.spotify.com/embed/playlist/37i9dQZF1DWVlLVgnFfS28?utm_source=generator&theme=0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-3">
            <Music />
            Our Soundtrack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9">
             <iframe
                style={{ borderRadius: '12px' }}
                src={playlistUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
            ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
