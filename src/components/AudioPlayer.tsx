import { useEffect, useRef, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => onNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleProgressChange = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <>
      <audio ref={audioRef} />
      <Card className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
          {/* Progress Bar */}
          <div className="mb-3 md:mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium min-w-[35px]">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 group cursor-pointer">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="w-full"
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium min-w-[35px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

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
              <Slider 
                value={[volume]} 
                max={100} 
                step={1} 
                onValueChange={(value) => setVolume(value[0])}
                className="flex-1" 
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AudioPlayer;
