package com.georescue.service;

import com.georescue.model.Shelter;
import java.util.List;

public interface ShelterService {
    Shelter createShelter(Shelter shelter);
    Shelter updateShelter(Long id, Shelter shelter);
    void deleteShelter(Long id);
    Shelter getShelterById(Long id);
    List<Shelter> getAllShelters();
    List<Shelter> getSheltersByStatus(String status);
    List<Shelter> getSheltersByLocation(String location);
    List<Shelter> getAvailableShelters();
    List<Shelter> getSheltersByCapacity(int minCapacity);
    void updateShelterStatus(Long id, String status);
    void updateOccupancy(Long id, int currentOccupancy);
    void addResource(Long id, String resource);
    void removeResource(Long id, String resource);
    void addFacility(Long id, String facility);
    void removeFacility(Long id, String facility);
    void markShelterAsFull(Long id);
    void markShelterAsAvailable(Long id);
    List<Shelter> searchShelters(String query);
} 