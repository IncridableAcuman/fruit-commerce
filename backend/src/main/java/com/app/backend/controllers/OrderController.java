package com.app.backend.controllers;

import com.app.backend.dto.OrderResponse;
import com.app.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponse> orderPlace(@RequestParam Long id){
        return ResponseEntity.ok(orderService.createOrder(id));
    }
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(@RequestParam Long id){
        return ResponseEntity.ok(orderService.getOrders(id));
    }
}
