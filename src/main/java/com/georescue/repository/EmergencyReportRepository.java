package com.georescue.repository;

import com.georescue.model.EmergencyReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmergencyReportRepository extends JpaRepository<EmergencyReport, Long> {
    List<EmergencyReport> findByStatus(String status);
    
    @Query("SELECT e FROM EmergencyReport e WHERE e.status = 'PENDING' ORDER BY e.reportedAt DESC")
    List<EmergencyReport> findPendingReports();
    
    List<EmergencyReport> findByReporterId(Long reporterId);
    
    @Query("SELECT e FROM EmergencyReport e WHERE e.location.latitude BETWEEN ?1 AND ?2 AND e.location.longitude BETWEEN ?3 AND ?4")
    List<EmergencyReport> findReportsInArea(Double minLat, Double maxLat, Double minLng, Double maxLng);
} 