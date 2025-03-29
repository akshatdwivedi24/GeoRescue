package com.georescue.service.impl;

import com.georescue.model.RescueOperation;
import com.georescue.repository.RescueOperationRepository;
import com.georescue.service.RescueOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RescueOperationServiceImpl implements RescueOperationService {

    @Autowired
    private RescueOperationRepository rescueOperationRepository;

    @Override
    @Transactional
    public RescueOperation createOperation(RescueOperation operation) {
        operation.setCreatedAt(LocalDateTime.now());
        operation.setLastUpdated(LocalDateTime.now());
        return rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public RescueOperation updateOperation(Long id, RescueOperation operation) {
        RescueOperation existingOperation = getOperationById(id);
        existingOperation.setTitle(operation.getTitle());
        existingOperation.setDescription(operation.getDescription());
        existingOperation.setLocation(operation.getLocation());
        existingOperation.setStatus(operation.getStatus());
        existingOperation.setStartTime(operation.getStartTime());
        existingOperation.setEndTime(operation.getEndTime());
        existingOperation.setTeamMembers(operation.getTeamMembers());
        existingOperation.setResources(operation.getResources());
        existingOperation.setIncidentId(operation.getIncidentId());
        existingOperation.setNotes(operation.getNotes());
        existingOperation.setLastUpdated(LocalDateTime.now());
        return rescueOperationRepository.save(existingOperation);
    }

    @Override
    @Transactional
    public void deleteOperation(Long id) {
        rescueOperationRepository.deleteById(id);
    }

    @Override
    public RescueOperation getOperationById(Long id) {
        return rescueOperationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rescue operation not found with id: " + id));
    }

    @Override
    public List<RescueOperation> getAllOperations() {
        return rescueOperationRepository.findAll();
    }

    @Override
    public List<RescueOperation> getOperationsByStatus(String status) {
        return rescueOperationRepository.findByStatus(status);
    }

    @Override
    public List<RescueOperation> getOperationsByLocation(String location) {
        return rescueOperationRepository.findByLocation(location);
    }

    @Override
    public List<RescueOperation> getActiveOperations() {
        return rescueOperationRepository.findByStatusNot("COMPLETED");
    }

    @Override
    public List<RescueOperation> getOperationsByIncidentId(Long incidentId) {
        return rescueOperationRepository.findByIncidentId(incidentId);
    }

    @Override
    @Transactional
    public void updateOperationStatus(Long id, String status) {
        RescueOperation operation = getOperationById(id);
        operation.setStatus(status);
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public void addTeamMember(Long id, String teamMember) {
        RescueOperation operation = getOperationById(id);
        operation.getTeamMembers().add(teamMember);
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public void removeTeamMember(Long id, String teamMember) {
        RescueOperation operation = getOperationById(id);
        operation.getTeamMembers().remove(teamMember);
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public void updateResources(Long id, String resources) {
        RescueOperation operation = getOperationById(id);
        operation.setResources(resources);
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public void markOperationAsCompleted(Long id) {
        RescueOperation operation = getOperationById(id);
        operation.setStatus("COMPLETED");
        operation.setEndTime(LocalDateTime.now());
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    @Transactional
    public void markOperationAsCancelled(Long id) {
        RescueOperation operation = getOperationById(id);
        operation.setStatus("CANCELLED");
        operation.setEndTime(LocalDateTime.now());
        operation.setLastUpdated(LocalDateTime.now());
        rescueOperationRepository.save(operation);
    }

    @Override
    public List<RescueOperation> searchOperations(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllOperations();
        }
        
        String lowercaseQuery = query.toLowerCase();
        return rescueOperationRepository.findAll().stream()
                .filter(operation -> 
                    (operation.getType() != null && operation.getType().toLowerCase().contains(lowercaseQuery)) ||
                    (operation.getStatus() != null && operation.getStatus().toLowerCase().contains(lowercaseQuery)) ||
                    (operation.getDescription() != null && operation.getDescription().toLowerCase().contains(lowercaseQuery)))
                .collect(Collectors.toList());
    }
} 