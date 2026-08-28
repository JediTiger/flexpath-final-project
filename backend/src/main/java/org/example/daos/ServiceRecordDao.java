package org.example.daos;

import org.example.models.ServiceRecord;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Component
public class ServiceRecordDao {
    // JDBC var and function
    private final JdbcTemplate jdbcTemplate;

    public ServiceRecordDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
    // Get a users service records by getting vehicle id
    public List<ServiceRecord> getByVehicleId(Long vehicleId, String sortBy, String direction) {
        String safeSortBy = sortBy.equalsIgnoreCase("cost") ? "cost" : "service_date";
        String safeDir = direction.equalsIgnoreCase("asc") ? "ASC" : "DESC";
        String sql = "SELECT * FROM service_records WHERE vehicle_id = ? ORDER BY " + safeSortBy + " " + safeDir + ";";
        return jdbcTemplate.query(sql, this::connectDBToServiceRecord, vehicleId);
    }
    // TODO: Get all public service records to display in public views

    // TODO: Search??

    // TODO: Create a service record

    // TODO: Update a service records

    // TODO: Delete a service record

    // TODO: special get for Admins so they see everything

    // TODO: connect DB results to model
    private ServiceRecord connectDBToServiceRecord(ResultSet rs, int rowNum) throws SQLException {
        ServiceRecord serviceRecord = new ServiceRecord();
        serviceRecord.setId(rs.getLong("id"));
        serviceRecord.setVehicleId(rs.getLong("vehicle_id"));
        serviceRecord.setServiceName(rs.getString("service_name"));
        serviceRecord.setServiceProvider(rs.getString("service_provider"));
        serviceRecord.setDescription(rs.getString("description"));
        serviceRecord.setCost(rs.getDouble("cost"));

        // This field will be optional so Handles nullable Integer database mapping correctly
        int mileageVal = rs.getInt("mileage");
        serviceRecord.setMileage(rs.wasNull() ? null : mileageVal);

        serviceRecord.setServiceDate(LocalDate.parse(rs.getString("service_date")));
        serviceRecord.setPrivate(rs.getBoolean("is_private"));
        return serviceRecord;
    }
}
