package com.georescue.service;

import com.georescue.model.Alert;
import java.util.List;

public interface AlertService {
    Alert createAlert(Alert alert);
    Alert updateAlert(Long id, Alert alert);
    void deleteAlert(Long id);
    Alert getAlertById(Long id);
    List<Alert> getAllAlerts();
    List<Alert> getAlertsByStatus(String status);
    List<Alert> getAlertsBySeverity(String severity);
    List<Alert> getAlertsByLocation(String location);
    List<Alert> getActiveAlerts();
    void markAlertAsResolved(Long id);
    void markAlertAsUrgent(Long id);
} 