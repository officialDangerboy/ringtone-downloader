import { useState } from "react";
import Hero from "@/components/Hero";
import SearchResults from "@/components/SearchResults";
import AudioPlayer from "@/components/AudioPlayer";
import { toast } from "sonner";

interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  previewUrl: string;
}

const Index = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=25`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
        toast.success(`Found ${data.results.length} songs`);
      } else {
        setTracks([]);
        toast.info("No songs found. Try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search songs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackPlay = (track: Track) => {
    if (currentTrack?.trackId === track.trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.trackId === currentTrack.trackId);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.trackId === currentTrack.trackId);
    const previousIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[previousIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero onSearch={handleSearch} />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
          </div>
          <p className="mt-6 text-lg text-muted-foreground font-medium">Searching for music...</p>
        </div>
      ) : (
        <SearchResults
          tracks={tracks}
          currentTrackId={currentTrack?.trackId || null}
          isPlaying={isPlaying}
          onTrackPlay={handleTrackPlay}
        />
      )}

      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default Index;
