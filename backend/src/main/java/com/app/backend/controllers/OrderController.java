package com.app.backend.controllers;

import com.app.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
}
