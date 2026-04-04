import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, Sparkles } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "relative py-1 text-sm transition-colors duration-200",
    isActive
      ? "text-white font-medium"
      : "text-[#7A7F94] hover:text-white"
  ].join(" ");

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <Code2 className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              LiveHTML<span className="text-indigo-400 font-normal">.editor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            <NavLink to="/" end className={navLinkClass}>Editor</NavLink>
            <NavLink to="/components" className={navLinkClass}>Components</NavLink>
            <NavLink to="/notepad" className={navLinkClass}>Notepad</NavLink>
            <NavLink to="/markdown" className={navLinkClass}>Markdown</NavLink>
            <NavLink to="/pdf-converter" className={navLinkClass}>PDF Tools</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 text-xs font-semibold h-8 px-3.5"
            >
              <Link to="/notepad">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Open Notepad
              </Link>
            </Button>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/[0.08] w-9 h-9 text-[#7A7F94] hover:bg-white/[0.05] hover:text-white transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[hsl(225,22%,7%)]/95 backdrop-blur-xl">
          <nav className="mx-auto max-w-[1600px] px-4 sm:px-6 py-3 grid gap-2" aria-label="Mobile">
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Editor</NavLink>
            <NavLink to="/components" className={navLinkClass} onClick={() => setOpen(false)}>Components</NavLink>
            <NavLink to="/notepad" className={navLinkClass} onClick={() => setOpen(false)}>Notepad</NavLink>
            <NavLink to="/markdown" className={navLinkClass} onClick={() => setOpen(false)}>Markdown</NavLink>
            <NavLink to="/pdf-converter" className={navLinkClass} onClick={() => setOpen(false)}>PDF Tools</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
