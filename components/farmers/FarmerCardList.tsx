
import React from "react";
import { motion } from "framer-motion";
import { Star, ChevronRight, MessageCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Farmer } from "@/data/farmers";

interface FarmerCardListProps {
  farmer: Farmer;
}

export const FarmerCardList = ({ farmer }: FarmerCardListProps) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/3 md:w-1/4 relative">
          <img 
            src={farmer.image} 
            alt={farmer.name} 
            className="w-full h-48 sm:h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/30 to-transparent sm:bg-gradient-to-t"></div>
          <div className="absolute top-4 left-4 flex items-center space-x-2 text-white">
            <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
            <span className="font-medium">{farmer.rating}</span>
            <span className="text-sm text-white/80">({farmer.reviews})</span>
          </div>
        </div>
        
        <div className="p-6 sm:w-2/3 md:w-3/4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium">{farmer.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{farmer.location}</span>
                  <span className="mx-2">•</span>
                  <span>{farmer.distance}</span>
                </div>
              </div>
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={farmer.avatar} alt={farmer.farmerName} />
                <AvatarFallback>{farmer.farmerName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm mr-4">
                <span className="font-medium">Farmer:</span> {farmer.farmerName} ({farmer.experience})
              </div>
              
              <div className="flex flex-wrap gap-2">
                {farmer.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="font-normal">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1.5 pt-1">
              {farmer.farmingMethods.map((method) => (
                <Badge key={method} variant="outline" className="bg-primary/5 text-primary-foreground/90 border-primary/20 font-normal text-xs">
                  {method}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">{farmer.description}</p>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Link to={`/farmers/${farmer.id}`} className="flex-1">
              <Button variant="outline" className="w-full group">
                View Profile
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button className="bg-primary hover:bg-primary/90">
              <MessageCircle size={16} className="mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
