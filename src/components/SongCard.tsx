import { Download, Play, Pause, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

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
  const [imageError, setImageError] = useState(false);
  
  const handleDownload = () => {
    window.open(track.previewUrl, "_blank");
  };

  return (
    <Card className="group relative overflow-hidden glass-card hover-lift hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(30,215,96,0.3)]">
      <div className="relative aspect-square overflow-hidden bg-gradient-card">
        {!imageError ? (
          <img
            src={track.artworkUrl100.replace("100x100", "400x400")}
            alt={track.trackName}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Music className="w-20 h-20 text-muted-foreground opacity-50" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Play button with glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <button
            onClick={onPlay}
            className="relative w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-200"
          >
            <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-50" />
            {isPlaying ? (
              <Pause className="relative z-10 w-7 h-7 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="relative z-10 w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            )}
          </button>
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute top-3 right-3 flex gap-1">
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite]" />
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite_0.4s]" />
          </div>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-1.5">
          <h3 className="font-bold text-foreground truncate text-base leading-tight group-hover:text-primary transition-colors duration-200">
            {track.trackName}
          </h3>
          <p className="text-sm text-muted-foreground truncate font-medium">
            {track.artistName}
          </p>
          <p className="text-xs text-muted-foreground/70 truncate">
            {track.collectionName}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground rounded-lg transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-lg hover:shadow-primary/20 transform hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </Card>
  );
};

export default SongCard;
