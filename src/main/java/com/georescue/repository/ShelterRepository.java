package com.georescue.repository;

import com.georescue.model.Shelter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ShelterRepository extends JpaRepository<Shelter, Long> {
    List<Shelter> findByStatus(String status);
    List<Shelter> findByLocation(String location);
    List<Shelter> findByStatusNot(String status);
    List<Shelter> findByCapacityGreaterThanEqual(int minCapacity);
} 