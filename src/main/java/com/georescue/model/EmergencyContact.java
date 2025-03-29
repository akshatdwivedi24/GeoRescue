package com.georescue.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "emergency_contacts")
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column
    private String email;

    @Column
    private String type;

    @Column
    private String relationship;

    @Column
    private String notes;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private int priority;

    @Column
    private LocalDateTime lastContacted;

    @Column(nullable = false)
    private boolean available24x7;

    @ElementCollection
    @CollectionTable(name = "emergency_contact_languages", joinColumns = @JoinColumn(name = "contact_id"))
    @Column(name = "language")
    private List<String> languages;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public LocalDateTime getLastContacted() {
        return lastContacted;
    }

    public void setLastContacted(LocalDateTime lastContacted) {
        this.lastContacted = lastContacted;
    }

    public boolean isAvailable24x7() {
        return available24x7;
    }

    public void setAvailable24x7(boolean available24x7) {
        this.available24x7 = available24x7;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }
} 