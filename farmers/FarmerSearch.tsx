
import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface FarmerSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  toggleFilters: () => void;
}

export const FarmerSearch = ({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  specialty,
  setSpecialty,
  viewMode,
  setViewMode,
  toggleFilters
}: FarmerSearchProps) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-4 mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          className="pl-10 pr-4 py-6" 
          placeholder="Search for farmers, products, or farming methods..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="relative md:w-48">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          className="pl-10 pr-4 py-6" 
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <Select value={specialty} onValueChange={setSpecialty}>
        <SelectTrigger className="md:w-48 h-12">
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Specialties</SelectItem>
          <SelectItem value="Vegetables">Vegetables</SelectItem>
          <SelectItem value="Fruits">Fruits</SelectItem>
          <SelectItem value="Dairy">Dairy</SelectItem>
          <SelectItem value="Poultry">Poultry</SelectItem>
          <SelectItem value="Beef">Beef</SelectItem>
          <SelectItem value="Tree Fruits">Tree Fruits</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        className="h-12 bg-primary/5 border-primary/20 hover:bg-primary/10"
        onClick={toggleFilters}
      >
        <Filter size={18} className="mr-2 text-primary" />
        <span>Filters</span>
      </Button>
      
      <Button 
        variant="ghost" 
        className="h-12 px-3 md:px-4"
        onClick={() => setViewMode("grid")}
      >
        <Grid size={20} className={viewMode === "grid" ? "text-primary" : "text-muted-foreground"} />
      </Button>
      
      <Button 
        variant="ghost" 
        className="h-12 px-3 md:px-4"
        onClick={() => setViewMode("list")}
      >
        <List size={20} className={viewMode === "list" ? "text-primary" : "text-muted-foreground"} />
      </Button>
    </motion.div>
  );
};
