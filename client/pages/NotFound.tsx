import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist yet. Let's get you back on track and build something amazing together!
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-background font-bold rounded-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
