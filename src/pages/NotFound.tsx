import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => { console.error("404:", location.pathname); }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-border mb-2 font-mono">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Page not found</p>
        <Link to="/" className="inline-flex items-center px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors cta-glow">
          Return to Editor
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
