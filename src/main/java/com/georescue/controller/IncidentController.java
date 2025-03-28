package com.georescue.controller;

import com.georescue.model.Incident;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "*")
public class IncidentController {
    private List<Incident> incidents = new ArrayList<>();

    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        incident.setId(UUID.randomUUID().toString());
        incidents.add(incident);
        return ResponseEntity.ok(incident);
    }

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents() {
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable String id) {
        return incidents.stream()
                .filter(incident -> incident.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> updateIncident(@PathVariable String id, @RequestBody Incident updatedIncident) {
        for (int i = 0; i < incidents.size(); i++) {
            if (incidents.get(i).getId().equals(id)) {
                updatedIncident.setId(id);
                incidents.set(i, updatedIncident);
                return ResponseEntity.ok(updatedIncident);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable String id) {
        boolean removed = incidents.removeIf(incident -> incident.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<Incident>> getActiveIncidents() {
        List<Incident> activeIncidents = incidents.stream()
                .filter(incident -> "ACTIVE".equals(incident.getStatus()))
                .toList();
        return ResponseEntity.ok(activeIncidents);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<Incident>> getIncidentsByPriority(@PathVariable String priority) {
        List<Incident> priorityIncidents = incidents.stream()
                .filter(incident -> priority.equals(incident.getPriority()))
                .toList();
        return ResponseEntity.ok(priorityIncidents);
    }
} 