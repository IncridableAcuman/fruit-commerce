package com.app.backend.dto;

public record CartItemData(Long productId,
                           String productTitle,
                           Double productPrice,
                           String productImage,
                           Integer quantity
) {
}
