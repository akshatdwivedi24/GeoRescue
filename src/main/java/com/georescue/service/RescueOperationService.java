package com.georescue.service;

import com.georescue.model.RescueOperation;
import java.util.List;

public interface RescueOperationService {
    RescueOperation createOperation(RescueOperation operation);
    RescueOperation updateOperation(Long id, RescueOperation operation);
    void deleteOperation(Long id);
    RescueOperation getOperationById(Long id);
    List<RescueOperation> getAllOperations();
    List<RescueOperation> getOperationsByStatus(String status);
    List<RescueOperation> getOperationsByLocation(String location);
    List<RescueOperation> getActiveOperations();
    List<RescueOperation> getOperationsByIncidentId(Long incidentId);
    void updateOperationStatus(Long id, String status);
    void addTeamMember(Long id, String teamMember);
    void removeTeamMember(Long id, String teamMember);
    void updateResources(Long id, String resources);
    void markOperationAsCompleted(Long id);
    void markOperationAsCancelled(Long id);
    List<RescueOperation> searchOperations(String query);
} 