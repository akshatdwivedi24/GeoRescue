package com.georescue.controller;

import com.georescue.model.Incident;
import com.georescue.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    @Autowired
    private IncidentService incidentService;

    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        return ResponseEntity.ok(incidentService.createIncident(incident));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @RequestBody Incident incident) {
        return ResponseEntity.ok(incidentService.updateIncident(id, incident));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.getIncidentById(id));
    }

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Incident>> getIncidentsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(incidentService.getIncidentsByStatus(status));
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<Incident>> getIncidentsBySeverity(@PathVariable String severity) {
        return ResponseEntity.ok(incidentService.getIncidentsBySeverity(severity));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Incident>> getIncidentsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(incidentService.getIncidentsByLocation(location));
    }

    @GetMapping("/reporter/{reportedBy}")
    public ResponseEntity<List<Incident>> getIncidentsByReporter(@PathVariable String reportedBy) {
        return ResponseEntity.ok(incidentService.getIncidentsByReporter(reportedBy));
    }

    @GetMapping("/assignee/{assignedTo}")
    public ResponseEntity<List<Incident>> getIncidentsByAssignee(@PathVariable String assignedTo) {
        return ResponseEntity.ok(incidentService.getIncidentsByAssignee(assignedTo));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Incident>> getActiveIncidents() {
        return ResponseEntity.ok(incidentService.getActiveIncidents());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Incident> markIncidentAsResolved(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.markIncidentAsResolved(id));
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<Incident> assignIncident(@PathVariable Long id, @RequestParam String assignedTo) {
        return ResponseEntity.ok(incidentService.assignIncident(id, assignedTo));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Incident> updateIncidentStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(incidentService.updateIncidentStatus(id, status));
    }

    @PutMapping("/{id}/severity")
    public ResponseEntity<Incident> updateIncidentSeverity(@PathVariable Long id, @RequestParam String severity) {
        return ResponseEntity.ok(incidentService.updateIncidentSeverity(id, severity));
    }
} 