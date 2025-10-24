import { Download, Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SongCardProps {
  track: {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    collectionName: string;
    previewUrl: string;
  };
  isPlaying: boolean;
  onPlay: () => void;
}

const SongCard = ({ track, isPlaying, onPlay }: SongCardProps) => {
  const handleDownload = () => {
    window.open(track.previewUrl, "_blank");
  };

  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(30,215,96,0.2)] backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={track.artworkUrl100.replace("100x100", "300x300")}
          alt={track.trackName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={onPlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(30,215,96,0.6)]"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-primary-foreground" fill="currentColor" />
          ) : (
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate mb-1">
          {track.trackName}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-1">
          {track.artistName}
        </p>
        <p className="text-xs text-muted-foreground truncate mb-3">
          {track.collectionName}
        </p>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Download</span>
        </button>
      </div>
    </Card>
  );
};

export default SongCard;
