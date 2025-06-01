package com.farmopia.connect.repository;

import com.farmopia.connect.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Additional query methods can go here
}
