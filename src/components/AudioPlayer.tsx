import { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  onNext: () => void;
  onPrevious: () => void;
}

const AudioPlayer = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.previewUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <>
      <audio ref={audioRef} />
      <Card className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-6">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={currentTrack.artworkUrl100}
                alt={currentTrack.trackName}
                className="w-12 h-12 md:w-16 md:h-16 rounded-lg shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-foreground truncate text-sm md:text-base">
                  {currentTrack.trackName}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  {currentTrack.artistName}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={onPrevious}
                className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={onPlayPause}
                className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:shadow-primary/50"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5" fill="currentColor" />
                )}
              </button>

              <button
                onClick={onNext}
                className="hidden sm:flex w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Volume - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 w-32">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AudioPlayer;
