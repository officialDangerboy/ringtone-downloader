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
    <div className="px-4 py-6 sticky top-[73px] z-40 glass-card border-b border-border">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">
            Genres:
          </span>
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre.query;
            return (
              <button
                key={genre.name}
                onClick={() => onGenreSelect(genre.query)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:scale-105"
                }`}
              >
                <genre.icon className="w-4 h-4" />
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
