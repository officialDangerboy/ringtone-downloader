import SongCard from "./SongCard";

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
      <div className="text-center py-20">
        <p className="text-2xl text-muted-foreground">
          Search for your favorite songs to get started
        </p>
      </div>
    );
  }

  return (
    <section className="px-4 py-12 pb-32">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          Search Results ({tracks.length})
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {tracks.map((track) => (
            <SongCard
              key={track.trackId}
              track={track}
              isPlaying={isPlaying && currentTrackId === track.trackId}
              onPlay={() => onTrackPlay(track)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
