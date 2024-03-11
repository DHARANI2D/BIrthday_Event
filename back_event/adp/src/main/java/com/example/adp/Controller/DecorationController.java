package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.DecorationDto;
import com.example.adp.Services.DecorationService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/decorations")
public class DecorationController {

    private DecorationService decorationService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<DecorationDto> createDecoration(@RequestBody DecorationDto decorationDto) {
        DecorationDto savedDecoration = decorationService.createDecoration(decorationDto);
        return new ResponseEntity<>(savedDecoration, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<DecorationDto> getDecorationById(@PathVariable("id") Long decorationId) {
        DecorationDto decorationDto = decorationService.getDecorationById(decorationId);
        return ResponseEntity.ok(decorationDto);
    }

    @GetMapping
    public ResponseEntity<List<DecorationDto>> getAllDecorations() {
        List<DecorationDto> decorations = decorationService.getAllDecorations();
        return ResponseEntity.ok(decorations);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<DecorationDto> updateDecoration(@PathVariable("id") Long decorationId, @RequestBody DecorationDto decorationDto) {
        DecorationDto updatedDecoration = decorationService.updateDecoration(decorationId, decorationDto);
        return ResponseEntity.ok(updatedDecoration);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDecoration(@PathVariable("id") Long decorationId) {
        decorationService.deleteDecoration(decorationId);
        return ResponseEntity.noContent().build();
    }
}
