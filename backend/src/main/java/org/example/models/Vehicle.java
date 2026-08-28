package org.example.models;

// Field will be id, username, make, model, year, isPrivate
/*
    - id will be Long
    - username, make, model are all String
    - year will be int
    - isPrivate is boolean
 */

public class Vehicle {
    // Vars for the fields
    private Long id;
    private String username;
    private String make;
    private String model;
    private int year;
    private boolean isPrivate;
    // Constructor(s)
    public Vehicle() { }

    public Vehicle(Long id, String username, String make, String model, int year, boolean isPrivate) {
        this.id = id;
        this.username = username;
        this.make = make;
        this.model = model;
        this.year = year;
        this.isPrivate = isPrivate;
    }
    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public boolean isPrivate() { return isPrivate; }
    public void setPrivate(boolean isPrivate) { this.isPrivate = isPrivate; }
}
