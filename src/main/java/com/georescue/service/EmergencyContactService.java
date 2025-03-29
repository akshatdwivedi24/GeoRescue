package com.georescue.service;

import com.georescue.model.EmergencyContact;
import java.util.List;

public interface EmergencyContactService {
    EmergencyContact createContact(EmergencyContact contact);
    EmergencyContact updateContact(Long id, EmergencyContact contact);
    void deleteContact(Long id);
    EmergencyContact getContactById(Long id);
    List<EmergencyContact> getAllContacts();
    List<EmergencyContact> getContactsByUserId(Long userId);
    List<EmergencyContact> searchContacts(String query);
    void updateContactPriority(Long id, int priority);
    void markContactAsActive(Long id);
    void markContactAsInactive(Long id);
    List<EmergencyContact> getContactsByType(String type);
    List<EmergencyContact> get24x7Contacts();
    List<EmergencyContact> getContactsByLanguage(String language);
} 