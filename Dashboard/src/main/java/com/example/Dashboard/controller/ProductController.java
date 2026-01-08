package com.example.Dashboard.controller;

import com.example.Dashboard.model.Product;
import com.example.Dashboard.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    @GetMapping
    public List<Product> getProducts(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) LocalDate startDate,
        @RequestParam(required = false) LocalDate endDate
    ) {
        return service.getProducts(search, category, startDate, endDate);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        return service.save(product);
    }

    @PutMapping("/{id}")
    public Product update(
        @PathVariable Long id,
        @RequestBody Product product
    ) {
        return service.update(id, product);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return service.getCategories();
}

}
