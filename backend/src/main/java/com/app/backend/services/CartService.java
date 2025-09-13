package com.app.backend.services;

import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import com.app.backend.entities.Product;
import com.app.backend.entities.User;
import com.app.backend.exceptions.NotFoundExceptionHandler;
import com.app.backend.repositories.CartRepository;
import com.app.backend.repositories.ProductRepository;
import com.app.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    //    get cart for user
    @Transactional
    public Cart getCartForUser(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundExceptionHandler("User not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new ArrayList<>());
            cart.setTotal(0.0);
            return cartRepository.save(cart);
        });
    }
    //    add to cart
    @Transactional
    public Cart addToCart(Long userId,Long productId,int quantity){
        Cart cart=getCartForUser(userId);//user's cart
        Product product=productRepository.findById(productId).orElseThrow(()->new NotFoundExceptionHandler("Product ot found"));
        Optional<CartItem> items=cart.getCartItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
        if (items.isPresent()){
            items.get().setQuantity(items.get().getQuantity()+quantity);
        } else {
            CartItem item=new CartItem();
            item.setProduct(product);
            item.setCart(cart);
            item.setQuantity(quantity);
            cart.getCartItems().add(item);
        }
        double total=cart.getCartItems()
                .stream()
                .mapToDouble(itm->itm.getProduct().getPrice()*itm.getQuantity()).sum();
        cart.setTotal(total);
        return cartRepository.save(cart);
    }
//    remove cart
    @Transactional
    public Cart removeCart(Long userId,Long productId){
        Cart cart=getCartForUser(userId);
        cart.getCartItems().removeIf(item -> item.getProduct().getId().equals(productId));
        double total=cart.getCartItems().stream()
                .mapToDouble(item->item.getProduct().getPrice()*item.getQuantity()).sum();
        cart.setTotal(total);
        return cartRepository.save(cart);
    }
//    clear cart
    @Transactional
    public void clearCart(Long userId){
        Cart cart=getCartForUser(userId);
        cart.getCartItems().clear();
        cart.setTotal(0.0);
        cartRepository.save(cart);
    }
}