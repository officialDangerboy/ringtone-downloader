import SongCard from "./SongCard";
import { Music } from "lucide-react";

interface Track {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  collectionName: string;
  previewUrl: string;
}

interface SearchResultsProps {
  tracks: Track[];
  currentTrackId: number | null;
  isPlaying: boolean;
  onTrackPlay: (track: Track) => void;
}

const SearchResults = ({ tracks, currentTrackId, isPlaying, onTrackPlay }: SearchResultsProps) => {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-32 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
            <Music className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Start Your Music Journey
          </h3>
          <p className="text-lg text-muted-foreground">
            Search for your favorite songs, artists, or albums to discover amazing music
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-16 pb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">
              Search Results
            </h2>
            <p className="text-muted-foreground text-lg">
              {tracks.length} {tracks.length === 1 ? 'song' : 'songs'} found
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Results</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.trackId}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <SongCard
                track={track}
                isPlaying={isPlaying && currentTrackId === track.trackId}
                onPlay={() => onTrackPlay(track)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
