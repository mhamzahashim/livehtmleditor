import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center ambient-bg dot-grid">
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-bold text-white/10 mb-2 font-mono">404</h1>
        <p className="text-lg text-[#9DA3B4] mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20"
        >
          Return to Editor
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
