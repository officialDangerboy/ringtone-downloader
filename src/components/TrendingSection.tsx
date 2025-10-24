import { TrendingUp, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface TrendingSectionProps {
  onSearch: (query: string) => void;
}

const trendingSearches = [
  { artist: "Arijit Singh", searches: "2.4M" },
  { artist: "Taylor Swift", searches: "1.8M" },
  { artist: "The Weeknd", searches: "1.5M" },
  { artist: "Ed Sheeran", searches: "1.2M" },
  { artist: "Dua Lipa", searches: "980K" },
  { artist: "BTS", searches: "850K" },
];

const TrendingSection = ({ onSearch }: TrendingSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingSearches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 py-12 bg-gradient-to-b from-secondary/20 to-background">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Trending Now
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {trendingSearches.map((item, index) => (
            <button
              key={item.artist}
              onClick={() => onSearch(item.artist)}
              className={`group relative overflow-hidden rounded-xl p-4 glass-card border transition-all duration-500 ${
                index === currentIndex
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : "border-border hover:border-primary/50 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white" fill="white" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-sm truncate w-full">
                    {item.artist}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.searches}</p>
                </div>
              </div>
              {index === currentIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
