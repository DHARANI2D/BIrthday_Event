package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VenueDto {
    private Long id;
    private String name;
    private String location;
    private int capacity;
    private double price;
    private boolean available;
    private String imageUrl;
    private boolean wishlisted;
}
