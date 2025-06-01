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
@RequestMapping("/api/signin")
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
public class UserController {

    @Autowired
    private FarmerRepository farmerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<String> signIn(@RequestBody SignInRequest request) {
        Optional<Farmer> farmer = farmerRepository.findByEmail(request.getEmail());
        if (farmer.isPresent() && farmer.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.ok("Farmer signed in successfully");
        }

        Optional<Customer> customer = customerRepository.findByEmail(request.getEmail());
        if (customer.isPresent() && customer.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.ok("Customer signed in successfully");
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    public static class SignInRequest {
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
