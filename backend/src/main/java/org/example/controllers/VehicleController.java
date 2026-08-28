package org.example.controllers;

import org.example.daos.VehicleDao;
import org.example.models.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

// Needs Rest, mapping, origin and authorize annotations
@RestController
@RequestMapping({ "/vehicles", "/api/vehicles" })
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class VehicleController {

    // Needs auto wired DAO
    @Autowired
    private VehicleDao vehicleDao;
    // TODO: Get users garage (can sort by year or make)
    @GetMapping("/my")
    public List<Vehicle> getMyVehicles(
            Principal principal,
            @RequestParam(defaultValue = "year") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        return vehicleDao.getByUsername(principal.getName(), sortBy, direction);
    }
    // TODO: Get public vehicles for public view

    // TODO: Search vehicles by make or model

    // TODO: Create vehicle

    // TODO: Update vehicle

    // TODO: Delete vehicle

    // TODO: Special method for Admin view all
    }
