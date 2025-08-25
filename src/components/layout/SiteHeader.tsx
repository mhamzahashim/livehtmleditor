import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileCode2, Menu, X } from "lucide-react";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "transition-colors", 
    isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
  ].join(" ");

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <FileCode2 className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold tracking-tight">Web Notepad</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            <NavLink to="/" end className={navLinkClass}>Editor</NavLink>
            <NavLink to="/components" className={navLinkClass}>Components</NavLink>
            <NavLink to="/notepad" className={navLinkClass}>Notepad</NavLink>
            <NavLink to="/markdown" className={navLinkClass}>Markdown</NavLink>
            <NavLink to="/pdf-converter" className={navLinkClass}>PDF Converter</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link to="/notepad">Open Notepad</Link>
            </Button>
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid gap-3" aria-label="Mobile">
            <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>Editor</NavLink>
            <NavLink to="/components" className={navLinkClass} onClick={() => setOpen(false)}>Components</NavLink>
            <NavLink to="/notepad" className={navLinkClass} onClick={() => setOpen(false)}>Notepad</NavLink>
            <NavLink to="/markdown" className={navLinkClass} onClick={() => setOpen(false)}>Markdown</NavLink>
            <NavLink to="/pdf-converter" className={navLinkClass} onClick={() => setOpen(false)}>PDF Converter</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
