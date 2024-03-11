package com.example.adp.Services;

import java.util.List;
import com.example.adp.Dto.CakeDto;

public interface CakeService {
    CakeDto createCake(CakeDto cakeDto);

    CakeDto getCakeById(Long cakeId);

    List<CakeDto> getAllCakes();

    CakeDto updateCake(Long cakeId, CakeDto cakeDto);

    void deleteCake(Long cakeId);
    
}
