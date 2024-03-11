package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.FoodDto;

public interface FoodService {
    FoodDto createFood(FoodDto foodDto);

    FoodDto getFoodById(Long foodId);

    List<FoodDto> getAllFoods();

    FoodDto updateFood(Long foodId, FoodDto foodDto);

    void deleteFood(Long foodId);
    
}
