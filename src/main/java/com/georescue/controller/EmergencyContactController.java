package com.georescue.controller;

import com.georescue.model.EmergencyContact;
import com.georescue.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-contacts")
@CrossOrigin(origins = "*")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactService emergencyContactService;

    @PostMapping
    public ResponseEntity<EmergencyContact> createContact(@RequestBody EmergencyContact contact) {
        return ResponseEntity.ok(emergencyContactService.createContact(contact));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(@PathVariable Long id, @RequestBody EmergencyContact contact) {
        return ResponseEntity.ok(emergencyContactService.updateContact(id, contact));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        emergencyContactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyContact> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(emergencyContactService.getContactById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmergencyContact>> getAllContacts() {
        return ResponseEntity.ok(emergencyContactService.getAllContacts());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EmergencyContact>> getContactsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(emergencyContactService.getContactsByUserId(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmergencyContact>> searchContacts(@RequestParam String query) {
        return ResponseEntity.ok(emergencyContactService.searchContacts(query));
    }

    @PutMapping("/{id}/priority")
    public ResponseEntity<Void> updateContactPriority(@PathVariable Long id, @RequestParam int priority) {
        emergencyContactService.updateContactPriority(id, priority);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> markContactAsActive(@PathVariable Long id) {
        emergencyContactService.markContactAsActive(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> markContactAsInactive(@PathVariable Long id) {
        emergencyContactService.markContactAsInactive(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<EmergencyContact>> getContactsByType(@PathVariable String type) {
        List<EmergencyContact> typeContacts = emergencyContactService.getContactsByType(type);
        return ResponseEntity.ok(typeContacts);
    }

    @GetMapping("/24x7")
    public ResponseEntity<List<EmergencyContact>> get24x7Contacts() {
        List<EmergencyContact> x24Contacts = emergencyContactService.get24x7Contacts();
        return ResponseEntity.ok(x24Contacts);
    }

    @GetMapping("/language/{language}")
    public ResponseEntity<List<EmergencyContact>> getContactsByLanguage(@PathVariable String language) {
        List<EmergencyContact> languageContacts = emergencyContactService.getContactsByLanguage(language);
        return ResponseEntity.ok(languageContacts);
    }
} 