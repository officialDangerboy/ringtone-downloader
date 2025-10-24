import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategorySection from "@/components/CategorySection";
import TrendingSection from "@/components/TrendingSection";
import GenreFilter from "@/components/GenreFilter";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";
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
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    const searchQuery = selectedGenre ? `${query} ${selectedGenre}` : query;
    
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=30`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setTracks(data.results);
        toast.success(`Found ${data.results.length} ringtones`);
        // Scroll to results
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setTracks([]);
        toast.info("No ringtones found. Try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search ringtones. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    if (genre && tracks.length === 0) {
      handleSearch(genre);
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-1">
        {tracks.length === 0 && !isLoading && (
          <>
            <TrendingSection onSearch={handleSearch} />
            <CategorySection onCategorySearch={handleSearch} />
            <StatsSection />
            <HowItWorks />
          </>
        )}
        
        {tracks.length > 0 && (
          <GenreFilter onGenreSelect={handleGenreSelect} selectedGenre={selectedGenre} />
        )}
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
            </div>
            <p className="mt-6 text-lg text-muted-foreground font-medium">Searching for ringtones...</p>
          </div>
        ) : (
          <SearchResults
            tracks={tracks}
            currentTrackId={currentTrack?.trackId || null}
            isPlaying={isPlaying}
            onTrackPlay={handleTrackPlay}
          />
        )}
      </main>

      <Footer />

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
