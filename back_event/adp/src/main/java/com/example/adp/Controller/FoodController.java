package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.FoodDto;
import com.example.adp.Services.FoodService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private FoodService foodService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<FoodDto> createFood(@RequestBody FoodDto foodDto) {
        FoodDto savedFood = foodService.createFood(foodDto);
        return new ResponseEntity<>(savedFood, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<FoodDto> getFoodById(@PathVariable("id") Long foodId) {
        FoodDto foodDto = foodService.getFoodById(foodId);
        return ResponseEntity.ok(foodDto);
    }

    @GetMapping
    public ResponseEntity<List<FoodDto>> getAllFoods() {
        List<FoodDto> foods = foodService.getAllFoods();
        return ResponseEntity.ok(foods);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<FoodDto> updateFood(@PathVariable("id") Long foodId, @RequestBody FoodDto foodDto) {
        FoodDto updatedFood = foodService.updateFood(foodId, foodDto);
        return ResponseEntity.ok(updatedFood);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable("id") Long foodId) {
        foodService.deleteFood(foodId);
        return ResponseEntity.noContent().build();
    }
}
