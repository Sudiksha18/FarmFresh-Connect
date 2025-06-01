package com.farmopia.connect.controller;

import com.farmopia.connect.entity.Customer;
import com.farmopia.connect.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/signup/customer")
@CrossOrigin(origins = "http://localhost:5173") // Replace with your frontend URL
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<String> signUpCustomer(@Validated @RequestBody Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customer.getEmail());
        if (existingCustomer.isPresent()) {
            return ResponseEntity.status(409).body("Email already in use");
        }
        customerRepository.save(customer);
        return ResponseEntity.status(201).body("Customer signed up successfully");
    }
}