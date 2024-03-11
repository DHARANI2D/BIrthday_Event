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
@Table(name = "cakes")
public class Cake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cake_name", nullable = false)
    private String cakeName;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "flavour", nullable = false)
    private String flavour;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "img_url", nullable = true)
    private String imgUrl;

    @Column(name = "wishlisted", nullable = false, columnDefinition = "boolean default false")
    private boolean wishlisted;

}
