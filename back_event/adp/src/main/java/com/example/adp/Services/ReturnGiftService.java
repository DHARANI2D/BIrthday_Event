package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.ReturnGiftDto;

public interface ReturnGiftService {
    ReturnGiftDto createReturnGift(ReturnGiftDto returnGiftDto);

    ReturnGiftDto getReturnGiftById(Long returnGiftId);

    List<ReturnGiftDto> getAllReturnGifts();

    ReturnGiftDto updateReturnGift(Long returnGiftId, ReturnGiftDto returnGiftDto);

    void deleteReturnGift(Long returnGiftId);
    
}
