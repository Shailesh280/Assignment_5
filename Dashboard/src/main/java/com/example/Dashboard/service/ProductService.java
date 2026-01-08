package com.example.Dashboard.service;

import com.example.Dashboard.exception.ResourceNotFoundException;
import com.example.Dashboard.model.Product;
import com.example.Dashboard.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

  private final ProductRepository repository;

  public List<Product> getProducts(
      String search,
      String category,
      LocalDate start,
      LocalDate end
  ) {

    boolean hasSearch = search != null && !search.isBlank();
    boolean hasCategory = category != null && !category.equalsIgnoreCase("all");
    boolean hasDateRange = start != null && end != null;

    if (hasSearch && hasCategory && hasDateRange) {
      return repository
          .findByCategoryAndTitleContainingIgnoreCaseAndCreatedAtBetween(
              category, search, start, end
          );
    }

    if (hasSearch && hasCategory) {
      return repository.findByCategoryAndTitleContainingIgnoreCase(category, search);
    }

    if (hasCategory && hasDateRange) {
      return repository.findByCategoryAndCreatedAtBetween(category, start, end);
    }

    if (hasCategory) {
      return repository.findByCategory(category);
    }

    if (hasSearch && hasDateRange) {
      return repository.findByTitleContainingIgnoreCaseAndCreatedAtBetween(search, start, end);
    }

    if (hasSearch) {
      return repository.findByTitleContainingIgnoreCase(search);
    }

    if (hasDateRange) {
      return repository.findByCreatedAtBetween(start, end);
    }

    return repository.findAll();
  }

  public Product save(Product product) {
    product.setId(null);
    product.setCreatedAt(LocalDate.now());
    return repository.save(product);
  }

  public Product update(Long id, Product updatedProduct) {
    Product existing = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

    existing.setTitle(updatedProduct.getTitle());
    existing.setDescription(updatedProduct.getDescription());
    existing.setPrice(updatedProduct.getPrice());
    existing.setBrand(updatedProduct.getBrand());
    existing.setCategory(updatedProduct.getCategory());
    existing.setThumbnail(updatedProduct.getThumbnail());

    return repository.save(existing);
  }

  public List<String> getCategories() {
    return repository.findDistinctCategories();
}

}
