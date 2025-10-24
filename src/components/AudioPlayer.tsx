import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  currentTrack: {
    trackId: number;
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    previewUrl: string;
  } | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const AudioPlayer = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.previewUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border z-50 animate-slide-up">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onNext?.()}
      />
      
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src={currentTrack.artworkUrl100}
              alt={currentTrack.trackName}
              className="w-14 h-14 rounded-lg shadow-lg"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground truncate">
                {currentTrack.trackName}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {currentTrack.artistName}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center justify-center gap-4 mb-2">
              <button
                onClick={onPrevious}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                disabled={!onPrevious}
              >
                <SkipBack className="w-5 h-5" fill="currentColor" />
              </button>
              
              <button
                onClick={onPlayPause}
                className="w-10 h-10 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-all hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                )}
              </button>

              <button
                onClick={onNext}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                disabled={!onNext}
              >
                <SkipForward className="w-5 h-5" fill="currentColor" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Spacer for layout balance */}
          <div className="flex-1 hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
