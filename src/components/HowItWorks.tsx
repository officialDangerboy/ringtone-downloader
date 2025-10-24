import { Search, Play, Download, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Find your favorite song or artist using our powerful search",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Play,
    title: "Preview",
    description: "Listen to 30-second preview to find the perfect ringtone",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Download,
    title: "Download",
    description: "Download high-quality ringtone preview instantly",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: CheckCircle2,
    title: "Enjoy",
    description: "Set as your ringtone and enjoy personalized alerts",
    color: "from-orange-500 to-red-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-4 py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get your favorite ringtones in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="glass-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
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

export default HowItWorks;
