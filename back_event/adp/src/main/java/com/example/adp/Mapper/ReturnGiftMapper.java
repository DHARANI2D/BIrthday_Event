package com.example.adp.Mapper;

import com.example.adp.Dto.ReturnGiftDto;
import com.example.adp.Model.Returngift;

public class ReturnGiftMapper {

    public static ReturnGiftDto mapToReturnGiftDto(Returngift returnGift) {
        return new ReturnGiftDto(
                returnGift.getId(),
                returnGift.getName(),
                returnGift.getMinimumQuantity(),
                returnGift.getPrice(),
                returnGift.getStock(),
                returnGift.isWishlisted());
    }

    public static Returngift mapToReturnGift(ReturnGiftDto returnGiftDto) {
        Returngift returnGift = new Returngift();
        returnGift.setId(returnGiftDto.getId());
        returnGift.setName(returnGiftDto.getName());
        returnGift.setMinimumQuantity(returnGiftDto.getMinimumQuantity());
        returnGift.setPrice(returnGiftDto.getPrice());
        returnGift.setStock(returnGiftDto.getStock());
        returnGift.setWishlisted(returnGiftDto.isWishlisted());
        return returnGift;
    }
}
