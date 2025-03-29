package com.georescue.repository;

import com.georescue.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByStatus(String status);
    List<Alert> findBySeverity(String severity);
    List<Alert> findByLocation(String location);
    List<Alert> findByStatusNot(String status);
} 