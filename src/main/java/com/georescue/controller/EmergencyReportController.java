package com.georescue.controller;

import com.georescue.model.EmergencyReport;
import com.georescue.repository.EmergencyReportRepository;
import com.georescue.service.EmergencyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/emergency-reports")
@CrossOrigin(origins = "*")
public class EmergencyReportController {

    @Autowired
    private EmergencyReportService emergencyReportService;

    @Autowired
    private EmergencyReportRepository emergencyReportRepository;

    @PostMapping
    public ResponseEntity<EmergencyReport> createReport(
            @AuthenticationPrincipal Long userId,
            @RequestBody EmergencyReport report) {
        return ResponseEntity.ok(emergencyReportService.createReport(userId, report));
    }

    @GetMapping
    public ResponseEntity<List<EmergencyReport>> getAllReports() {
        return ResponseEntity.ok(emergencyReportRepository.findAll());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<EmergencyReport>> getPendingReports() {
        return ResponseEntity.ok(emergencyReportRepository.findPendingReports());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyReport> getReport(@PathVariable Long id) {
        return ResponseEntity.ok(emergencyReportService.getReport(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<EmergencyReport> updateReportStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(emergencyReportService.updateStatus(id, status));
    }

    @GetMapping("/area")
    public ResponseEntity<List<EmergencyReport>> getReportsInArea(
            @RequestParam Double minLat,
            @RequestParam Double maxLat,
            @RequestParam Double minLng,
            @RequestParam Double maxLng) {
        return ResponseEntity.ok(emergencyReportRepository.findReportsInArea(minLat, maxLat, minLng, maxLng));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EmergencyReport>> getUserReports(@PathVariable Long userId) {
        return ResponseEntity.ok(emergencyReportRepository.findByReporterId(userId));
    }
} 