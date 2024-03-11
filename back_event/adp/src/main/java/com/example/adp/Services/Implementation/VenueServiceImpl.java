package com.example.adp.Services.Implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.adp.Dto.VenueDto;
import com.example.adp.Exception.ResourceNotFoundException;
import com.example.adp.Mapper.VenueMapper;
import com.example.adp.Model.Venue;
import com.example.adp.Repository.VenueRepository;
import com.example.adp.Services.VenueService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VenueServiceImpl implements VenueService {

    private final VenueRepository venueRepository;

    @Override
    public VenueDto createVenue(VenueDto venueDto) {
        Venue venue = VenueMapper.mapToVenue(venueDto);
        Venue savedVenue = venueRepository.save(venue);
        return VenueMapper.mapToVenueDto(savedVenue);
    }

    @Override
    public VenueDto getVenueById(Long venueId) {
        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));
        return VenueMapper.mapToVenueDto(venue);
    }

    @Override
    public List<VenueDto> getAllVenues() {
        List<Venue> venues = venueRepository.findAll();
        return venues.stream().map(VenueMapper::mapToVenueDto).collect(Collectors.toList());
    }

    @Override
    public VenueDto updateVenue(Long venueId, VenueDto venueDto) {
        Venue existingVenue = venueRepository.findById(venueId)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + venueId));
        Venue updatedVenue = VenueMapper.mapToVenue(venueDto);
        updatedVenue.setId(existingVenue.getId());
        Venue savedVenue = venueRepository.save(updatedVenue);
        return VenueMapper.mapToVenueDto(savedVenue);
    }

    @Override
    public void deleteVenue(Long venueId) {
        venueRepository.deleteById(venueId);
    }
}
