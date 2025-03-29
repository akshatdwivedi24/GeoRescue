package com.georescue.controller;

import com.georescue.model.Donation;
import com.georescue.model.NGO;
import com.georescue.repository.DonationRepository;
import com.georescue.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private DonationRepository donationRepository;

    @PostMapping
    public ResponseEntity<Donation> createDonation(
            @AuthenticationPrincipal Long userId,
            @RequestBody Donation donation) {
        return ResponseEntity.ok(donationService.createDonation(userId, donation));
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        return ResponseEntity.ok(donationRepository.findAll());
    }

    @GetMapping("/completed")
    public ResponseEntity<List<Donation>> getCompletedDonations() {
        return ResponseEntity.ok(donationRepository.findCompletedDonations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonation(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.getDonation(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Donation> updateDonationStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(donationService.updateStatus(id, status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Donation>> getUserDonations(@PathVariable Long userId) {
        return ResponseEntity.ok(donationRepository.findByDonorId(userId));
    }

    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<Donation>> getNGODonations(@PathVariable Long ngoId) {
        return ResponseEntity.ok(donationRepository.findByNgoId(ngoId));
    }

    @GetMapping("/ngo/{ngoId}/total")
    public ResponseEntity<Double> getNGOTotalDonations(@PathVariable Long ngoId) {
        NGO ngo = donationService.getNGO(ngoId);
        return ResponseEntity.ok(donationRepository.getTotalDonationsForNGO(ngo));
    }

    @GetMapping("/ngo/{ngoId}/donors")
    public ResponseEntity<Long> getNGODonorCount(@PathVariable Long ngoId) {
        NGO ngo = donationService.getNGO(ngoId);
        return ResponseEntity.ok(donationRepository.getDonorCountForNGO(ngo));
    }

    @GetMapping("/ngo/{ngoId}/recent")
    public ResponseEntity<List<Donation>> getNGORecentDonations(@PathVariable Long ngoId) {
        NGO ngo = donationService.getNGO(ngoId);
        return ResponseEntity.ok(donationRepository.findRecentDonationsForNGO(ngo));
    }
} 