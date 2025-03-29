package com.georescue.controller;

import com.georescue.model.RescueOperation;
import com.georescue.service.RescueOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rescue-operations")
public class RescueOperationController {

    @Autowired
    private RescueOperationService rescueOperationService;

    @PostMapping
    public ResponseEntity<RescueOperation> createOperation(@RequestBody RescueOperation operation) {
        return ResponseEntity.ok(rescueOperationService.createOperation(operation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RescueOperation> updateOperation(@PathVariable Long id, @RequestBody RescueOperation operation) {
        return ResponseEntity.ok(rescueOperationService.updateOperation(id, operation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable Long id) {
        rescueOperationService.deleteOperation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RescueOperation> getOperationById(@PathVariable Long id) {
        return ResponseEntity.ok(rescueOperationService.getOperationById(id));
    }

    @GetMapping
    public ResponseEntity<List<RescueOperation>> getAllOperations() {
        return ResponseEntity.ok(rescueOperationService.getAllOperations());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<RescueOperation>> getOperationsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(rescueOperationService.getOperationsByStatus(status));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<RescueOperation>> getOperationsByLocation(@PathVariable String location) {
        return ResponseEntity.ok(rescueOperationService.getOperationsByLocation(location));
    }

    @GetMapping("/active")
    public ResponseEntity<List<RescueOperation>> getActiveOperations() {
        return ResponseEntity.ok(rescueOperationService.getActiveOperations());
    }

    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<List<RescueOperation>> getOperationsByIncidentId(@PathVariable Long incidentId) {
        return ResponseEntity.ok(rescueOperationService.getOperationsByIncidentId(incidentId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateOperationStatus(@PathVariable Long id, @RequestParam String status) {
        rescueOperationService.updateOperationStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/team-member")
    public ResponseEntity<Void> addTeamMember(@PathVariable Long id, @RequestParam String teamMember) {
        rescueOperationService.addTeamMember(id, teamMember);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/team-member")
    public ResponseEntity<Void> removeTeamMember(@PathVariable Long id, @RequestParam String teamMember) {
        rescueOperationService.removeTeamMember(id, teamMember);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/resources")
    public ResponseEntity<Void> updateResources(@PathVariable Long id, @RequestParam String resources) {
        rescueOperationService.updateResources(id, resources);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Void> markOperationAsCompleted(@PathVariable Long id) {
        rescueOperationService.markOperationAsCompleted(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> markOperationAsCancelled(@PathVariable Long id) {
        rescueOperationService.markOperationAsCancelled(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<RescueOperation>> searchOperations(@RequestParam String query) {
        return ResponseEntity.ok(rescueOperationService.searchOperations(query));
    }
} 