import { Search, Music, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-border/50 backdrop-blur-xl">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
              <Music className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-foreground">Melofy</h1>
              <p className="text-xs text-muted-foreground hidden md:block">Ringtone Paradise</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSubmit} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for ringtones, artists, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 glass-card border-border/50 focus:border-primary"
              />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection("trending")}>
              Trending
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection("categories")}>
              Categories
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection("how-it-works")}>
              How It Works
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-8">
                <form onSubmit={handleSubmit} className="md:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search ringtones..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>
                
                <nav className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("trending")}>
                    Trending
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("categories")}>
                    Categories
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("how-it-works")}>
                    How It Works
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => scrollToSection("stats")}>
                    Statistics
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
