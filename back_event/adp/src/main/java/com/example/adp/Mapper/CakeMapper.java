package com.example.adp.Mapper;

import com.example.adp.Dto.CakeDto;
import com.example.adp.Model.Cake;

public class CakeMapper {

    public static CakeDto mapToCakeDto(Cake cake) {
        return new CakeDto(
                cake.getId(),
                cake.getCakeName(),
                cake.getPrice(),
                cake.getFlavour(),
                cake.getType(),
                cake.getQuantity(),
                cake.getImgUrl(),
                cake.isWishlisted());
    }

    public static Cake mapToCake(CakeDto cakeDto) {
        Cake cake = new Cake();
        cake.setId(cakeDto.getId());
        cake.setCakeName(cakeDto.getCakeName());
        cake.setPrice(cakeDto.getPrice());
        cake.setFlavour(cakeDto.getFlavour());
        cake.setType(cakeDto.getType());
        cake.setQuantity(cakeDto.getQuantity());
        cake.setImgUrl(cakeDto.getImgUrl());
        cake.setWishlisted(cakeDto.isWishlisted());
        return cake;
    }
}
