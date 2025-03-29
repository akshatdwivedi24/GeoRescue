package com.georescue.repository;

import com.georescue.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByStatus(String status);
    List<Incident> findBySeverity(String severity);
    List<Incident> findByLocation(String location);
    List<Incident> findByReportedBy(String reportedBy);
    List<Incident> findByAssignedTo(String assignedTo);
    List<Incident> findByStatusNot(String status);
} 