package com.georescue.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "donations")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private User donor;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String currency;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime donatedAt;

    @Column
    private String transactionId;

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private NGO ngo;

    @Column
    private String project;

    @Column
    private Boolean anonymous;

    @Column
    private String message;

    @PrePersist
    protected void onCreate() {
        donatedAt = LocalDateTime.now();
        status = "PENDING";
    }
} 