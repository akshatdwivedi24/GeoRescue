package com.georescue.service.impl;

import com.georescue.model.Incident;
import com.georescue.repository.IncidentRepository;
import com.georescue.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncidentServiceImpl implements IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

    @Override
    @Transactional
    public Incident createIncident(Incident incident) {
        incident.setReportedAt(LocalDateTime.now());
        incident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Override
    @Transactional
    public Incident updateIncident(Long id, Incident incident) {
        Incident existingIncident = getIncidentById(id);
        existingIncident.setTitle(incident.getTitle());
        existingIncident.setDescription(incident.getDescription());
        existingIncident.setLocation(incident.getLocation());
        existingIncident.setStatus(incident.getStatus());
        existingIncident.setSeverity(incident.getSeverity());
        existingIncident.setNotes(incident.getNotes());
        existingIncident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(existingIncident);
    }

    @Override
    @Transactional
    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }

    @Override
    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
    }

    @Override
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @Override
    public List<Incident> getIncidentsByStatus(String status) {
        return incidentRepository.findByStatus(status);
    }

    @Override
    public List<Incident> getIncidentsBySeverity(String severity) {
        return incidentRepository.findBySeverity(severity);
    }

    @Override
    public List<Incident> getIncidentsByLocation(String location) {
        return incidentRepository.findByLocation(location);
    }

    @Override
    public List<Incident> getIncidentsByReporter(String reportedBy) {
        return incidentRepository.findByReportedBy(reportedBy);
    }

    @Override
    public List<Incident> getIncidentsByAssignee(String assignedTo) {
        return incidentRepository.findByAssignedTo(assignedTo);
    }

    @Override
    public List<Incident> getActiveIncidents() {
        return incidentRepository.findByStatusNot("RESOLVED");
    }

    @Override
    @Transactional
    public Incident markIncidentAsResolved(Long id) {
        Incident incident = getIncidentById(id);
        incident.setStatus("RESOLVED");
        incident.setResolvedAt(LocalDateTime.now());
        incident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Override
    @Transactional
    public Incident assignIncident(Long id, String assignedTo) {
        Incident incident = getIncidentById(id);
        incident.setAssignedTo(assignedTo);
        incident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Override
    @Transactional
    public Incident updateIncidentStatus(Long id, String status) {
        Incident incident = getIncidentById(id);
        incident.setStatus(status);
        incident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Override
    @Transactional
    public Incident updateIncidentSeverity(Long id, String severity) {
        Incident incident = getIncidentById(id);
        incident.setSeverity(severity);
        incident.setLastUpdated(LocalDateTime.now());
        return incidentRepository.save(incident);
    }
} 