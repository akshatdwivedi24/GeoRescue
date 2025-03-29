package com.georescue.service.impl;

import com.georescue.model.Alert;
import com.georescue.repository.AlertRepository;
import com.georescue.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AlertServiceImpl implements AlertService {

    @Autowired
    private AlertRepository alertRepository;

    @Override
    @Transactional
    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    @Override
    @Transactional
    public Alert updateAlert(Long id, Alert alert) {
        Optional<Alert> existingAlert = alertRepository.findById(id);
        if (existingAlert.isPresent()) {
            Alert updatedAlert = existingAlert.get();
            updatedAlert.setTitle(alert.getTitle());
            updatedAlert.setDescription(alert.getDescription());
            updatedAlert.setLocation(alert.getLocation());
            updatedAlert.setStatus(alert.getStatus());
            updatedAlert.setSeverity(alert.getSeverity());
            updatedAlert.setReportedBy(alert.getReportedBy());
            updatedAlert.setNotes(alert.getNotes());
            return alertRepository.save(updatedAlert);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteAlert(Long id) {
        alertRepository.deleteById(id);
    }

    @Override
    public Alert getAlertById(Long id) {
        return alertRepository.findById(id).orElse(null);
    }

    @Override
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @Override
    public List<Alert> getAlertsByStatus(String status) {
        return alertRepository.findByStatus(status);
    }

    @Override
    public List<Alert> getAlertsBySeverity(String severity) {
        return alertRepository.findBySeverity(severity);
    }

    @Override
    public List<Alert> getAlertsByLocation(String location) {
        return alertRepository.findByLocation(location);
    }

    @Override
    public List<Alert> getActiveAlerts() {
        return alertRepository.findByStatusNot("RESOLVED");
    }

    @Override
    @Transactional
    public void markAlertAsResolved(Long id) {
        Optional<Alert> alert = alertRepository.findById(id);
        if (alert.isPresent()) {
            Alert updatedAlert = alert.get();
            updatedAlert.setStatus("RESOLVED");
            alertRepository.save(updatedAlert);
        }
    }

    @Override
    @Transactional
    public void markAlertAsUrgent(Long id) {
        Optional<Alert> alert = alertRepository.findById(id);
        if (alert.isPresent()) {
            Alert updatedAlert = alert.get();
            updatedAlert.setSeverity("HIGH");
            alertRepository.save(updatedAlert);
        }
    }
} 