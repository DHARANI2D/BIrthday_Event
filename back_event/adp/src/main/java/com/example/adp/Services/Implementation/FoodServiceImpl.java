package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.FoodDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.FoodMapper;
import com.example.adp.Model.Food;
import com.example.adp.Repository.FoodRepository;
import com.example.adp.Services.FoodService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Override
    public FoodDto createFood(FoodDto foodDto) {
        Food food = FoodMapper.mapToFood(foodDto);
        Food savedFood = foodRepository.save(food);
        return FoodMapper.mapToFoodDto(savedFood);
    }

    @Override
    public FoodDto getFoodById(Long foodId) {
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));
        return FoodMapper.mapToFoodDto(food);
    }

    @Override
    public List<FoodDto> getAllFoods() {
        List<Food> foods = foodRepository.findAll();
        return foods.stream().map(FoodMapper::mapToFoodDto).collect(Collectors.toList());
    }

    @Override
    public FoodDto updateFood(Long foodId, FoodDto foodDto) {
        Food existingFood = foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));
        Food updatedFood = FoodMapper.mapToFood(foodDto);
        updatedFood.setId(existingFood.getId());
        Food savedFood = foodRepository.save(updatedFood);
        return FoodMapper.mapToFoodDto(savedFood);
    }

    @Override
    public void deleteFood(Long foodId) {
        foodRepository.deleteById(foodId);
    }


}
