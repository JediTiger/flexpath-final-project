package org.example.controllers;

import org.example.daos.ServiceRecordDao;
import org.example.models.ServiceRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

// TODO: Needs Rest, mapping, origin and authorize annotations
@RestController
@RequestMapping({ "/service-records", "/api/service-records" })
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class ServiceRecordController {

    // Needs auto wired DAO
    @Autowired
    private ServiceRecordDao serviceRecordDao;

    // Get users service records (can sort by year or make)
    @GetMapping("/vehicle/{vehicleId}")
    public List<ServiceRecord> getRecordsByVehicle(
            @PathVariable Long vehicleId,
            @RequestParam(defaultValue = "serviceDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return serviceRecordDao.getByVehicleId(vehicleId, sortBy, direction);
    }

    // TODO: Get public service records for public view

    // TODO: Search service records by make or model
    @GetMapping("/search")
    public List<ServiceRecord> searchRecords(
            @RequestParam Long vehicleId,
            @RequestParam String provider,
            @RequestParam String name) {
        return serviceRecordDao.searchRecords(vehicleId, provider, name);
    }

    // Create a service record
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ServiceRecord createRecord(@RequestBody ServiceRecord record) {
        return serviceRecordDao.createRecord(record);
    }

    // Update a service record
    @PutMapping("/{id}")
    public ResponseEntity<ServiceRecord> updateRecord(@PathVariable Long id, @RequestBody ServiceRecord updatedRecord) {
        updatedRecord.setId(id);
        int rows = serviceRecordDao.updateRecord(updatedRecord);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Service event log file reference not found");
        }
        return ResponseEntity.ok(updatedRecord);
    }

    // Delete a service record
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        serviceRecordDao.deleteRecord(id);
        return ResponseEntity.ok().build();
    }

    // Special method for Admin view all
    // FIXME: Don't forget to account for the admin page
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> adminDeleteRecord(@PathVariable Long id) {
        serviceRecordDao.deleteRecord(id);
        return ResponseEntity.ok().build();
    }
}
