package com.example.Dashboard.repository;

import com.example.Dashboard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findDistinctCategories();

    List<Product> findByCategory(String category);

    List<Product> findByTitleContainingIgnoreCase(String title);

    List<Product> findByCreatedAtBetween(LocalDate start, LocalDate end);

    List<Product> findByTitleContainingIgnoreCaseAndCreatedAtBetween(
        String title,
        LocalDate start,
        LocalDate end
    );

    List<Product> findByCategoryAndTitleContainingIgnoreCase(
        String category,
        String title
    );

    List<Product> findByCategoryAndCreatedAtBetween(
        String category,
        LocalDate start,
        LocalDate end
    );

    List<Product> findByCategoryAndTitleContainingIgnoreCaseAndCreatedAtBetween(
        String category,
        String title,
        LocalDate start,
        LocalDate end
    );
}
