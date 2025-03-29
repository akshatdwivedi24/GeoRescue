package com.georescue.controller;

import com.georescue.model.Alert;
import com.georescue.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    @Autowired
    private AlertService alertService;

    @PostMapping
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        return ResponseEntity.ok(alertService.createAlert(alert));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alert> updateAlert(@PathVariable Long id, @RequestBody Alert alert) {
        return ResponseEntity.ok(alertService.updateAlert(id, alert));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable Long id) {
        alertService.deleteAlert(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable Long id) {
        return ResponseEntity.ok(alertService.getAlertById(id));
    }

    @GetMapping
    public ResponseEntity<List<Alert>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Alert>> getAlertsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(alertService.getAlertsByStatus(status));
    }

    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<Alert>> getAlertsBySeverity(@PathVariable String severity) {
        return ResponseEntity.ok(alertService.getAlertsBySeverity(severity));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Alert>> getAlertsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(alertService.getAlertsByLocation(location));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Alert>> getActiveAlerts() {
        return ResponseEntity.ok(alertService.getActiveAlerts());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Void> markAlertAsResolved(@PathVariable Long id) {
        alertService.markAlertAsResolved(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/urgent")
    public ResponseEntity<Void> markAlertAsUrgent(@PathVariable Long id) {
        alertService.markAlertAsUrgent(id);
        return ResponseEntity.noContent().build();
    }
} 