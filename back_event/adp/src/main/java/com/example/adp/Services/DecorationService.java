package com.example.adp.Services;

import java.util.List;
import com.example.adp.Dto.DecorationDto;

public interface DecorationService {
    DecorationDto createDecoration(DecorationDto decorationDto);

    DecorationDto getDecorationById(Long decorationId);

    List<DecorationDto> getAllDecorations();

    DecorationDto updateDecoration(Long decorationId, DecorationDto decorationDto);

    void deleteDecoration(Long decorationId);
    
}
