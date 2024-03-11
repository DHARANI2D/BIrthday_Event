package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.PhotographyDto;
import com.example.adp.Services.PhotographyService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/photography")
public class PhotographyController {

    private PhotographyService photographyService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<PhotographyDto> createPhotography(@RequestBody PhotographyDto photographyDto) {
        PhotographyDto savedPhotography = photographyService.createPhotography(photographyDto);
        return new ResponseEntity<>(savedPhotography, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<PhotographyDto> getPhotographyById(@PathVariable("id") Long photographyId) {
        PhotographyDto photographyDto = photographyService.getPhotographyById(photographyId);
        return ResponseEntity.ok(photographyDto);
    }

    @GetMapping
    public ResponseEntity<List<PhotographyDto>> getAllPhotographyServices() {
        List<PhotographyDto> photographyServices = photographyService.getAllPhotographyServices();
        return ResponseEntity.ok(photographyServices);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<PhotographyDto> updatePhotography(@PathVariable("id") Long photographyId, @RequestBody PhotographyDto photographyDto) {
        PhotographyDto updatedPhotography = photographyService.updatePhotography(photographyId, photographyDto);
        return ResponseEntity.ok(updatedPhotography);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletePhotography(@PathVariable("id") Long photographyId) {
        photographyService.deletePhotography(photographyId);
        return ResponseEntity.noContent().build();
    }
}
