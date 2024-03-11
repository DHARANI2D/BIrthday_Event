package com.example.adp.Services;

import java.util.List;

import com.example.adp.Dto.VenueDto;

public interface VenueService {
    VenueDto createVenue(VenueDto venueDto);

    VenueDto getVenueById(Long venueId);

    List<VenueDto> getAllVenues();

    VenueDto updateVenue(Long venueId, VenueDto venueDto);

    void deleteVenue(Long venueId);
}
