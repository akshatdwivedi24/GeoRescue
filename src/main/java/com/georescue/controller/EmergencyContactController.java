package com.georescue.controller;

import com.georescue.model.EmergencyContact;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/emergency-contacts")
@CrossOrigin(origins = "*")
public class EmergencyContactController {
    private List<EmergencyContact> contacts = new ArrayList<>();

    @PostMapping
    public ResponseEntity<EmergencyContact> createContact(@RequestBody EmergencyContact contact) {
        contact.setId(UUID.randomUUID().toString());
        contacts.add(contact);
        return ResponseEntity.ok(contact);
    }

    @GetMapping
    public ResponseEntity<List<EmergencyContact>> getAllContacts() {
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyContact> getContactById(@PathVariable String id) {
        return contacts.stream()
                .filter(contact -> contact.getId().equals(id))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(@PathVariable String id, @RequestBody EmergencyContact updatedContact) {
        for (int i = 0; i < contacts.size(); i++) {
            if (contacts.get(i).getId().equals(id)) {
                updatedContact.setId(id);
                contacts.set(i, updatedContact);
                return ResponseEntity.ok(updatedContact);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id) {
        boolean removed = contacts.removeIf(contact -> contact.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<EmergencyContact>> getContactsByType(@PathVariable String type) {
        List<EmergencyContact> typeContacts = contacts.stream()
                .filter(contact -> type.equals(contact.getType()))
                .toList();
        return ResponseEntity.ok(typeContacts);
    }

    @GetMapping("/24x7")
    public ResponseEntity<List<EmergencyContact>> get24x7Contacts() {
        List<EmergencyContact> x24Contacts = contacts.stream()
                .filter(EmergencyContact::isIs24x7)
                .toList();
        return ResponseEntity.ok(x24Contacts);
    }

    @GetMapping("/language/{language}")
    public ResponseEntity<List<EmergencyContact>> getContactsByLanguage(@PathVariable String language) {
        List<EmergencyContact> languageContacts = contacts.stream()
                .filter(contact -> {
                    String[] languages = contact.getLanguages();
                    for (String lang : languages) {
                        if (lang.equals(language)) {
                            return true;
                        }
                    }
                    return false;
                })
                .toList();
        return ResponseEntity.ok(languageContacts);
    }
} 