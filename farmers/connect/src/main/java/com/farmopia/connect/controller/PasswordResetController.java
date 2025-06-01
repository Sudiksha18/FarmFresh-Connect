package com.farmopia.connect.controller;

import com.farmopia.connect.entity.Customer;
import com.farmopia.connect.entity.Farmer;
import com.farmopia.connect.repository.CustomerRepository;
import com.farmopia.connect.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/reset-password")
public class PasswordResetController {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        // In a real application, you would validate the token here
        // For simplicity, we'll assume the token is valid and just update the password

        Optional<Farmer> farmer = farmerRepository.findByEmail(request.getEmail());
        if (farmer.isPresent()) {
            Farmer existingFarmer = farmer.get();
            existingFarmer.setPassword(request.getPassword());
            farmerRepository.save(existingFarmer);
            return ResponseEntity.ok("Password reset successful");
        }

        Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
        if (customer.isPresent()) {
            Customer existingCustomer = customer.get();
            existingCustomer.setPassword(request.getPassword());
            customerRepository.save(existingCustomer);
            return ResponseEntity.ok("Password reset successful");
        }

        return ResponseEntity.status(404).body("Email not found");
    }

    public static class ResetPasswordRequest {
        private String email;
        private String password;

        // Getters and setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}