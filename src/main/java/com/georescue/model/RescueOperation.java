package com.georescue.model;

import java.time.LocalDateTime;
import java.util.List;

public class RescueOperation {
    private String id;
    private String incidentId;
    private String status; // PLANNED, IN_PROGRESS, COMPLETED, CANCELLED
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Location targetLocation;
    private List<String> assignedTeams;
    private List<String> requiredEquipment;
    private String priority;
    private String description;
    private int estimatedDuration; // in minutes
    private List<String> affectedAreas;
    private String commanderId;
    private List<String> updates; // Operation updates and progress

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(String incidentId) {
        this.incidentId = incidentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Location getTargetLocation() {
        return targetLocation;
    }

    public void setTargetLocation(Location targetLocation) {
        this.targetLocation = targetLocation;
    }

    public List<String> getAssignedTeams() {
        return assignedTeams;
    }

    public void setAssignedTeams(List<String> assignedTeams) {
        this.assignedTeams = assignedTeams;
    }

    public List<String> getRequiredEquipment() {
        return requiredEquipment;
    }

    public void setRequiredEquipment(List<String> requiredEquipment) {
        this.requiredEquipment = requiredEquipment;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEstimatedDuration() {
        return estimatedDuration;
    }

    public void setEstimatedDuration(int estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }

    public List<String> getAffectedAreas() {
        return affectedAreas;
    }

    public void setAffectedAreas(List<String> affectedAreas) {
        this.affectedAreas = affectedAreas;
    }

    public String getCommanderId() {
        return commanderId;
    }

    public void setCommanderId(String commanderId) {
        this.commanderId = commanderId;
    }

    public List<String> getUpdates() {
        return updates;
    }

    public void setUpdates(List<String> updates) {
        this.updates = updates;
    }
} 