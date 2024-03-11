package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.PhotographyDto;

public interface PhotographyService {
    PhotographyDto createPhotography(PhotographyDto photographyDto);

    PhotographyDto getPhotographyById(Long photographyId);

    List<PhotographyDto> getAllPhotographyServices();

    PhotographyDto updatePhotography(Long photographyId, PhotographyDto photographyDto);

    void deletePhotography(Long photographyId);
    
}
