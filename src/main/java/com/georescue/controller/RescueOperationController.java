package com.georescue.controller;

import com.georescue.model.RescueOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rescue-operations")
@CrossOrigin(origins = "*")
public class RescueOperationController {
    private List<RescueOperation> operations = new ArrayList<>();

    @PostMapping
    public ResponseEntity<RescueOperation> createOperation(@RequestBody RescueOperation operation) {
        operation.setId(UUID.randomUUID().toString());
        operations.add(operation);
        return ResponseEntity.ok(operation);
    }

    @GetMapping
    public ResponseEntity<List<RescueOperation>> getAllOperations() {
        return ResponseEntity.ok(operations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RescueOperation> getOperationById(@PathVariable String id) {
        return operations.stream()
                .filter(operation -> operation.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RescueOperation> updateOperation(@PathVariable String id, @RequestBody RescueOperation updatedOperation) {
        for (int i = 0; i < operations.size(); i++) {
            if (operations.get(i).getId().equals(id)) {
                updatedOperation.setId(id);
                operations.set(i, updatedOperation);
                return ResponseEntity.ok(updatedOperation);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable String id) {
        boolean removed = operations.removeIf(operation -> operation.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<RescueOperation>> getActiveOperations() {
        List<RescueOperation> activeOperations = operations.stream()
                .filter(operation -> "IN_PROGRESS".equals(operation.getStatus()))
                .toList();
        return ResponseEntity.ok(activeOperations);
    }

    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<List<RescueOperation>> getOperationsByIncident(@PathVariable String incidentId) {
        List<RescueOperation> incidentOperations = operations.stream()
                .filter(operation -> incidentId.equals(operation.getIncidentId()))
                .toList();
        return ResponseEntity.ok(incidentOperations);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<List<RescueOperation>> getOperationsByPriority(@PathVariable String priority) {
        List<RescueOperation> priorityOperations = operations.stream()
                .filter(operation -> priority.equals(operation.getPriority()))
                .toList();
        return ResponseEntity.ok(priorityOperations);
    }
} 