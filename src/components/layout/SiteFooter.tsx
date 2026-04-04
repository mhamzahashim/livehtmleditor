import { Link } from "react-router-dom";
import { Github, Code2 } from "lucide-react";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[hsl(225,22%,5%)]">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <Code2 className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                LiveHTML<span className="text-indigo-400 font-normal">.editor</span>
              </span>
            </div>
            <p className="text-sm text-[#5C6178] leading-relaxed max-w-xs">
              Free online HTML, CSS & JS editor with live preview, components library, and developer tools.
            </p>
          </div>

          {/* Product links */}
          <nav className="space-y-3" aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5C6178]">Product</h3>
            <ul className="mt-2 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#7A7F94] hover:text-white transition-colors duration-200">
                  Editor
                </Link>
              </li>
              <li>
                <Link to="/components" className="text-[#7A7F94] hover:text-white transition-colors duration-200">
                  Components
                </Link>
              </li>
              <li>
                <Link to="/notepad" className="text-[#7A7F94] hover:text-white transition-colors duration-200">
                  Notepad
                </Link>
              </li>
              <li>
                <Link to="/markdown" className="text-[#7A7F94] hover:text-white transition-colors duration-200">
                  Markdown
                </Link>
              </li>
              <li>
                <Link to="/pdf-converter" className="text-[#7A7F94] hover:text-white transition-colors duration-200">
                  PDF Tools
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div className="space-y-3 md:text-right">
            <a
              href="https://github.com/mhamzahashim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#7A7F94] hover:text-white transition-colors duration-200"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/[0.06] pt-6 text-center text-xs text-[#3A3F52]">
          &copy; {year} LiveHTML Editor. Built with React, TypeScript & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
