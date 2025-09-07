package com.app.backend.dto;

import java.util.List;

public record CartData(
                       Long id,
                       Long userId,
                       List<CartItemData> itemData
) {
}
