package com.farmopia.connect.controller;

import com.farmopia.connect.entity.Farmer;
import com.farmopia.connect.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/signup/farmer")
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
public class FarmerController {

    @Autowired
    private FarmerRepository farmerRepository;

    @PostMapping
    public ResponseEntity<String> signUpFarmer(@Validated @RequestBody Farmer farmer) {
        Optional<Farmer> existingFarmer = farmerRepository.findByEmail(farmer.getEmail());
        if (existingFarmer.isPresent()) {
            return ResponseEntity.status(409).body("Email already in use");
        }
        farmerRepository.save(farmer);
        return ResponseEntity.status(201).body("Farmer signed up successfully");
    }
}