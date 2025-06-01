
import { Link } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 text-primary font-medium animate-hover"
    >
      <ShoppingBasket size={24} className="text-primary" />
      <span className="text-xl font-semibold tracking-tight">FarmFresh</span>
    </Link>
  );
};

export default Logo;
