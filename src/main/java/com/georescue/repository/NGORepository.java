package com.georescue.repository;

import com.georescue.model.NGO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NGORepository extends JpaRepository<NGO, Long> {
    List<NGO> findByVerified(Boolean verified);
    
    List<NGO> findByVerificationStatus(String status);
} 