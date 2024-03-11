package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhotographyDto {
    private Long id;
    private String name;
    private String location;
    private double price;
    private boolean available;
    private boolean wishlisted;
}
