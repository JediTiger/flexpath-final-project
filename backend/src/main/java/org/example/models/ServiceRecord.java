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

    // Constructor(s)
    public ServiceRecord() { }

    // Parameterized Constructor
    public ServiceRecord(Long id, Long vehicleId, String serviceName, String serviceProvider,
                         String description, double cost, Integer mileage, LocalDate serviceDate, boolean isPrivate) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.serviceName = serviceName;
        this.serviceProvider = serviceProvider;
        this.description = description;
        this.cost = cost;
        this.mileage = mileage;
        this.serviceDate = serviceDate;
        this.isPrivate = isPrivate;
    }
    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public String getServiceProvider() { return serviceProvider; }
    public void setServiceProvider(String serviceProvider) { this.serviceProvider = serviceProvider; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getCost() { return cost; }
    public void setCost(double cost) { this.cost = cost; }

    public Integer getMileage() { return mileage; }
    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }

    public boolean isPrivate() { return isPrivate; }
    public void setPrivate(boolean isPrivate) { this.isPrivate = isPrivate; }
}

