package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.PhotographyDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.PhotographyMapper;
import com.example.adp.Model.Photography;
import com.example.adp.Repository.PhotographyRepository;
import com.example.adp.Services.PhotographyService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PhotographyServiceImpl implements PhotographyService {

    private final PhotographyRepository photographyRepository;

    @Override
    public PhotographyDto createPhotography(PhotographyDto photographyDto) {
        Photography photography = PhotographyMapper.mapToPhotography(photographyDto);
        Photography savedPhotography = photographyRepository.save(photography);
        return PhotographyMapper.mapToPhotographyDto(savedPhotography);
    }

    @Override
    public PhotographyDto getPhotographyById(Long photographyId) {
        Photography photography = photographyRepository.findById(photographyId)
                .orElseThrow(() -> new ResourceNotFoundException("Photography service not found with id: " + photographyId));
        return PhotographyMapper.mapToPhotographyDto(photography);
    }

    @Override
    public List<PhotographyDto> getAllPhotographyServices() {
        List<Photography> photographyServices = photographyRepository.findAll();
        return photographyServices.stream().map(PhotographyMapper::mapToPhotographyDto).collect(Collectors.toList());
    }

    @Override
    public PhotographyDto updatePhotography(Long photographyId, PhotographyDto photographyDto) {
        Photography existingPhotography = photographyRepository.findById(photographyId)
                .orElseThrow(() -> new ResourceNotFoundException("Photography service not found with id: " + photographyId));
        Photography updatedPhotography = PhotographyMapper.mapToPhotography(photographyDto);
        updatedPhotography.setId(existingPhotography.getId());
        Photography savedPhotography = photographyRepository.save(updatedPhotography);
        return PhotographyMapper.mapToPhotographyDto(savedPhotography);
    }

    @Override
    public void deletePhotography(Long photographyId) {
        photographyRepository.deleteById(photographyId);
    }


}
