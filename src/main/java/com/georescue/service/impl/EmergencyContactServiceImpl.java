package com.georescue.service.impl;

import com.georescue.model.EmergencyContact;
import com.georescue.repository.EmergencyContactRepository;
import com.georescue.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmergencyContactServiceImpl implements EmergencyContactService {

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    @Override
    @Transactional
    public EmergencyContact createContact(EmergencyContact contact) {
        contact.setActive(true);
        return emergencyContactRepository.save(contact);
    }

    @Override
    @Transactional
    public EmergencyContact updateContact(Long id, EmergencyContact contact) {
        EmergencyContact existingContact = getContactById(id);
        existingContact.setName(contact.getName());
        existingContact.setPhone(contact.getPhone());
        existingContact.setEmail(contact.getEmail());
        existingContact.setRelationship(contact.getRelationship());
        existingContact.setNotes(contact.getNotes());
        existingContact.setPriority(contact.getPriority());
        return emergencyContactRepository.save(existingContact);
    }

    @Override
    @Transactional
    public void deleteContact(Long id) {
        emergencyContactRepository.deleteById(id);
    }

    @Override
    public EmergencyContact getContactById(Long id) {
        return emergencyContactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emergency contact not found with id: " + id));
    }

    @Override
    public List<EmergencyContact> getAllContacts() {
        return emergencyContactRepository.findAll();
    }

    @Override
    public List<EmergencyContact> getContactsByUserId(Long userId) {
        return emergencyContactRepository.findByUserId(userId);
    }

    @Override
    public List<EmergencyContact> getContactsByType(String type) {
        return emergencyContactRepository.findAll().stream()
                .filter(contact -> contact.getType() != null && contact.getType().equalsIgnoreCase(type))
                .collect(Collectors.toList());
    }

    @Override
    public List<EmergencyContact> get24x7Contacts() {
        return emergencyContactRepository.findAll().stream()
                .filter(EmergencyContact::isAvailable24x7)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmergencyContact> getContactsByLanguage(String language) {
        return emergencyContactRepository.findAll().stream()
                .filter(contact -> contact.getLanguages() != null && 
                        contact.getLanguages().stream()
                                .anyMatch(lang -> lang.equalsIgnoreCase(language)))
                .collect(Collectors.toList());
    }

    @Override
    public List<EmergencyContact> searchContacts(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllContacts();
        }
        
        String lowercaseQuery = query.toLowerCase();
        return emergencyContactRepository.findAll().stream()
                .filter(contact -> 
                    (contact.getName() != null && contact.getName().toLowerCase().contains(lowercaseQuery)) ||
                    (contact.getPhone() != null && contact.getPhone().contains(lowercaseQuery)) ||
                    (contact.getEmail() != null && contact.getEmail().toLowerCase().contains(lowercaseQuery)) ||
                    (contact.getType() != null && contact.getType().toLowerCase().contains(lowercaseQuery)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void updateContactPriority(Long id, int priority) {
        EmergencyContact contact = getContactById(id);
        contact.setPriority(priority);
        emergencyContactRepository.save(contact);
    }

    @Override
    @Transactional
    public void markContactAsActive(Long id) {
        EmergencyContact contact = getContactById(id);
        contact.setActive(true);
        emergencyContactRepository.save(contact);
    }

    @Override
    @Transactional
    public void markContactAsInactive(Long id) {
        EmergencyContact contact = getContactById(id);
        contact.setActive(false);
        emergencyContactRepository.save(contact);
    }
} 