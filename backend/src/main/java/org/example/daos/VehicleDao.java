package org.example.daos;

import org.example.models.Vehicle;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
public class VehicleDao {
    // JDBC var and function
    private final JdbcTemplate jdbcTemplate;

    public VehicleDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    // Get a users garage (just vehicles)
    public List<Vehicle> getByUsername(String username, String sortBy, String direction) {
        String safeSortBy = sortBy.equalsIgnoreCase("make") ? "make" : "year";
        String safeDir = direction.equalsIgnoreCase("asc") ? "ASC" : "DESC";
        String sql = "SELECT * FROM vehicles WHERE username = ? ORDER BY " + safeSortBy + " " + safeDir + ";";
        return jdbcTemplate.query(sql, this::connectDAOToVehicle, username);
    }

    public List<Vehicle> getAllByUsername(String username) {
        String sql = "SELECT * FROM vehicles WHERE username = ? ORDER BY year DESC;";
        return jdbcTemplate.query(sql, this::connectDAOToVehicle, username);
    }

    // Get all public vehicles to display in public views
    public List<Vehicle> getPublicVehicles() {
        String sql = "SELECT * FROM vehicles WHERE is_private = FALSE ORDER BY year DESC;";
        return jdbcTemplate.query(sql, this::connectDAOToVehicle);
    }

    // Search by make and model
    public List<Vehicle> searchGarage(String username, String make, String model) {
        String sql = "SELECT * FROM vehicles WHERE username = ? AND make = ? AND LOWER(model) LIKE LOWER(?);";
        return jdbcTemplate.query(sql, this::connectDAOToVehicle, username, make, "%" + model + "%");
    }

    // Create a vehicle
    public Vehicle createVehicle(Vehicle vehicle) {
        String sql = "INSERT INTO vehicles (username, make, model, year, is_private) VALUES (?, ?, ?, ?, ?);";
        jdbcTemplate.update(sql, vehicle.getUsername(), vehicle.getMake(), vehicle.getModel(), vehicle.getYear(), vehicle.isPrivate());
        return vehicle;
    }

    // Update a vehicle
    public int updateVehicle(Vehicle vehicle) {
        String sql = "UPDATE vehicles SET make = ?, model = ?, year = ?, is_private = ? WHERE id = ?;";
        return jdbcTemplate.update(sql, vehicle.getMake(), vehicle.getModel(), vehicle.getYear(), vehicle.isPrivate(), vehicle.getId());
    }

    // Delete a vehicle
    // FIXME: ?? If the vehicle is deleted, wouldn't the service records for it also go?
    // FIXME: Return value never used?
    public int deleteVehicle(Long id) {
        return jdbcTemplate.update("DELETE FROM vehicles WHERE id = ?;", id);
    }

    // Special get for Admins so they see everything
    public List<Vehicle> getAllVehiclesAdmin() {
        return jdbcTemplate.query("SELECT * FROM vehicles;", this::connectDAOToVehicle);
    }

    // Connect DB results to model
    private Vehicle connectDAOToVehicle(ResultSet rs, int rowNum) throws SQLException {
        Vehicle vehicle = new Vehicle();
        vehicle.setId(rs.getLong("id"));
        vehicle.setUsername(rs.getString("username"));
        vehicle.setMake(rs.getString("make"));
        vehicle.setModel(rs.getString("model"));
        vehicle.setYear(rs.getInt("year"));
        vehicle.setPrivate(rs.getBoolean("is_private"));
        return vehicle;
    }
}
