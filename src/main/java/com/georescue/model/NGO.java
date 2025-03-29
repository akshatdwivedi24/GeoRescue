package com.georescue.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ngos")
public class NGO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column
    private String logoUrl;

    @Column(nullable = false)
    private Boolean verified;

    @Column(nullable = false)
    private String contactEmail;

    @Column(nullable = false)
    private String contactPhone;

    @Column(nullable = false)
    private String address;

    @Column
    private String website;

    @Column
    private String registrationNumber;

    @Column
    private LocalDateTime verifiedAt;

    @Column
    private String verificationStatus;
} 