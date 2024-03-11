package com.example.adp.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.adp.Dto.EntertainmentDto;
import com.example.adp.Services.EntertainmentService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/entertainment")
public class EntertainmentController {

    private EntertainmentService entertainmentService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<EntertainmentDto> createEntertainment(@RequestBody EntertainmentDto entertainmentDto) {
        EntertainmentDto savedEntertainment = entertainmentService.createEntertainment(entertainmentDto);
        return new ResponseEntity<>(savedEntertainment, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<EntertainmentDto> getEntertainmentById(@PathVariable("id") Long entertainmentId) {
        EntertainmentDto entertainmentDto = entertainmentService.getEntertainmentById(entertainmentId);
        return ResponseEntity.ok(entertainmentDto);
    }

    @GetMapping
    public ResponseEntity<List<EntertainmentDto>> getAllEntertainmentServices() {
        List<EntertainmentDto> entertainmentServices = entertainmentService.getAllEntertainmentServices();
        return ResponseEntity.ok(entertainmentServices);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<EntertainmentDto> updateEntertainment(@PathVariable("id") Long entertainmentId, @RequestBody EntertainmentDto entertainmentDto) {
        EntertainmentDto updatedEntertainment = entertainmentService.updateEntertainment(entertainmentId, entertainmentDto);
        return ResponseEntity.ok(updatedEntertainment);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEntertainment(@PathVariable("id") Long entertainmentId) {
        entertainmentService.deleteEntertainment(entertainmentId);
        return ResponseEntity.noContent().build();
    }

}
