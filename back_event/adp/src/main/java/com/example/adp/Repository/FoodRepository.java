package com.example.adp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adp.Model.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

}
