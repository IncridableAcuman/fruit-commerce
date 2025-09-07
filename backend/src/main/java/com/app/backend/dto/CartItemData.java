package com.app.backend.dto;

public record CartItemData(Long id,
                           String productTitle,
                           Double productPrice,
                           String productImage,
                           Integer quantity
) {
}
