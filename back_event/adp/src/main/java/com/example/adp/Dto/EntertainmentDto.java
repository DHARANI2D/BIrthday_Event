package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EntertainmentDto {
    private Long id;
    private String name;
    private String type;
    private int duration;
    private double price;
    private boolean available;
    private boolean wishlisted;
}
