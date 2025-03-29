package com.georescue.service;

import com.georescue.model.EmergencyReport;
import com.georescue.model.User;
import com.georescue.repository.EmergencyReportRepository;
import com.georescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class EmergencyReportService {

    @Autowired
    private EmergencyReportRepository emergencyReportRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public EmergencyReport createReport(Long userId, EmergencyReport report) {
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        report.setReporter(reporter);
        report.setReportedAt(LocalDateTime.now());
        report.setStatus("PENDING");
        
        return emergencyReportRepository.save(report);
    }

    public EmergencyReport getReport(Long id) {
        return emergencyReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    @Transactional
    public EmergencyReport updateStatus(Long id, String status) {
        EmergencyReport report = getReport(id);
        report.setStatus(status);
        
        if (status.equals("RESOLVED")) {
            report.setResolvedAt(LocalDateTime.now());
        }
        
        return emergencyReportRepository.save(report);
    }
} 