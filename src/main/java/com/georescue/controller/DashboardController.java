package com.georescue.controller;

import com.georescue.model.Shelter;
import com.georescue.service.AlertService;
import com.georescue.service.IncidentService;
import com.georescue.service.RescueOperationService;
import com.georescue.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DashboardController {

    @Autowired
    private AlertService alertService;

    @Autowired
    private IncidentService incidentService;

    @Autowired
    private RescueOperationService rescueOperationService;

    @Autowired
    private ShelterService shelterService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        
        // Alert statistics
        summary.put("totalAlerts", alertService.getAllAlerts().size());
        summary.put("activeAlerts", alertService.getActiveAlerts().size());
        
        // Incident statistics
        summary.put("totalIncidents", incidentService.getAllIncidents().size());
        summary.put("activeIncidents", incidentService.getActiveIncidents().size());
        
        // Rescue operation statistics
        summary.put("totalOperations", rescueOperationService.getAllOperations().size());
        summary.put("activeOperations", rescueOperationService.getActiveOperations().size());
        
        // Shelter statistics
        summary.put("totalShelters", shelterService.getAllShelters().size());
        summary.put("availableShelters", shelterService.getAvailableShelters().size());
        
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/alerts/status")
    public ResponseEntity<Map<String, Long>> getAlertStatusDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        alertService.getAllAlerts().forEach(alert -> 
            distribution.merge(alert.getStatus(), 1L, Long::sum));
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/incidents/severity")
    public ResponseEntity<Map<String, Long>> getIncidentSeverityDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        incidentService.getAllIncidents().forEach(incident -> 
            distribution.merge(incident.getSeverity(), 1L, Long::sum));
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/operations/status")
    public ResponseEntity<Map<String, Long>> getOperationStatusDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        rescueOperationService.getAllOperations().forEach(operation -> 
            distribution.merge(operation.getStatus(), 1L, Long::sum));
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/shelters/status")
    public ResponseEntity<Map<String, Long>> getShelterStatusDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        shelterService.getAllShelters().forEach(shelter -> 
            distribution.merge(shelter.getStatus(), 1L, Long::sum));
        return ResponseEntity.ok(distribution);
    }

    @GetMapping("/shelters/occupancy")
    public ResponseEntity<Map<String, Object>> getShelterOccupancyStats() {
        Map<String, Object> stats = new HashMap<>();
        var shelters = shelterService.getAllShelters();
        
        int totalCapacity = shelters.stream().mapToInt(Shelter::getCapacity).sum();
        int totalOccupancy = shelters.stream().mapToInt(Shelter::getCurrentOccupancy).sum();
        
        stats.put("totalCapacity", totalCapacity);
        stats.put("totalOccupancy", totalOccupancy);
        stats.put("occupancyRate", totalCapacity > 0 ? (double) totalOccupancy / totalCapacity : 0);
        
        return ResponseEntity.ok(stats);
    }
} 