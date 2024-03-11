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
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private int orderId;

    @Column(name = "cake", nullable = true)
    private int cake;

    @Column(name = "venue", nullable = true)
    private int venue;

    @Column(name = "photography", nullable = true)
    private int photography;

    @Column(name = "food", nullable = true)
    private int food;

    @Column(name = "entertainment", nullable = true)
    private int entertainment;

    @Column(name = "decorations", nullable = true)
    private int decorations;

    @Column(name = "gift", nullable = true)
    private int gift;

    @Column(name = "status", nullable = true)
    private int status;

    @Column(name = "userid", nullable = true)
    private int userid;
}
