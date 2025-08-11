import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const SiteFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Web Notepad</h2>
            <p className="text-sm text-muted-foreground">Lightweight HTML/CSS/JS editor with live preview and notes.</p>
          </div>
          <nav className="space-y-2" aria-label="Footer">
            <h3 className="text-xs font-medium text-muted-foreground">Product</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Editor</Link></li>
              <li><Link to="/components" className="text-muted-foreground hover:text-foreground">Components</Link></li>
              <li><Link to="/notepad" className="text-muted-foreground hover:text-foreground">Notepad</Link></li>
            </ul>
          </nav>
          <div className="space-y-3 md:text-right">
            <a
              href="https://github.com/mhamzahashim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {year} Web Notepad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
