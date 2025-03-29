package com.georescue.service;

import com.georescue.model.Donation;
import com.georescue.model.NGO;
import com.georescue.model.User;
import com.georescue.repository.DonationRepository;
import com.georescue.repository.NGORepository;
import com.georescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NGORepository ngoRepository;

    @Transactional
    public Donation createDonation(Long userId, Donation donation) {
        User donor = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        NGO ngo = ngoRepository.findById(donation.getNgo().getId())
                .orElseThrow(() -> new RuntimeException("NGO not found"));
        
        if (!ngo.getVerified()) {
            throw new RuntimeException("Cannot donate to unverified NGO");
        }
        
        donation.setDonor(donor);
        donation.setNgo(ngo);
        donation.setDonatedAt(LocalDateTime.now());
        donation.setStatus("PENDING");
        
        return donationRepository.save(donation);
    }

    public Donation getDonation(Long id) {
        return donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));
    }

    @Transactional
    public Donation updateStatus(Long id, String status) {
        Donation donation = getDonation(id);
        donation.setStatus(status);
        
        if (status.equals("COMPLETED")) {
            // TODO: Implement payment gateway integration
        }
        
        return donationRepository.save(donation);
    }

    public NGO getNGO(Long id) {
        return ngoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("NGO not found"));
    }
} 