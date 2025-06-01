package com.farmopia.connect.controller;

import com.farmopia.connect.model.Item;
import com.farmopia.connect.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*") // For allowing requests from React dev server
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // GET all items
    @GetMapping
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    // POST a new item
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }
}
