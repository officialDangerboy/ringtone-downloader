import { Users, Download, Music, Star } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { icon: Users, label: "Active Users", value: 2500000, suffix: "M+" },
  { icon: Download, label: "Downloads", value: 15000000, suffix: "M+" },
  { icon: Music, label: "Ringtones", value: 5000000, suffix: "M+" },
  { icon: Star, label: "User Rating", value: 4.8, suffix: "/5" },
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="px-4 py-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`glass-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value < 10 ? stat.value : Math.floor(stat.value / 1000000)}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
