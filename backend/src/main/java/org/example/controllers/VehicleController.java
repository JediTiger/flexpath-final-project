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
//@PreAuthorize("isAuthenticated()")
@PreAuthorize("permitAll()")
public class VehicleController {

    @Autowired
    private VehicleDao vehicleDao;

    @GetMapping("/my")
    public List<Vehicle> getMyVehicles(
            Principal principal,
            @RequestParam(defaultValue = "year") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        String username = principal.getName();

        if ("admin".equalsIgnoreCase(username)) {
            return vehicleDao.getAllVehiclesAdmin();
        }

        return vehicleDao.getByUsername(username, sortBy, direction);
    }
}
