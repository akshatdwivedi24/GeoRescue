package com.georescue.controller;

import com.georescue.model.Alert;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "*")
public class AlertController {
    private List<Alert> alerts = new ArrayList<>();

    @PostMapping
    public ResponseEntity<Alert> createAlert(@RequestBody Alert alert) {
        alert.setId(UUID.randomUUID().toString());
        alerts.add(alert);
        return ResponseEntity.ok(alert);
    }

    @GetMapping
    public ResponseEntity<List<Alert>> getAllAlerts() {
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable String id) {
        return alerts.stream()
                .filter(alert -> alert.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alert> updateAlert(@PathVariable String id, @RequestBody Alert updatedAlert) {
        for (int i = 0; i < alerts.size(); i++) {
            if (alerts.get(i).getId().equals(id)) {
                updatedAlert.setId(id);
                alerts.set(i, updatedAlert);
                return ResponseEntity.ok(updatedAlert);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlert(@PathVariable String id) {
        boolean removed = alerts.removeIf(alert -> alert.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<Alert>> getActiveAlerts() {
        List<Alert> activeAlerts = alerts.stream()
                .filter(Alert::isActive)
                .toList();
        return ResponseEntity.ok(activeAlerts);
    }
} 