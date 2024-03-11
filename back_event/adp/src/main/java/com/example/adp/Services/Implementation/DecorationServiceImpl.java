package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.DecorationDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.DecorationMapper;
import com.example.adp.Model.Decorations;
import com.example.adp.Repository.DecorationRepository;
import com.example.adp.Services.DecorationService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DecorationServiceImpl implements DecorationService {

    private final DecorationRepository decorationRepository;

    @Override
    public DecorationDto createDecoration(DecorationDto decorationDto) {
        Decorations decoration = DecorationMapper.mapToDecoration(decorationDto);
        Decorations savedDecoration = decorationRepository.save(decoration);
        return DecorationMapper.mapToDecorationDto(savedDecoration);
    }

    @Override
    public DecorationDto getDecorationById(Long decorationId) {
        Decorations decoration = decorationRepository.findById(decorationId)
                .orElseThrow(() -> new ResourceNotFoundException("Decoration not found with id: " + decorationId));
        return DecorationMapper.mapToDecorationDto(decoration);
    }

    @Override
    public List<DecorationDto> getAllDecorations() {
        List<Decorations> decorations = decorationRepository.findAll();
        return decorations.stream().map(DecorationMapper::mapToDecorationDto).collect(Collectors.toList());
    }

    @Override
    public DecorationDto updateDecoration(Long decorationId, DecorationDto decorationDto) {
        Decorations existingDecoration = decorationRepository.findById(decorationId)
                .orElseThrow(() -> new ResourceNotFoundException("Decoration not found with id: " + decorationId));
        Decorations updatedDecoration = DecorationMapper.mapToDecoration(decorationDto);
        updatedDecoration.setId(existingDecoration.getId());
        Decorations savedDecoration = decorationRepository.save(updatedDecoration);
        return DecorationMapper.mapToDecorationDto(savedDecoration);
    }

    @Override
    public void deleteDecoration(Long decorationId) {
        decorationRepository.deleteById(decorationId);
    }


}
