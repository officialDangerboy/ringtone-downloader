import { Search } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center px-4 bg-gradient-hero overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-5xl w-full text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow leading-tight">
            Discover & Play Music
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-14 font-light max-w-2xl mx-auto">
          Search millions of songs and stream previews instantly
        </p>
        
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-40 group-hover:opacity-70 blur-lg transition-all duration-500 animate-glow" />
            <div className="relative flex items-center glass-card rounded-full overflow-hidden shadow-2xl">
              <Search className="absolute left-7 w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for songs, artists, albums..."
                className="w-full pl-16 pr-40 py-6 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg font-medium"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="absolute right-2 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Quick search suggestions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground font-medium">Try:</span>
          {['Arijit Singh', 'Taylor Swift', 'The Weeknd', 'Ed Sheeran'].map((artist) => (
            <button
              key={artist}
              onClick={() => {
                setSearchQuery(artist);
                handleSubmit(new Event('submit') as any);
              }}
              className="px-4 py-2 text-sm rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-all duration-200 hover:scale-105"
            >
              {artist}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
