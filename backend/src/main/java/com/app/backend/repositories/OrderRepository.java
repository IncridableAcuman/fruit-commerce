package com.app.backend.repositories;

import com.app.backend.entities.Order;
import com.app.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);
}
