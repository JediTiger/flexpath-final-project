package org.example.controllers;

import org.example.daos.VehicleDao;
import org.example.models.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

// Needs Rest, mapping, origin and authorize annotations
@RestController
@RequestMapping({ "/vehicles", "/api/vehicles" })
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class VehicleController {

    @Autowired
    private VehicleDao vehicleDao;
    // Get users garage (can sort by year or make)
    @GetMapping("/my")
    public List<Vehicle> getMyVehicles(
            Principal principal,
            @RequestParam(defaultValue = "year") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return vehicleDao.getByUsername(principal.getName(), sortBy, direction);
    }
    // Get public vehicles for public view
    @GetMapping("/public")
    @PreAuthorize("permitAll()")
    public List<Vehicle> getPublicVehicles() {
        return vehicleDao.getPublicVehicles();
    }

    // Search vehicles by make or model
    @GetMapping("/search")
    public List<Vehicle> searchVehicles(Principal principal, @RequestParam String make, @RequestParam String model) {
        return vehicleDao.searchGarage(principal.getName(), make, model);
    }

    // Create vehicle
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Vehicle createVehicle(Principal principal, @RequestBody Vehicle vehicle) {
        vehicle.setUsername(principal.getName());
        return vehicleDao.createVehicle(vehicle);
    }
    // Update vehicle
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updatedVehicle) {
        updatedVehicle.setId(id);
        int rows = vehicleDao.updateVehicle(updatedVehicle);
        if (rows == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Vehicle registration tracking profile not found");
        }
        return ResponseEntity.ok(updatedVehicle);
    }

    // Delete vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        vehicleDao.deleteVehicle(id);
        return ResponseEntity.ok().build();
    }

    // Special method for Admin view all
    @GetMapping("/admin/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<Vehicle> getAllVehiclesForAdmin() {
        return vehicleDao.getAllVehicles();
    }

}
