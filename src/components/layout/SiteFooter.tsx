import { Link } from "react-router-dom";
import { Github, Code2 } from "lucide-react";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Code2 className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-foreground tracking-tight">
                LiveHTML<span className="text-amber-600 font-normal">.editor</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Free online HTML, CSS & JS editor with live preview, component library, and developer tools.
            </p>
          </div>

          {/* Links */}
          <nav className="space-y-3" aria-label="Footer">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Editor</Link></li>
              <li><Link to="/components" className="text-muted-foreground hover:text-foreground transition-colors">Components</Link></li>
              <li><Link to="/notepad" className="text-muted-foreground hover:text-foreground transition-colors">Notepad</Link></li>
              <li><Link to="/markdown" className="text-muted-foreground hover:text-foreground transition-colors">Markdown</Link></li>
              <li><Link to="/pdf-converter" className="text-muted-foreground hover:text-foreground transition-colors">PDF Tools</Link></li>
            </ul>
          </nav>

          {/* Social */}
          <div className="space-y-3 md:text-right">
            <a
              href="https://github.com/mhamzahashim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {year} LiveHTML Editor. Built with React, TypeScript & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
