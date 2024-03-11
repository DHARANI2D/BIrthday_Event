package com.example.adp.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private Long id;
    private int orderId;
    private int cake;
    private int venue;
    private int photography;
    private int food;
    private int entertainment;
    private int decorations;
    private int gift;
    private int status;
    private int userid;
}
