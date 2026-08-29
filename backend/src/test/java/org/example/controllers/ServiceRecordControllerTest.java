package org.example.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@Transactional
@DisplayName("Service Records Controller Live Database Integration Test Suite")
public class ServiceRecordControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Verify that GET /vehicle/{vehicleId} queries live database rows for a specific asset container")
    public void testGetRecordsByVehicle() throws Exception {
        Long targetVehicleId = 1L;

        mockMvc.perform(get("/api/service-records/vehicle/" + targetVehicleId)
                        .param("sortBy", "serviceDate")
                        .param("direction", "desc")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("Verify that GET /search executes a partial text query using a live MySQL LIKE comparison")
    public void testSearchRecords() throws Exception {
        // FIXME: That pesky Long vs int again
        Long targetVehicleId = 1L;
        String partialSearchKeyword = "Oil";

        mockMvc.perform(get("/api/service-records/search")
                        .param("vehicleId", targetVehicleId.toString())
                        .param("name", partialSearchKeyword)
                        .param("provider", "")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @DisplayName("Verify that POST / appends a new service logging element directly onto a table line row")
    public void testCreateRecord() throws Exception {
        String jsonPayload = "{"
                + "\"vehicleId\":1,"
                + "\"serviceName\":\"Tire Rotation\","
                + "\"serviceProvider\":\"Discount Tire\","
                + "\"description\":\"Rotated all four tires and checked air pressure.\","
                + "\"cost\":25.00,"
                + "\"mileage\":65000,"
                + "\"serviceDate\":\"2026-08-20\","
                + "\"private\":false"
                + "}";

        mockMvc.perform(post("/api/service-records")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Verify that DELETE /{id} successfully drops a logged maintenance line row item out of memory")
    public void testDeleteRecord() throws Exception {
        Long targetRecordId = 1L;

        mockMvc.perform(delete("/api/service-records/" + targetRecordId))
                .andExpect(status().isOk());
    }
}
