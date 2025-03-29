package com.georescue.repository;

import com.georescue.model.Donation;
import com.georescue.model.NGO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonorId(Long donorId);
    
    List<Donation> findByNgoId(Long ngoId);
    
    @Query("SELECT d FROM Donation d WHERE d.status = 'COMPLETED' ORDER BY d.donatedAt DESC")
    List<Donation> findCompletedDonations();
    
    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.ngo = ?1 AND d.status = 'COMPLETED'")
    Double getTotalDonationsForNGO(NGO ngo);
    
    @Query("SELECT COUNT(d) FROM Donation d WHERE d.ngo = ?1 AND d.status = 'COMPLETED'")
    Long getDonorCountForNGO(NGO ngo);
    
    @Query("SELECT d FROM Donation d WHERE d.ngo = ?1 AND d.status = 'COMPLETED' ORDER BY d.donatedAt DESC")
    List<Donation> findRecentDonationsForNGO(NGO ngo);
} 