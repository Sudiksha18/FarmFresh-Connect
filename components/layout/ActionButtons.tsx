
import { Button } from "@/components/ui/button";
import { Search, MapPin, Menu } from "lucide-react";

interface ActionButtonsProps {
  onMenuToggle: () => void;
}

const ActionButtons = ({ onMenuToggle }: ActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" className="hover:bg-secondary">
        <Search size={20} />
      </Button>
      
      <Button variant="ghost" size="icon" className="hover:bg-secondary">
        <MapPin size={20} />
      </Button>
    </div>
  );
};

export default ActionButtons;
