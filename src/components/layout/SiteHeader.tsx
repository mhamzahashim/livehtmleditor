import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, ArrowRight } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-[13px] font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg",
    isActive
      ? "text-white bg-white/[0.1]"
      : "text-stone-400 hover:text-white hover:bg-white/[0.06]"
  ].join(" ");

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <nav className="nav-glass mx-auto max-w-5xl rounded-2xl px-4 py-2.5 shadow-warm-lg">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
              <Code2 className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[13px] font-bold tracking-tight text-white">
              LiveHTML<span className="text-amber-400 font-normal">.editor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLinkClass}>Editor</NavLink>
            <NavLink to="/components" className={navLinkClass}>Components</NavLink>
            <NavLink to="/notepad" className={navLinkClass}>Notepad</NavLink>
            <NavLink to="/markdown" className={navLinkClass}>Markdown</NavLink>
            <NavLink to="/pdf-converter" className={navLinkClass}>PDF Tools</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white border-0 text-xs font-semibold px-4 transition-all cta-glow"
            >
              <Link to="/notepad">
                Open Notepad
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg w-8 h-8 text-stone-400 hover:bg-white/[0.06] hover:text-white transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden mt-2 pt-2 border-t border-white/[0.08]">
            <div className="grid gap-1 py-2">
              <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Editor</NavLink>
              <NavLink to="/components" className={navLinkClass} onClick={() => setOpen(false)}>Components</NavLink>
              <NavLink to="/notepad" className={navLinkClass} onClick={() => setOpen(false)}>Notepad</NavLink>
              <NavLink to="/markdown" className={navLinkClass} onClick={() => setOpen(false)}>Markdown</NavLink>
              <NavLink to="/pdf-converter" className={navLinkClass} onClick={() => setOpen(false)}>PDF Tools</NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SiteHeader;
