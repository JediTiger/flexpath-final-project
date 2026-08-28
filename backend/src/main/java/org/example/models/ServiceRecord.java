package org.example.models;

import java.time.LocalDate;

// Field will be id, vehicleId, serviceProvider, serviceName, description, cost, mileage, serviceDate, isPrivate
/*
    - id, vehicleId will be Long
    - serviceProvider, serviceName, description, are all String
    - cost will be double
    - mileage will be integer
    - serviceDate is date
    - isPrivate is boolean
 */

public class ServiceRecord {
    // Vars for the fields
    private Long id;
    private Long vehicleId;
    private String serviceName;
    private String serviceProvider;
    private String description;
    private double cost;
    private Integer mileage;
    private LocalDate serviceDate;
    private boolean isPrivate;

    // TODO: Constructor(s)

    // TODO: Getters & Setters


}
