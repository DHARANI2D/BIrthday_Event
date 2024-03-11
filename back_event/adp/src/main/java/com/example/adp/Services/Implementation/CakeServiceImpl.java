package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.CakeDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.CakeMapper;
import com.example.adp.Model.Cake;
import com.example.adp.Repository.CakeRepository;
import com.example.adp.Services.CakeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CakeServiceImpl implements CakeService {

    private final CakeRepository cakeRepository;

    @Override
    public CakeDto createCake(CakeDto cakeDto) {
        Cake cake = CakeMapper.mapToCake(cakeDto);
        Cake savedCake = cakeRepository.save(cake);
        return CakeMapper.mapToCakeDto(savedCake);
    }

    @Override
    public CakeDto getCakeById(Long cakeId) {
        Cake cake = cakeRepository.findById(cakeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cake not found with id: " + cakeId));
        return CakeMapper.mapToCakeDto(cake);
    }

    @Override
    public List<CakeDto> getAllCakes() {
        List<Cake> cakes = cakeRepository.findAll();
        return cakes.stream().map(CakeMapper::mapToCakeDto).collect(Collectors.toList());
    }

    @Override
    public CakeDto updateCake(Long cakeId, CakeDto cakeDto) {
        Cake existingCake = cakeRepository.findById(cakeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cake not found with id: " + cakeId));
        Cake updatedCake = CakeMapper.mapToCake(cakeDto);
        updatedCake.setId(existingCake.getId());
        Cake savedCake = cakeRepository.save(updatedCake);
        return CakeMapper.mapToCakeDto(savedCake);
    }

    @Override
    public void deleteCake(Long cakeId) {
        cakeRepository.deleteById(cakeId);
    }

}
