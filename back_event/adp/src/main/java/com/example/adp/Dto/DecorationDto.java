package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DecorationDto {
    private Long id;
    private String name;
    private String type;
    private boolean available;
    private String area;
    private double price;
    private boolean wishlisted;
}
