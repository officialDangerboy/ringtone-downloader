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
    return null;
  }

  return (
    <section id="results" className="px-4 py-12 pb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Available Ringtones
            </h2>
            <p className="text-muted-foreground">
              {tracks.length} {tracks.length === 1 ? 'ringtone' : 'ringtones'} found • Click to preview
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live Results</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
