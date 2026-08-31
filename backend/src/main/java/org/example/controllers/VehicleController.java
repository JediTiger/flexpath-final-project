package org.example.controllers;

import org.example.daos.VehicleDao;
import org.example.models.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin
// TODO: Will turn this back on once I can ensure the app works correctly
// @PreAuthorize("isAuthenticated()")
public class VehicleController {

    @Autowired
    private VehicleDao vehicleDao;

    String username = "user 1";

    @GetMapping("/my")
    public List<Vehicle> getMyVehicles(userName,
            @RequestParam(defaultValue = "year") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {


        if ("admin".equalsIgnoreCase(username)) {
            return vehicleDao.getAllVehiclesAdmin();
        }

        return vehicleDao.getByUsername(username, sortBy, direction);
    }
}
