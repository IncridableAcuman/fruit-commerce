package com.app.backend.utils;

import com.app.backend.dto.CartData;
import com.app.backend.dto.CartItemData;
import com.app.backend.entities.Cart;
import com.app.backend.entities.CartItem;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartMapper {

    public CartData cartData(Cart cart){
        List<CartItemData> itemData=cart.getCartItems()
                .stream()
                .map(this::toItemData)
                .toList();
        return new CartData(cart.getId(), cart.getUser().getId(),itemData);
    }

    public CartItemData toItemData(CartItem item){
        return new CartItemData(
                item.getId(),
                item.getProduct().getTitle(),
                item.getProduct().getPrice(),
                item.getProduct().getImage(),
                item.getQuantity()
        );
    }
}
