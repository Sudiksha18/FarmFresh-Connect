
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
  selectedFarmingMethods: string[];
  selectedCropTypes: string[];
  experienceRange: string;
  minRating: string;
  toggleFarmingMethod: (method: string) => void;
  toggleCropType: (type: string) => void;
  setExperienceRange: (range: string) => void;
  setMinRating: (rating: string) => void;
}

export const ActiveFilters = ({
  selectedFarmingMethods,
  selectedCropTypes,
  experienceRange,
  minRating,
  toggleFarmingMethod,
  toggleCropType,
  setExperienceRange,
  setMinRating
}: ActiveFiltersProps) => {
  const hasActiveFilters = 
    selectedFarmingMethods.length > 0 || 
    selectedCropTypes.length > 0 || 
    experienceRange || 
    minRating;
    
  if (!hasActiveFilters) return null;
  
  return (
    <div className="mb-6">
      <div className="text-sm text-muted-foreground mb-2">
        Active filters:
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedFarmingMethods.map(method => (
          <Badge 
            key={method} 
            variant="secondary" 
            className="flex items-center gap-1 pr-1.5"
            onClick={() => toggleFarmingMethod(method)}
          >
            {method}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </Badge>
        ))}
        
        {selectedCropTypes.map(type => (
          <Badge 
            key={type} 
            variant="secondary" 
            className="flex items-center gap-1 pr-1.5"
            onClick={() => toggleCropType(type)}
          >
            {type}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </Badge>
        ))}
        
        {experienceRange && (
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 pr-1.5"
            onClick={() => setExperienceRange("")}
          >
            Experience: {experienceRange} years
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </Badge>
        )}
        
        {minRating && (
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 pr-1.5"
            onClick={() => setMinRating("")}
          >
            {minRating}+ stars
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
};
