package com.app.backend.services;

import com.app.backend.entities.Cart;
import com.app.backend.entities.User;
import com.app.backend.exceptions.NotFoundExceptionHandler;
import com.app.backend.repositories.CartRepository;
import com.app.backend.repositories.ProductRepository;
import com.app.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

//    get cart for user
    public Cart getCartForUser(Long userId){
        return cartRepository.findByUserId(userId).orElseGet(()->{
            User user=userRepository.findById(userId).orElseThrow(()->new NotFoundExceptionHandler("User not found"));
            Cart cart=new Cart();
            cart.setUser(user);
            cart.setCartItems(new ArrayList<>());
            cart.setTotal(0.0);
            return cartRepository.save(cart);
        });
    }
//    add to cart
//    update cart
//    remove cart
//    clear cart
}
