package com.georescue.controller;

import com.georescue.model.Shelter;
import com.georescue.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shelters")
public class ShelterController {

    @Autowired
    private ShelterService shelterService;

    @PostMapping
    public ResponseEntity<Shelter> createShelter(@RequestBody Shelter shelter) {
        return ResponseEntity.ok(shelterService.createShelter(shelter));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shelter> updateShelter(@PathVariable Long id, @RequestBody Shelter shelter) {
        return ResponseEntity.ok(shelterService.updateShelter(id, shelter));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShelter(@PathVariable Long id) {
        shelterService.deleteShelter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shelter> getShelterById(@PathVariable Long id) {
        return ResponseEntity.ok(shelterService.getShelterById(id));
    }

    @GetMapping
    public ResponseEntity<List<Shelter>> getAllShelters() {
        return ResponseEntity.ok(shelterService.getAllShelters());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Shelter>> getSheltersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(shelterService.getSheltersByStatus(status));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Shelter>> getSheltersByLocation(@PathVariable String location) {
        return ResponseEntity.ok(shelterService.getSheltersByLocation(location));
    }

    @GetMapping("/available")
    public ResponseEntity<List<Shelter>> getAvailableShelters() {
        return ResponseEntity.ok(shelterService.getAvailableShelters());
    }

    @GetMapping("/capacity/{minCapacity}")
    public ResponseEntity<List<Shelter>> getSheltersByCapacity(@PathVariable int minCapacity) {
        return ResponseEntity.ok(shelterService.getSheltersByCapacity(minCapacity));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateShelterStatus(@PathVariable Long id, @RequestParam String status) {
        shelterService.updateShelterStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/occupancy")
    public ResponseEntity<Void> updateOccupancy(@PathVariable Long id, @RequestParam int currentOccupancy) {
        shelterService.updateOccupancy(id, currentOccupancy);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/resource")
    public ResponseEntity<Void> addResource(@PathVariable Long id, @RequestParam String resource) {
        shelterService.addResource(id, resource);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/resource")
    public ResponseEntity<Void> removeResource(@PathVariable Long id, @RequestParam String resource) {
        shelterService.removeResource(id, resource);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/facility")
    public ResponseEntity<Void> addFacility(@PathVariable Long id, @RequestParam String facility) {
        shelterService.addFacility(id, facility);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/facility")
    public ResponseEntity<Void> removeFacility(@PathVariable Long id, @RequestParam String facility) {
        shelterService.removeFacility(id, facility);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/full")
    public ResponseEntity<Void> markShelterAsFull(@PathVariable Long id) {
        shelterService.markShelterAsFull(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/available")
    public ResponseEntity<Void> markShelterAsAvailable(@PathVariable Long id) {
        shelterService.markShelterAsAvailable(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Shelter>> searchShelters(@RequestParam String query) {
        return ResponseEntity.ok(shelterService.searchShelters(query));
    }
} 