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
  const [showHome, setShowHome] = useState(true);

  const resetToHome = () => {
    setShowHome(true);
    setTracks([]);
    setSelectedGenre("");
    setCurrentTrack(null);
    setIsPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setShowHome(false);
    setIsLoading(true);
    const searchQuery = selectedGenre ? `${query} ${selectedGenre}` : query;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&limit=30`
      );
      const data = await response.json();

      if (data.results?.length > 0) {
        setTracks(data.results);
        toast.success(`Found ${data.results.length} ringtones`);
      } else {
        setTracks([]);
        toast.info("No ringtones found.");
      }
    } catch {
      toast.error("Search error!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ✅ Logo Reset */}
      <Header onSearch={handleSearch} onLogoClick={resetToHome} />

      <main className="flex-1">
        {showHome && (
          <>
            <TrendingSection onSearch={handleSearch} />
            <CategorySection onCategorySearch={handleSearch} />
            <StatsSection />
            <HowItWorks />
          </>
        )}

        {!showHome && selectedGenre && (
          <GenreFilter onGenreSelect={setSelectedGenre} selectedGenre={selectedGenre} />
        )}

        {!showHome && (
          isLoading ?
            <div className="flex justify-center py-32">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
            </div>
            :
            <SearchResults
              tracks={tracks}
              currentTrackId={currentTrack?.trackId || null}
              isPlaying={isPlaying}
              onTrackPlay={(track) => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
            />
        )}
      </main>

      <Footer />

      <AudioPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log("next")}
        onPrevious={() => console.log("previous")}
      />
    </div>
  );
};

export default Index;
