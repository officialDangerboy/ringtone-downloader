import { Download, Play, Pause, Music, Heart, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

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
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleDownload = () => {
    window.open(track.previewUrl, "_blank");
    toast.success("Opening ringtone preview for download");
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: track.trackName,
          text: `Check out this ringtone: ${track.trackName} by ${track.artistName}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
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
        
        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleFavorite}
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-destructive text-destructive" : "text-white"}`}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>
        
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
          <div className="absolute top-3 left-3 flex gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite]" />
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
            <div className="w-1 h-4 bg-primary animate-[pulse_0.6s_ease-in-out_infinite_0.4s]" />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white font-medium">
          0:30
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground truncate text-sm leading-tight group-hover:text-primary transition-colors duration-200">
            {track.trackName}
          </h3>
          <p className="text-xs text-muted-foreground truncate font-medium">
            {track.artistName}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground rounded-lg transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-lg hover:shadow-primary/20 transform hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </Card>
  );
};

export default SongCard;
