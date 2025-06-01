
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserIcon, Package, LogOut } from "lucide-react";
import { User } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  links: Array<{ name: string; path: string }>;
  isLoggedIn: boolean;
  user: User | null;
  onNavigate: () => void;
  onLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  links,
  isLoggedIn,
  user,
  onNavigate,
  onLogout,
}: MobileMenuProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-b border-border shadow-md animate-slide-in-up">
      <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-base font-medium transition-colors hover:text-primary py-2 ${
              location.pathname === link.path ? "text-primary" : "text-foreground"
            }`}
            onClick={onNavigate}
          >
            {link.name}
          </Link>
        ))}
        {!isLoggedIn ? (
          <div className="pt-2 flex flex-col space-y-3">
            <Link to="/sign-up" onClick={onNavigate}>
              <Button className="w-full">Sign Up</Button>
            </Link>
            <Link to="/sign-in" onClick={onNavigate}>
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
          </div>
        ) : (
          <div className="pt-2 flex flex-col space-y-3">
            <Link to="/profile" onClick={onNavigate}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <UserIcon size={16} />
                <span>Profile</span>
              </Button>
            </Link>
            <Link to="/orders" onClick={onNavigate}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Package size={16} />
                <span>Orders</span>
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>Log out</span>
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
