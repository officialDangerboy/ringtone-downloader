import { Sparkles, TrendingUp, Music2, Radio } from "lucide-react";

interface CategorySectionProps {
  onCategorySearch: (category: string) => void;
}

const categories = [
  {
    name: "Trending Now",
    icon: TrendingUp,
    searchTerm: "trending 2024",
    gradient: "from-orange-500 to-pink-500",
  },
  {
    name: "Bollywood Hits",
    icon: Sparkles,
    searchTerm: "bollywood",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "Pop & Dance",
    icon: Music2,
    searchTerm: "pop dance",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Top Charts",
    icon: Radio,
    searchTerm: "top hits 2024",
    gradient: "from-green-500 to-emerald-500",
  },
];

const CategorySection = ({ onCategorySearch }: CategorySectionProps) => {
  return (
    <section className="px-4 py-8 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore ringtones from different genres and moods
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategorySearch(category.searchTerm)}
              className="group relative overflow-hidden rounded-2xl p-6 h-40 bg-gradient-card glass-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative flex flex-col items-center justify-center h-full gap-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-foreground text-center">
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
