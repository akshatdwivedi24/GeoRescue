package com.georescue.service.impl;

import com.georescue.model.Shelter;
import com.georescue.repository.ShelterRepository;
import com.georescue.service.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShelterServiceImpl implements ShelterService {

    @Autowired
    private ShelterRepository shelterRepository;

    @Override
    @Transactional
    public Shelter createShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public Shelter updateShelter(Long id, Shelter shelter) {
        Shelter existingShelter = getShelterById(id);
        existingShelter.setName(shelter.getName());
        existingShelter.setLocation(shelter.getLocation());
        existingShelter.setStatus(shelter.getStatus());
        existingShelter.setCapacity(shelter.getCapacity());
        existingShelter.setCurrentOccupancy(shelter.getCurrentOccupancy());
        existingShelter.setResources(shelter.getResources());
        existingShelter.setFacilities(shelter.getFacilities());
        existingShelter.setContactPerson(shelter.getContactPerson());
        existingShelter.setContactPhone(shelter.getContactPhone());
        existingShelter.setNotes(shelter.getNotes());
        return shelterRepository.save(existingShelter);
    }

    @Override
    @Transactional
    public void deleteShelter(Long id) {
        shelterRepository.deleteById(id);
    }

    @Override
    public Shelter getShelterById(Long id) {
        return shelterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shelter not found with id: " + id));
    }

    @Override
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    @Override
    public List<Shelter> getSheltersByStatus(String status) {
        return shelterRepository.findByStatus(status);
    }

    @Override
    public List<Shelter> getSheltersByLocation(String location) {
        return shelterRepository.findByLocation(location);
    }

    @Override
    public List<Shelter> getAvailableShelters() {
        return shelterRepository.findByStatusNot("FULL");
    }

    @Override
    public List<Shelter> getSheltersByCapacity(int minCapacity) {
        return shelterRepository.findByCapacityGreaterThanEqual(minCapacity);
    }

    @Override
    @Transactional
    public void updateShelterStatus(Long id, String status) {
        Shelter shelter = getShelterById(id);
        shelter.setStatus(status);
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void updateOccupancy(Long id, int currentOccupancy) {
        Shelter shelter = getShelterById(id);
        shelter.setCurrentOccupancy(currentOccupancy);
        if (currentOccupancy >= shelter.getCapacity()) {
            shelter.setStatus("FULL");
        }
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void addResource(Long id, String resource) {
        Shelter shelter = getShelterById(id);
        shelter.getResources().add(resource);
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void removeResource(Long id, String resource) {
        Shelter shelter = getShelterById(id);
        shelter.getResources().remove(resource);
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void addFacility(Long id, String facility) {
        Shelter shelter = getShelterById(id);
        shelter.getFacilities().add(facility);
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void removeFacility(Long id, String facility) {
        Shelter shelter = getShelterById(id);
        shelter.getFacilities().remove(facility);
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void markShelterAsFull(Long id) {
        Shelter shelter = getShelterById(id);
        shelter.setStatus("FULL");
        shelterRepository.save(shelter);
    }

    @Override
    @Transactional
    public void markShelterAsAvailable(Long id) {
        Shelter shelter = getShelterById(id);
        shelter.setStatus("OPEN");
        shelterRepository.save(shelter);
    }

    @Override
    public List<Shelter> searchShelters(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllShelters();
        }
        
        String lowercaseQuery = query.toLowerCase();
        return shelterRepository.findAll().stream()
                .filter(shelter -> 
                    (shelter.getName() != null && shelter.getName().toLowerCase().contains(lowercaseQuery)) ||
                    (shelter.getStatus() != null && shelter.getStatus().toLowerCase().contains(lowercaseQuery)) ||
                    (shelter.getDescription() != null && shelter.getDescription().toLowerCase().contains(lowercaseQuery)) ||
                    (shelter.getAddress() != null && shelter.getAddress().toLowerCase().contains(lowercaseQuery)))
                .collect(Collectors.toList());
    }
} 