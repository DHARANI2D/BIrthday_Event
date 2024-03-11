package com.example.adp.Mapper;

import com.example.adp.Dto.DecorationDto;
import com.example.adp.Model.Decorations;

public class DecorationMapper {

    public static DecorationDto mapToDecorationDto(Decorations decoration) {
        return new DecorationDto(
                decoration.getId(),
                decoration.getName(),
                decoration.getType(),
                decoration.isAvailable(),
                decoration.getArea(),
                decoration.getPrice(),
                decoration.isWishlisted());
    }

    public static Decorations mapToDecoration(DecorationDto decorationDto) {
        Decorations decoration = new Decorations();
        decoration.setId(decorationDto.getId());
        decoration.setName(decorationDto.getName());
        decoration.setType(decorationDto.getType());
        decoration.setAvailable(decorationDto.isAvailable());
        decoration.setArea(decorationDto.getArea());
        decoration.setPrice(decorationDto.getPrice());
        decoration.setWishlisted(decorationDto.isWishlisted());
        return decoration;
    }
}
