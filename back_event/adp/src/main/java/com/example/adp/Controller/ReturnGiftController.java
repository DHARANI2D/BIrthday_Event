package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.ReturnGiftDto;
import com.example.adp.Services.ReturnGiftService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/return-gifts")
public class ReturnGiftController {

    private ReturnGiftService returnGiftService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<ReturnGiftDto> createReturnGift(@RequestBody ReturnGiftDto returnGiftDto) {
        ReturnGiftDto savedReturnGift = returnGiftService.createReturnGift(returnGiftDto);
        return new ResponseEntity<>(savedReturnGift, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ReturnGiftDto> getReturnGiftById(@PathVariable("id") Long returnGiftId) {
        ReturnGiftDto returnGiftDto = returnGiftService.getReturnGiftById(returnGiftId);
        return ResponseEntity.ok(returnGiftDto);
    }

    @GetMapping
    public ResponseEntity<List<ReturnGiftDto>> getAllReturnGifts() {
        List<ReturnGiftDto> returnGifts = returnGiftService.getAllReturnGifts();
        return ResponseEntity.ok(returnGifts);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<ReturnGiftDto> updateReturnGift(@PathVariable("id") Long returnGiftId, @RequestBody ReturnGiftDto returnGiftDto) {
        ReturnGiftDto updatedReturnGift = returnGiftService.updateReturnGift(returnGiftId, returnGiftDto);
        return ResponseEntity.ok(updatedReturnGift);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteReturnGift(@PathVariable("id") Long returnGiftId) {
        returnGiftService.deleteReturnGift(returnGiftId);
        return ResponseEntity.noContent().build();
    }
}
