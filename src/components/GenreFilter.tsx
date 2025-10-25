import { Music, Mic2, Radio, Disc, Guitar, Piano } from "lucide-react";

interface GenreFilterProps {
  onGenreSelect: (genre: string) => void;
  selectedGenre?: string;
}

const genres = [
  { name: "All", icon: Music, query: "" },
  { name: "Pop", icon: Mic2, query: "pop music" },
  { name: "Rock", icon: Guitar, query: "rock music" },
  { name: "Bollywood", icon: Radio, query: "bollywood" },
  { name: "Electronic", icon: Disc, query: "electronic dance" },
  { name: "Classical", icon: Piano, query: "classical music" },
];

const GenreFilter = ({ onGenreSelect, selectedGenre = "" }: GenreFilterProps) => {
  return (
    <div className="px-4 py-4 md:py-6 sticky top-[57px] md:top-[73px] z-40 glass-card border-b border-border backdrop-blur-xl">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <span className="text-xs md:text-sm font-medium text-muted-foreground whitespace-nowrap mr-1 md:mr-2">
            Genres:
          </span>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre.query;
            return (
              <button
                key={genre.name}
                onClick={() => onGenreSelect(genre.query)}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground active:scale-95 md:hover:scale-105"
                }`}
              >
                <genre.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenreFilter;
