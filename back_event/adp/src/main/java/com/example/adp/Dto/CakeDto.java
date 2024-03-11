package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CakeDto {
    private Long id;
    private String cakeName;
    private double price;
    private String flavour;
    private String type;
    private int quantity;
    private String imgUrl;
    private boolean wishlisted;
    

}
