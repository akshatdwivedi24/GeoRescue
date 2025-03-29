package com.georescue.service;

import com.georescue.model.MissingPerson;
import com.georescue.model.User;
import com.georescue.repository.MissingPersonRepository;
import com.georescue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class MissingPersonService {

    @Autowired
    private MissingPersonRepository missingPersonRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public MissingPerson createReport(Long userId, MissingPerson report) {
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        report.setReporter(reporter);
        report.setReportedAt(LocalDateTime.now());
        report.setStatus("MISSING");
        
        return missingPersonRepository.save(report);
    }

    public MissingPerson getReport(Long id) {
        return missingPersonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));
    }

    @Transactional
    public MissingPerson updateStatus(Long id, String status) {
        MissingPerson report = getReport(id);
        report.setStatus(status);
        
        if (status.equals("FOUND")) {
            report.setFoundAt(LocalDateTime.now());
        }
        
        return missingPersonRepository.save(report);
    }
} 