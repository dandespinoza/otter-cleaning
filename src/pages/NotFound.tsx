import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to our homepage to book professional house cleaning services."
        noindex={true}
      />
      <div className="text-center px-4 max-w-md">
        <div className="w-20 h-20 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-6">
          <Search className="h-10 w-10 text-blue" />
        </div>
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="blue" size="lg" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/booking">
              Book a Cleaning
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
