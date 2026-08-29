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
@DisplayName("Vehicle Controller Live Database Integration Test Suite")
public class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("Verify that GET /my executes a real database query matching the seed data for user 1")
    public void testGetMyVehicles() throws Exception {
        mockMvc.perform(get("/api/vehicles/my")
                        .param("username", "user 1")
                        .param("sortBy", "year")
                        .param("direction", "desc")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].username").value("user 1"));
    }

    @Test
    @DisplayName("Verify that POST / writes an asset entry to the active database table successfully")
    public void testCreateVehicle_WritesToLiveDatabase() throws Exception {
        String jsonPayload = "{\"make\":\"TestBrand\",\"model\":\"TestModel\",\"year\":2026,\"private\":false}";

        mockMvc.perform(post("/api/vehicles")
                        .param("username", "user 1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonPayload))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Verify that DELETE /{id} removes an asset out of the active database schema grid matrix")
    public void testDeleteVehicle_RemovesRowFromLiveDatabase() throws Exception {
        // FIXME: IDE wants me to change this but I'm not sure I should
        Long targetIdToDelete = 1L;

        mockMvc.perform(delete("/api/vehicles/" + targetIdToDelete))
                .andExpect(status().isOk());
    }
}
