package com.app.backend.dto;

import com.app.backend.enums.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductRequest {
    @NotBlank(message = "Title must be required")
    @Size(min = 10,max = 50,message = "Title must between 10 and 50 character")
    private String title;
    @NotBlank(message = "Description must be required")
    @Size(min = 20,max = 350,message = "Description must between 10 and 50 character")
    private String description;
    @NotNull(message = "Price must be required")
    private Double price;
    @NotBlank(message = "Image must be required")
    private MultipartFile image;
    private Category category;
}
