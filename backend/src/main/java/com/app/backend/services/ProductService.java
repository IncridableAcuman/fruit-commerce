package com.app.backend.services;

import com.app.backend.dto.ProductRequest;
import com.app.backend.dto.ProductResponse;
import com.app.backend.entities.Product;
import com.app.backend.enums.Category;
import com.app.backend.exceptions.NotFoundExceptionHandler;
import com.app.backend.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional
    public Product create(ProductRequest request){
        Product product=new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImage(request.getImage());
        product.setCategory(request.getCategory());
        product.setCreatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }
    @Transactional
    public ProductResponse productResponse(Product product){
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getImage(),
                product.getCategory(),
                product.getCreatedAt()
        );
    }
//    create product only admin
    @Transactional
    public ProductResponse createProduct(ProductRequest request){
        Product product=create(request);
        return productResponse(product);
    }
//    get product all
    @Transactional
    public List<ProductResponse> getAllProducts(){
        List<Product> products=productRepository.findAll();
        return products.stream().map(this::productResponse).toList();
    }

//    get product by category
    @Transactional
    public List<ProductResponse> getAllProductsByCategory(Category category){
        List<Product> products = productRepository.findByCategory(category);
        return products.stream().map(this::productResponse).toList();
    }
//    get product by id
    @Transactional
    public ProductResponse getProductByID(Long id){
        Product product=productRepository.
                findById(id).
                orElseThrow(()->new NotFoundExceptionHandler("Product not found"));
        return productResponse(product);

    }
//    delete product only admin
    @Transactional
    public void deleteProduct(Long id){
        Product product=productRepository.
                findById(id).
                orElseThrow(()->new NotFoundExceptionHandler("Product mpt found"));
        productRepository.delete(product);
    }
//    update product only admin
    @Transactional
    public ProductResponse updateProduct(Long id,ProductRequest request){
        Product product=productRepository.
                findById(id).
                orElseThrow(()->new NotFoundExceptionHandler("Product not found"));
        create(request);
        return productResponse(product);
    }
}
