
import type { Farmer } from "@/data/farmers";

export const filterFarmers = (
  farmers: Farmer[],
  searchTerm: string,
  location: string,
  specialty: string,
  selectedFarmingMethods: string[],
  selectedCropTypes: string[],
  experienceRange: string,
  minRating: string
): Farmer[] => {
  return farmers.filter(farmer => {
    const matchesSearch = searchTerm === "" || 
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      farmer.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = location === "" || 
      farmer.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesSpecialty = specialty === "" || specialty === "all" || 
      farmer.specialties.some(s => s.toLowerCase() === specialty.toLowerCase());
    
    const matchesFarmingMethods = selectedFarmingMethods.length === 0 || 
      selectedFarmingMethods.every(method => 
        farmer.farmingMethods.includes(method));
    
    const matchesCropTypes = selectedCropTypes.length === 0 || 
      selectedCropTypes.some(type => 
        farmer.cropTypes?.includes(type));
    
    let matchesExperience = true;
    if (experienceRange && experienceRange !== "any") {
      const yearsExperience = parseInt(farmer.experience);
      switch (experienceRange) {
        case "0-5":
          matchesExperience = yearsExperience <= 5;
          break;
        case "5-10":
          matchesExperience = yearsExperience > 5 && yearsExperience <= 10;
          break;
        case "10-20":
          matchesExperience = yearsExperience > 10 && yearsExperience <= 20;
          break;
        case "20+":
          matchesExperience = yearsExperience > 20;
          break;
      }
    }
    
    const matchesRating = minRating === "" || minRating === "any" || 
      farmer.rating >= parseFloat(minRating);
    
    return matchesSearch && matchesLocation && matchesSpecialty && 
      matchesFarmingMethods && matchesCropTypes && 
      matchesExperience && matchesRating;
  });
};

export const getAllFarmingMethods = (farmers: Farmer[]): string[] => {
  return Array.from(
    new Set(farmers.flatMap(farmer => farmer.farmingMethods))
  ).sort();
};

export const getAllCropTypes = (farmers: Farmer[]): string[] => {
  return Array.from(
    new Set(farmers.flatMap(farmer => farmer.cropTypes || []))
  ).sort();
};
