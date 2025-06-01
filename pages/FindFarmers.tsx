
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { farmers } from "@/data/farmers";
import { FarmerCardGrid } from "@/components/farmers/FarmerCardGrid";
import { FarmerCardList } from "@/components/farmers/FarmerCardList";
import { FarmerSearch } from "@/components/farmers/FarmerSearch";
import { AdvancedFilters } from "@/components/farmers/AdvancedFilters";
import { ActiveFilters } from "@/components/farmers/ActiveFilters";
import { filterFarmers, getAllFarmingMethods, getAllCropTypes } from "@/utils/farmerFilters";

const FindFarmers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedFarmingMethods, setSelectedFarmingMethods] = useState<string[]>([]);
  const [selectedCropTypes, setSelectedCropTypes] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState("");
  const [minRating, setMinRating] = useState("");
  
  const allFarmingMethods = getAllFarmingMethods(farmers);
  const allCropTypes = getAllCropTypes(farmers);
  
  const toggleFarmingMethod = (method: string) => {
    setSelectedFarmingMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method) 
        : [...prev, method]
    );
  };
  
  const toggleCropType = (type: string) => {
    setSelectedCropTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setSpecialty("");
    setSelectedFarmingMethods([]);
    setSelectedCropTypes([]);
    setExperienceRange("");
    setMinRating("");
  };
  
  const filteredFarmers = filterFarmers(
    farmers,
    searchTerm,
    location,
    specialty,
    selectedFarmingMethods,
    selectedCropTypes,
    experienceRange,
    minRating
  );

  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Local Farmers
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect directly with local farmers and producers to source fresh, quality produce for your business or home.
            </motion.p>
            
            <FarmerSearch 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              location={location}
              setLocation={setLocation}
              specialty={specialty}
              setSpecialty={setSpecialty}
              viewMode={viewMode}
              setViewMode={setViewMode}
              toggleFilters={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>
          
          <AdvancedFilters 
            isOpen={isFilterOpen}
            farmingMethods={allFarmingMethods}
            cropTypes={allCropTypes}
            selectedFarmingMethods={selectedFarmingMethods}
            selectedCropTypes={selectedCropTypes}
            experienceRange={experienceRange}
            minRating={minRating}
            toggleFarmingMethod={toggleFarmingMethod}
            toggleCropType={toggleCropType}
            setExperienceRange={setExperienceRange}
            setMinRating={setMinRating}
            clearFilters={clearFilters}
          />
          
          <ActiveFilters 
            selectedFarmingMethods={selectedFarmingMethods}
            selectedCropTypes={selectedCropTypes}
            experienceRange={experienceRange}
            minRating={minRating}
            toggleFarmingMethod={toggleFarmingMethod}
            toggleCropType={toggleCropType}
            setExperienceRange={setExperienceRange}
            setMinRating={setMinRating}
          />
          
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredFarmers.length} farmers
            </p>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFarmers.map((farmer) => (
                <FarmerCardGrid key={farmer.id} farmer={farmer} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredFarmers.map((farmer) => (
                <FarmerCardList key={farmer.id} farmer={farmer} />
              ))}
            </div>
          )}
          
          {filteredFarmers.length === 0 && (
            <div className="text-center py-16 bg-secondary/30 rounded-xl">
              <h3 className="text-xl font-medium mb-2">No farmers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
          
          {filteredFarmers.length > 0 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default FindFarmers;
