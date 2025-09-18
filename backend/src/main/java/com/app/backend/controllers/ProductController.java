package com.app.backend.controllers;

import com.app.backend.dto.ProductRequest;
import com.app.backend.dto.ProductResponse;
import com.app.backend.enums.Category;
import com.app.backend.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping("/product/create")
    public ResponseEntity<ProductResponse> createProduct(@Valid @ModelAttribute ProductRequest request){return ResponseEntity.status(201).body(productService.createProduct(request));}
    @GetMapping("/data/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts(){return ResponseEntity.status(200).body(productService.getAllProducts());}
    @GetMapping("/categories/{category}")
    public ResponseEntity<List<ProductResponse>> getAllProductsByCategory(@PathVariable Category category){return ResponseEntity.status(200).body(productService.getAllProductsByCategory(category));}
    @GetMapping("/product/{id}")
    public ResponseEntity<ProductResponse> getProductByID(@PathVariable Long id){return ResponseEntity.status(200).body(productService.getProductByID(id));}
    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.status(200).body("Product deleted successfully");}
    @PutMapping("/product/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long id,@Valid @ModelAttribute @RequestBody ProductRequest request){return ResponseEntity.status(200).body(productService.updateProduct(id,request));}
}
