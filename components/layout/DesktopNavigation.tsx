
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  links: Array<{ name: string; path: string }>;
}

const DesktopNavigation = ({ links }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === link.path ? "text-primary" : "text-foreground"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
