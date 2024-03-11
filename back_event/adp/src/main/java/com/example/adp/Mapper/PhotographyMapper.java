package com.example.adp.Mapper;

import com.example.adp.Dto.PhotographyDto;
import com.example.adp.Model.Photography;

public class PhotographyMapper {

    public static PhotographyDto mapToPhotographyDto(Photography photography) {
        return new PhotographyDto(
                photography.getId(),
                photography.getName(),
                photography.getLocation(),
                photography.getPrice(),
                photography.isAvailable(),
                photography.isWishlisted());
    }

    public static Photography mapToPhotography(PhotographyDto photographyDto) {
        Photography photography = new Photography();
        photography.setId(photographyDto.getId());
        photography.setName(photographyDto.getName());
        photography.setLocation(photographyDto.getLocation());
        photography.setPrice(photographyDto.getPrice());
        photography.setAvailable(photographyDto.isAvailable());
        photography.setWishlisted(photographyDto.isWishlisted());
        return photography;
    }

}
