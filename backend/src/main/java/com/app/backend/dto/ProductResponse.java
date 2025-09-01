package com.app.backend.dto;

import com.app.backend.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String image;
    private Category category;
    private LocalDateTime createdAt;
}
