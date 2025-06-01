
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthActions = () => {
  const navigate = useNavigate();

  return (
    <>
      <Link to="/sign-in">
        <Button variant="ghost" className="hover:bg-secondary flex items-center gap-1">
          <LogIn size={18} />
          <span className="hidden sm:inline">Sign In</span>
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="hidden sm:flex items-center gap-1">
            <User size={18} />
            <span>Sign Up</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2" align="end">
          <DropdownMenuItem onClick={() => navigate("/sign-up/customer")}>
            Sign up as Customer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/sign-up/farmer")}>
            Sign up as Farmer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AuthActions;
