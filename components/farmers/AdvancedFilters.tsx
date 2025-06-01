
import React from "react";
import { motion } from "framer-motion";
import { ListFilter, Leaf, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdvancedFiltersProps {
  isOpen: boolean;
  farmingMethods: string[];
  cropTypes: string[];
  selectedFarmingMethods: string[];
  selectedCropTypes: string[];
  experienceRange: string;
  minRating: string;
  toggleFarmingMethod: (method: string) => void;
  toggleCropType: (type: string) => void;
  setExperienceRange: (range: string) => void;
  setMinRating: (rating: string) => void;
  clearFilters: () => void;
}

export const AdvancedFilters = ({
  isOpen,
  farmingMethods,
  cropTypes,
  selectedFarmingMethods,
  selectedCropTypes,
  experienceRange,
  minRating,
  toggleFarmingMethod,
  toggleCropType,
  setExperienceRange,
  setMinRating,
  clearFilters
}: AdvancedFiltersProps) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="mb-8 bg-background/50 border rounded-xl p-6"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium flex items-center">
          <ListFilter size={18} className="mr-2" />
          Advanced Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Leaf size={16} className="mr-2 text-primary" />
            Farming Methods
          </h4>
          <div className="space-y-2">
            {farmingMethods.map(method => (
              <div key={method} className="flex items-center">
                <Checkbox 
                  id={`method-${method}`} 
                  checked={selectedFarmingMethods.includes(method)}
                  onCheckedChange={() => toggleFarmingMethod(method)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/30"
                />
                <Label htmlFor={`method-${method}`} className="ml-2 text-sm">
                  {method}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center">
            <Wheat size={16} className="mr-2 text-primary" />
            Crop Types
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {cropTypes.map(type => (
              <div key={type} className="flex items-center">
                <Checkbox 
                  id={`crop-${type}`} 
                  checked={selectedCropTypes.includes(type)}
                  onCheckedChange={() => toggleCropType(type)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-primary/30"
                />
                <Label htmlFor={`crop-${type}`} className="ml-2 text-sm">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="experience" className="text-sm font-medium">
              Experience
            </Label>
            <Select value={experienceRange} onValueChange={setExperienceRange}>
              <SelectTrigger id="experience" className="mt-1">
                <SelectValue placeholder="Any experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any experience</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10-20">10-20 years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="rating" className="text-sm font-medium">
              Minimum Rating
            </Label>
            <Select value={minRating} onValueChange={setMinRating}>
              <SelectTrigger id="rating" className="mt-1">
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any rating</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="3.5">3.5+ stars</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
