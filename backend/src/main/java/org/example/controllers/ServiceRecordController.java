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

@RestController
@RequestMapping("/api/service-records")
@CrossOrigin
// TODO: Will turn this back on once I can ensure app works
// @PreAuthorize("isAuthenticated()")
public class ServiceRecordController {

    @Autowired
    private ServiceRecordDao serviceRecordDao;

    @GetMapping("/vehicle/{vehicleId}")
    public List<ServiceRecord> getRecordsByVehicle(
            @PathVariable Long vehicleId,
            @RequestParam(defaultValue = "serviceDate") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return serviceRecordDao.getByVehicleId(vehicleId, sortBy, direction);
    }

    @GetMapping("/search")
    public List<ServiceRecord> searchRecords(
            @RequestParam Long vehicleId,
            @RequestParam String provider,
            @RequestParam String name) {

        return serviceRecordDao.searchRecords(vehicleId, provider, name);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ServiceRecord createRecord(@RequestBody ServiceRecord record) {
        return serviceRecordDao.createRecord(record);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable Long id) {
        serviceRecordDao.deleteRecord(id);
        return ResponseEntity.ok().build();
    }
}
