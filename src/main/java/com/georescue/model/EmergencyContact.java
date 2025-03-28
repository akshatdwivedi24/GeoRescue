package com.georescue.model;

public class EmergencyContact {
    private String id;
    private String name;
    private String phoneNumber;
    private String email;
    private String type; // POLICE, FIRE, AMBULANCE, HELPLINE, etc.
    private String description;
    private Location location;
    private String[] services; // Array of services provided
    private boolean is24x7;
    private String[] languages; // Languages supported
    private String website;
    private String[] socialMedia;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String[] getServices() {
        return services;
    }

    public void setServices(String[] services) {
        this.services = services;
    }

    public boolean isIs24x7() {
        return is24x7;
    }

    public void setIs24x7(boolean is24x7) {
        this.is24x7 = is24x7;
    }

    public String[] getLanguages() {
        return languages;
    }

    public void setLanguages(String[] languages) {
        this.languages = languages;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String[] getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(String[] socialMedia) {
        this.socialMedia = socialMedia;
    }
} 