import { Music, Github, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-card border-t border-border mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">RingTones</h3>
                <p className="text-xs text-muted-foreground">Free Ringtones</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and download free ringtone previews from millions of songs worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#trending" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Trending Ringtones
                </a>
              </li>
              <li>
                <a href="#categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#top-artists" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Top Artists
                </a>
              </li>
              <li>
                <a href="#new-releases" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  New Releases
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Popular Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#pop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pop Music
                </a>
              </li>
              <li>
                <a href="#rock" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rock & Metal
                </a>
              </li>
              <li>
                <a href="#bollywood" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Bollywood
                </a>
              </li>
              <li>
                <a href="#electronic" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Electronic
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for music lovers
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@ringtones.com"
                className="w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © {currentYear} RingTones. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
