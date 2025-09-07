package com.app.backend.controllers;

import com.app.backend.services.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carts/cart")
@RequiredArgsConstructor
public class CartController
{
    private final CartService cartService;
}
