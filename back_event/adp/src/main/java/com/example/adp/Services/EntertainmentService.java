package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.EntertainmentDto;

public interface EntertainmentService {
    EntertainmentDto createEntertainment(EntertainmentDto entertainmentDto);

    EntertainmentDto getEntertainmentById(Long entertainmentId);

    List<EntertainmentDto> getAllEntertainmentServices();

    EntertainmentDto updateEntertainment(Long entertainmentId, EntertainmentDto entertainmentDto);

    void deleteEntertainment(Long entertainmentId);
    
}
