package com.georescue.controller;

import com.georescue.model.MissingPerson;
import com.georescue.repository.MissingPersonRepository;
import com.georescue.service.MissingPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/missing-persons")
@CrossOrigin(origins = "*")
public class MissingPersonController {

    @Autowired
    private MissingPersonService missingPersonService;

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    @PostMapping
    public ResponseEntity<MissingPerson> createReport(
            @AuthenticationPrincipal Long userId,
            @RequestBody MissingPerson report) {
        return ResponseEntity.ok(missingPersonService.createReport(userId, report));
    }

    @GetMapping
    public ResponseEntity<List<MissingPerson>> getAllReports() {
        return ResponseEntity.ok(missingPersonRepository.findAll());
    }

    @GetMapping("/active")
    public ResponseEntity<List<MissingPerson>> getActiveReports() {
        return ResponseEntity.ok(missingPersonRepository.findActiveMissingPersons());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MissingPerson> getReport(@PathVariable Long id) {
        return ResponseEntity.ok(missingPersonService.getReport(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MissingPerson> updateReportStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(missingPersonService.updateStatus(id, status));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MissingPerson>> searchReports(@RequestParam String query) {
        return ResponseEntity.ok(missingPersonRepository.searchMissingPersons(query));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<MissingPerson>> getReportsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(missingPersonRepository.findMissingPersonsByLocation(location));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MissingPerson>> getUserReports(@PathVariable Long userId) {
        return ResponseEntity.ok(missingPersonRepository.findByReporterId(userId));
    }
} 