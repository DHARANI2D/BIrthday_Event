package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.ReturnGiftDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.ReturnGiftMapper;
import com.example.adp.Model.Returngift;
import com.example.adp.Repository.ReturnGiftRepository;
import com.example.adp.Services.ReturnGiftService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReturnGiftServiceImpl implements ReturnGiftService {

    private final ReturnGiftRepository returnGiftRepository;

    @Override
    public ReturnGiftDto createReturnGift(ReturnGiftDto returnGiftDto) {
        Returngift returnGift = ReturnGiftMapper.mapToReturnGift(returnGiftDto);
        Returngift savedReturnGift = returnGiftRepository.save(returnGift);
        return ReturnGiftMapper.mapToReturnGiftDto(savedReturnGift);
    }

    @Override
    public ReturnGiftDto getReturnGiftById(Long returnGiftId) {
        Returngift returnGift = returnGiftRepository.findById(returnGiftId)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnGift not found with id: " + returnGiftId));
        return ReturnGiftMapper.mapToReturnGiftDto(returnGift);
    }

    @Override
    public List<ReturnGiftDto> getAllReturnGifts() {
        List<Returngift> returnGifts = returnGiftRepository.findAll();
        return returnGifts.stream().map(ReturnGiftMapper::mapToReturnGiftDto).collect(Collectors.toList());
    }

    @Override
    public ReturnGiftDto updateReturnGift(Long returnGiftId, ReturnGiftDto returnGiftDto) {
        Returngift existingReturnGift = returnGiftRepository.findById(returnGiftId)
                .orElseThrow(() -> new ResourceNotFoundException("ReturnGift not found with id: " + returnGiftId));
        Returngift updatedReturnGift = ReturnGiftMapper.mapToReturnGift(returnGiftDto);
        updatedReturnGift.setId(existingReturnGift.getId());
        Returngift savedReturnGift = returnGiftRepository.save(updatedReturnGift);
        return ReturnGiftMapper.mapToReturnGiftDto(savedReturnGift);
    }

    @Override
    public void deleteReturnGift(Long returnGiftId) {
        returnGiftRepository.deleteById(returnGiftId);
    }

}
