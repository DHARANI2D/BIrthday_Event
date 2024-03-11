package com.example.adp.Mapper;

import com.example.adp.Dto.FoodDto;
import com.example.adp.Model.Food;

public class FoodMapper {

    public static FoodDto mapToFoodDto(Food food) {
        return new FoodDto(
                food.getId(),
                food.getName(),
                food.getPrice(),
                food.getMinimumQuantity(),
                food.getMenu(),
                food.isAvailable(),
                food.isWishlisted());
    }

    public static Food mapToFood(FoodDto foodDto) {
        Food food = new Food();
        food.setId(foodDto.getId());
        food.setName(foodDto.getName());
        food.setPrice(foodDto.getPrice());
        food.setMinimumQuantity(foodDto.getMinimumQuantity());
        food.setMenu(foodDto.getMenu());
        food.setAvailable(foodDto.isAvailable());
        food.setWishlisted(foodDto.isWishlisted());
        return food;
    }
}
