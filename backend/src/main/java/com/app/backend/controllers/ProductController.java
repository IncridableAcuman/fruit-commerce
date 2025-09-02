package com.app.backend.controllers;

import com.app.backend.dto.ProductRequest;
import com.app.backend.dto.ProductResponse;
import com.app.backend.enums.Category;
import com.app.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

//    create product only admin
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/product/create")
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request){
        return ResponseEntity.status(201).body(productService.createProduct(request));
    }
//    get product all
    @GetMapping("/data/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        return ResponseEntity.status(200).body(productService.getAllProducts());
    }
//    get product by category
    @GetMapping("/categories/{category}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByCategory(@PathVariable Category category){
        return ResponseEntity.status(200).body(productService.getAllProductsByCategory(category));
    }
//    delete product only admin
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.status(200).body("Product deleted successfully");
    }
//    update product only admin
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/product/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,@Valid @RequestBody ProductRequest request){
        return ResponseEntity.status(200).body(productService.updateProduct(id,request));
    }
}
