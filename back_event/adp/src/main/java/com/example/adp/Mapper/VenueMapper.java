package com.example.adp.Mapper;

import com.example.adp.Dto.VenueDto;
import com.example.adp.Model.Venue;

public class VenueMapper {

    public static VenueDto mapToVenueDto(Venue venue) {
        return new VenueDto(
                venue.getId(),
                venue.getName(),
                venue.getLocation(),
                venue.getCapacity(),
                venue.getPrice(),
                venue.isAvailable(),
                venue.getImageUrl(),
                venue.isWishlisted());
    }

    public static Venue mapToVenue(VenueDto venueDto) {
        return new Venue(
                venueDto.getId(),
                venueDto.getName(),
                venueDto.getLocation(),
                venueDto.getCapacity(),
                venueDto.getPrice(),
                venueDto.isAvailable(),
                venueDto.getImageUrl(),
                venueDto.isWishlisted());
    }
}
