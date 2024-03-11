package com.example.adp.Mapper;

import com.example.adp.Dto.EntertainmentDto;
import com.example.adp.Model.Entertainment;

public class EntertainmentMapper {

    public static EntertainmentDto mapToEntertainmentDto(Entertainment entertainment) {
        return new EntertainmentDto(
                entertainment.getId(),
                entertainment.getName(),
                entertainment.getType(),
                entertainment.getDuration(),
                entertainment.getPrice(),
                entertainment.isAvailable(),
                entertainment.isWishlisted());
                }

    public static Entertainment mapToEntertainment(EntertainmentDto entertainmentDto) {
        Entertainment entertainment = new Entertainment();
        entertainment.setId(entertainmentDto.getId());
        entertainment.setName(entertainmentDto.getName());
        entertainment.setType(entertainmentDto.getType());
        entertainment.setDuration(entertainmentDto.getDuration());
        entertainment.setPrice(entertainmentDto.getPrice());
        entertainment.setAvailable(entertainmentDto.isAvailable());
        entertainment.setWishlisted(entertainmentDto.isWishlisted());
        return entertainment;
    }

}
