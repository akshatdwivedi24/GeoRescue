package com.georescue.repository;

import com.georescue.model.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    List<EmergencyContact> findByUserId(Long userId);
    List<EmergencyContact> findByActive(boolean active);
    List<EmergencyContact> findByUserIdAndActive(Long userId, boolean active);
} 