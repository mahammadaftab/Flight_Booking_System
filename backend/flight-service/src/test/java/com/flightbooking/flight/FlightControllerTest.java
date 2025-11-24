package com.flightbooking.flight;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flightbooking.flight.controller.FlightController;
import com.flightbooking.flight.dto.FlightDTO;
import com.flightbooking.flight.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class FlightControllerTest {

    private MockMvc mockMvc;

    @Mock
    private FlightService flightService;

    @InjectMocks
    private FlightController flightController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(flightController).build();
    }

    @Test
    public void testGetAllFlights() throws Exception {
        // Arrange
        FlightDTO flight1 = new FlightDTO();
        flight1.setId(1L);
        flight1.setFlightNumber("FL001");
        flight1.setOrigin("JFK");
        flight1.setDestination("LAX");
        flight1.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight1.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight1.setPrice(299.99);

        FlightDTO flight2 = new FlightDTO();
        flight2.setId(2L);
        flight2.setFlightNumber("FL002");
        flight2.setOrigin("LAX");
        flight2.setDestination("SFO");
        flight2.setDepartureTime(LocalDateTime.now().plusDays(2));
        flight2.setArrivalTime(LocalDateTime.now().plusDays(2).plusHours(1));
        flight2.setPrice(199.99);

        when(flightService.getAllFlights()).thenReturn(Arrays.asList(flight1, flight2));

        // Act & Assert
        mockMvc.perform(get("/api/flights")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].flightNumber").value("FL001"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].flightNumber").value("FL002"));

        verify(flightService, times(1)).getAllFlights();
    }

    @Test
    public void testGetFlightById() throws Exception {
        // Arrange
        FlightDTO flight = new FlightDTO();
        flight.setId(1L);
        flight.setFlightNumber("FL001");
        flight.setOrigin("JFK");
        flight.setDestination("LAX");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight.setPrice(299.99);

        when(flightService.getFlightById(1L)).thenReturn(Optional.of(flight));

        // Act & Assert
        mockMvc.perform(get("/api/flights/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.flightNumber").value("FL001"))
                .andExpect(jsonPath("$.origin").value("JFK"))
                .andExpect(jsonPath("$.destination").value("LAX"));

        verify(flightService, times(1)).getFlightById(1L);
    }

    @Test
    public void testGetFlightById_NotFound() throws Exception {
        // Arrange
        when(flightService.getFlightById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/flights/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(flightService, times(1)).getFlightById(1L);
    }

    @Test
    public void testCreateFlight() throws Exception {
        // Arrange
        FlightDTO flight = new FlightDTO();
        flight.setId(1L);
        flight.setFlightNumber("FL001");
        flight.setOrigin("JFK");
        flight.setDestination("LAX");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight.setPrice(299.99);

        when(flightService.createFlight(any(FlightDTO.class))).thenReturn(flight);

        // Act & Assert
        mockMvc.perform(post("/api/flights")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(flight)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.flightNumber").value("FL001"));

        verify(flightService, times(1)).createFlight(any(FlightDTO.class));
    }

    @Test
    public void testUpdateFlight() throws Exception {
        // Arrange
        FlightDTO flight = new FlightDTO();
        flight.setId(1L);
        flight.setFlightNumber("FL001");
        flight.setOrigin("JFK");
        flight.setDestination("LAX");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight.setPrice(299.99);

        when(flightService.updateFlight(anyLong(), any(FlightDTO.class))).thenReturn(flight);

        // Act & Assert
        mockMvc.perform(put("/api/flights/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(flight)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.flightNumber").value("FL001"));

        verify(flightService, times(1)).updateFlight(anyLong(), any(FlightDTO.class));
    }

    @Test
    public void testDeleteFlight() throws Exception {
        // Act & Assert
        mockMvc.perform(delete("/api/flights/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(flightService, times(1)).deleteFlight(1L);
    }
}