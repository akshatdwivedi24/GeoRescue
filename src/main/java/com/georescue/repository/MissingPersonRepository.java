package com.georescue.repository;

import com.georescue.model.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
    List<MissingPerson> findByStatus(String status);
    
    @Query("SELECT m FROM MissingPerson m WHERE m.status = 'MISSING' ORDER BY m.reportedAt DESC")
    List<MissingPerson> findActiveMissingPersons();
    
    List<MissingPerson> findByReporterId(Long reporterId);
    
    @Query("SELECT m FROM MissingPerson m WHERE m.lastSeenLocation LIKE %?1% OR m.name LIKE %?1% OR m.description LIKE %?1%")
    List<MissingPerson> searchMissingPersons(String query);
    
    @Query("SELECT m FROM MissingPerson m WHERE m.lastSeenLocation LIKE %?1% AND m.status = 'MISSING'")
    List<MissingPerson> findMissingPersonsByLocation(String location);
} 