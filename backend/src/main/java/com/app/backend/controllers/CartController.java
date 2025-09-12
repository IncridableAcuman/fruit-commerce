package com.app.backend.controllers;

import com.app.backend.dto.CartData;
import com.app.backend.services.CartService;
import com.app.backend.utils.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/cart/add")
    public ResponseEntity<CartData> addToCart(
        @RequestParam Long userId,
        @RequestParam Long productId,
        @RequestParam int quantity
    ){
        return ResponseEntity.status(200).body(cartMapper.cartData(cartService.addToCart(userId,productId,quantity)));
    }
    @DeleteMapping("/cart/remove")
    public ResponseEntity<CartData> removeCart(@RequestParam Long userId,@RequestParam Long productId){
        return ResponseEntity.status(200).body(cartMapper.cartData(cartService.removeCart(userId,productId)));
    }
    @DeleteMapping("/cart/clear")
    public ResponseEntity<String> clearCart(@RequestParam Long userId){
        cartService.clearCart(userId);
        return ResponseEntity.status(200).body("Cart clear.");
    }
}
