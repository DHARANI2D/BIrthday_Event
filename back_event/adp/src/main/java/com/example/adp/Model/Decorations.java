package com.example.adp.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "decorations")
public class Decorations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "available", nullable = false)
    private boolean available;

    @Column(name = "area", nullable = false)
    private String area;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "wishlisted", nullable = false, columnDefinition = "boolean default false")
    private boolean wishlisted;

    
}
