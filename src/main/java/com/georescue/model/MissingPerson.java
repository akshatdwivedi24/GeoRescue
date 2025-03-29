package com.georescue.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "missing_persons")
public class MissingPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String lastSeenLocation;

    @Column(nullable = false)
    private LocalDateTime lastSeenDate;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column
    private String photoUrl;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Column
    private LocalDateTime foundAt;

    @Embedded
    private ContactInfo contactInfo;

    @Column
    private String additionalDetails;

    @PrePersist
    protected void onCreate() {
        reportedAt = LocalDateTime.now();
        status = "MISSING";
    }
}

@Embeddable
@Data
class ContactInfo {
    @Column(nullable = false)
    private String contactName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column
    private String email;

    @Column
    private String relationship;
} 