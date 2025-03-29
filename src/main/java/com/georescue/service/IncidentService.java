package com.georescue.service;

import com.georescue.model.Incident;
import java.util.List;

public interface IncidentService {
    Incident createIncident(Incident incident);
    Incident updateIncident(Long id, Incident incident);
    void deleteIncident(Long id);
    Incident getIncidentById(Long id);
    List<Incident> getAllIncidents();
    List<Incident> getIncidentsByStatus(String status);
    List<Incident> getIncidentsBySeverity(String severity);
    List<Incident> getIncidentsByLocation(String location);
    List<Incident> getIncidentsByReporter(String reportedBy);
    List<Incident> getIncidentsByAssignee(String assignedTo);
    List<Incident> getActiveIncidents();
    Incident markIncidentAsResolved(Long id);
    Incident assignIncident(Long id, String assignedTo);
    Incident updateIncidentStatus(Long id, String status);
    Incident updateIncidentSeverity(Long id, String severity);
} 