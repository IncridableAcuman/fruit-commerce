package com.app.backend.controllers;

import com.app.backend.dto.CartData;
import com.app.backend.services.CartService;
import com.app.backend.utils.CartMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController
{
    private final CartService cartService;
    private final CartMapper cartMapper;

    @GetMapping("/cart/{userId}")
    public ResponseEntity<CartData> getCartForUser(@PathVariable Long userId){
        return ResponseEntity.status(200).body(cartMapper.cartData(cartService.getCartForUser(userId)));
    }
}
