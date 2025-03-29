package com.georescue.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "emergency_reports")
public class EmergencyReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reporter;

    @Column(nullable = false)
    private String incidentType;

    @Column(nullable = false)
    private String severity;

    @Column(nullable = false, length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "emergency_report_media")
    private List<String> mediaUrls;

    @Embedded
    private Location location;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Column(nullable = false)
    private String status;

    @ManyToMany
    @JoinTable(
        name = "emergency_report_responders",
        joinColumns = @JoinColumn(name = "report_id"),
        inverseJoinColumns = @JoinColumn(name = "responder_id")
    )
    private List<User> responders;

    @Column
    private String notes;

    @Column
    private LocalDateTime resolvedAt;

    @PrePersist
    protected void onCreate() {
        reportedAt = LocalDateTime.now();
        status = "PENDING";
    }
} 