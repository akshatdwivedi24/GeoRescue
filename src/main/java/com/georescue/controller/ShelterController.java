package com.georescue.controller;

import com.georescue.model.Shelter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shelters")
@CrossOrigin(origins = "*")
public class ShelterController {
    private List<Shelter> shelters = new ArrayList<>();

    @PostMapping
    public ResponseEntity<Shelter> createShelter(@RequestBody Shelter shelter) {
        shelter.setId(UUID.randomUUID().toString());
        shelters.add(shelter);
        return ResponseEntity.ok(shelter);
    }

    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {
        return ResponseEntity.ok(shelters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(@PathVariable String id) {
        return shelters.stream()
                .filter(shelter -> shelter.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shelter> updateShelter(@PathVariable String id, @RequestBody Shelter updatedShelter) {
        for (int i = 0; i < shelters.size(); i++) {
            if (shelters.get(i).getId().equals(id)) {
                updatedShelter.setId(id);
                shelters.set(i, updatedShelter);
                return ResponseEntity.ok(updatedShelter);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelter(@PathVariable String id) {
        boolean removed = shelters.removeIf(shelter -> shelter.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/open")
    public ResponseEntity<List<Shelter>> getOpenShelters() {
        List<Shelter> openShelters = shelters.stream()
                .filter(shelter -> "OPEN".equals(shelter.getStatus()))
                .toList();
        return ResponseEntity.ok(openShelters);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Shelter>> getAvailableShelters() {
        List<Shelter> availableShelters = shelters.stream()
                .filter(shelter -> "OPEN".equals(shelter.getStatus()) && 
                        shelter.getCurrentOccupancy() < shelter.getCapacity())
                .toList();
        return ResponseEntity.ok(availableShelters);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Shelter>> getSheltersByType(@PathVariable String type) {
        List<Shelter> typeShelters = shelters.stream()
                .filter(shelter -> type.equals(shelter.getType()))
                .toList();
        return ResponseEntity.ok(typeShelters);
    }
} 