package com.georescue.repository;

import com.georescue.model.RescueOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RescueOperationRepository extends JpaRepository<RescueOperation, Long> {
    List<RescueOperation> findByStatus(String status);
    List<RescueOperation> findByLocation(String location);
    List<RescueOperation> findByStatusNot(String status);
    List<RescueOperation> findByIncidentId(Long incidentId);
} 