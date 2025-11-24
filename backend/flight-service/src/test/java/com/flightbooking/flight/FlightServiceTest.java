package com.flightbooking.flight;

import com.flightbooking.flight.dto.FlightDTO;
import com.flightbooking.flight.entity.Flight;
import com.flightbooking.flight.mapper.FlightMapper;
import com.flightbooking.flight.repository.FlightRepository;
import com.flightbooking.flight.service.FlightService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class FlightServiceTest {

    @Mock
    private FlightRepository flightRepository;

    @Mock
    private FlightMapper flightMapper;

    @InjectMocks
    private FlightService flightService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllFlights() {
        // Arrange
        Flight flight1 = new Flight();
        flight1.setId(1L);
        flight1.setFlightNumber("FL001");
        flight1.setOrigin("JFK");
        flight1.setDestination("LAX");
        flight1.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight1.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight1.setPrice(299.99);

        Flight flight2 = new Flight();
        flight2.setId(2L);
        flight2.setFlightNumber("FL002");
        flight2.setOrigin("LAX");
        flight2.setDestination("SFO");
        flight2.setDepartureTime(LocalDateTime.now().plusDays(2));
        flight2.setArrivalTime(LocalDateTime.now().plusDays(2).plusHours(1));
        flight2.setPrice(199.99);

        FlightDTO flightDTO1 = new FlightDTO();
        flightDTO1.setId(1L);
        flightDTO1.setFlightNumber("FL001");
        flightDTO1.setOrigin("JFK");
        flightDTO1.setDestination("LAX");
        flightDTO1.setDepartureTime(LocalDateTime.now().plusDays(1));
        flightDTO1.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flightDTO1.setPrice(299.99);

        FlightDTO flightDTO2 = new FlightDTO();
        flightDTO2.setId(2L);
        flightDTO2.setFlightNumber("FL002");
        flightDTO2.setOrigin("LAX");
        flightDTO2.setDestination("SFO");
        flightDTO2.setDepartureTime(LocalDateTime.now().plusDays(2));
        flightDTO2.setArrivalTime(LocalDateTime.now().plusDays(2).plusHours(1));
        flightDTO2.setPrice(199.99);

        when(flightRepository.findAll()).thenReturn(Arrays.asList(flight1, flight2));
        when(flightMapper.toDto(flight1)).thenReturn(flightDTO1);
        when(flightMapper.toDto(flight2)).thenReturn(flightDTO2);

        // Act
        var result = flightService.getAllFlights();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("FL001", result.get(0).getFlightNumber());
        assertEquals("FL002", result.get(1).getFlightNumber());

        verify(flightRepository, times(1)).findAll();
        verify(flightMapper, times(2)).toDto(any(Flight.class));
    }

    @Test
    public void testGetFlightById() {
        // Arrange
        Flight flight = new Flight();
        flight.setId(1L);
        flight.setFlightNumber("FL001");
        flight.setOrigin("JFK");
        flight.setDestination("LAX");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight.setPrice(299.99);

        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setId(1L);
        flightDTO.setFlightNumber("FL001");
        flightDTO.setOrigin("JFK");
        flightDTO.setDestination("LAX");
        flightDTO.setDepartureTime(LocalDateTime.now().plusDays(1));
        flightDTO.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flightDTO.setPrice(299.99);

        when(flightRepository.findById(1L)).thenReturn(Optional.of(flight));
        when(flightMapper.toDto(flight)).thenReturn(flightDTO);

        // Act
        var result = flightService.getFlightById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("FL001", result.get().getFlightNumber());
        assertEquals("JFK", result.get().getOrigin());
        assertEquals("LAX", result.get().getDestination());

        verify(flightRepository, times(1)).findById(1L);
        verify(flightMapper, times(1)).toDto(flight);
    }

    @Test
    public void testGetFlightById_NotFound() {
        // Arrange
        when(flightRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        var result = flightService.getFlightById(1L);

        // Assert
        assertFalse(result.isPresent());

        verify(flightRepository, times(1)).findById(1L);
        verify(flightMapper, never()).toDto(any(Flight.class));
    }

    @Test
    public void testCreateFlight() {
        // Arrange
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setFlightNumber("FL001");
        flightDTO.setOrigin("JFK");
        flightDTO.setDestination("LAX");
        flightDTO.setDepartureTime(LocalDateTime.now().plusDays(1));
        flightDTO.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flightDTO.setPrice(299.99);

        Flight flight = new Flight();
        flight.setId(1L);
        flight.setFlightNumber("FL001");
        flight.setOrigin("JFK");
        flight.setDestination("LAX");
        flight.setDepartureTime(LocalDateTime.now().plusDays(1));
        flight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flight.setPrice(299.99);

        when(flightMapper.toEntity(flightDTO)).thenReturn(flight);
        when(flightRepository.save(flight)).thenReturn(flight);
        when(flightMapper.toDto(flight)).thenReturn(flightDTO);

        // Act
        var result = flightService.createFlight(flightDTO);

        // Assert
        assertNotNull(result);
        assertEquals("FL001", result.getFlightNumber());
        assertEquals(1L, result.getId());

        verify(flightMapper, times(1)).toEntity(flightDTO);
        verify(flightRepository, times(1)).save(flight);
        verify(flightMapper, times(1)).toDto(flight);
    }

    @Test
    public void testUpdateFlight() {
        // Arrange
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setFlightNumber("FL001");
        flightDTO.setOrigin("JFK");
        flightDTO.setDestination("LAX");
        flightDTO.setDepartureTime(LocalDateTime.now().plusDays(1));
        flightDTO.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flightDTO.setPrice(299.99);

        Flight existingFlight = new Flight();
        existingFlight.setId(1L);
        existingFlight.setFlightNumber("FL000");
        existingFlight.setOrigin("SFO");
        existingFlight.setDestination("LAX");
        existingFlight.setDepartureTime(LocalDateTime.now().plusDays(1));
        existingFlight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        existingFlight.setPrice(199.99);

        Flight updatedFlight = new Flight();
        updatedFlight.setId(1L);
        updatedFlight.setFlightNumber("FL001");
        updatedFlight.setOrigin("JFK");
        updatedFlight.setDestination("LAX");
        updatedFlight.setDepartureTime(LocalDateTime.now().plusDays(1));
        updatedFlight.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        updatedFlight.setPrice(299.99);

        when(flightRepository.findById(1L)).thenReturn(Optional.of(existingFlight));
        when(flightRepository.save(existingFlight)).thenReturn(updatedFlight);
        when(flightMapper.toDto(updatedFlight)).thenReturn(flightDTO);

        // Act
        var result = flightService.updateFlight(1L, flightDTO);

        // Assert
        assertNotNull(result);
        assertEquals("FL001", result.getFlightNumber());
        assertEquals("JFK", result.getOrigin());

        verify(flightRepository, times(1)).findById(1L);
        verify(flightRepository, times(1)).save(existingFlight);
        verify(flightMapper, times(1)).toDto(updatedFlight);
    }

    @Test
    public void testUpdateFlight_NotFound() {
        // Arrange
        FlightDTO flightDTO = new FlightDTO();
        flightDTO.setFlightNumber("FL001");
        flightDTO.setOrigin("JFK");
        flightDTO.setDestination("LAX");
        flightDTO.setDepartureTime(LocalDateTime.now().plusDays(1));
        flightDTO.setArrivalTime(LocalDateTime.now().plusDays(1).plusHours(6));
        flightDTO.setPrice(299.99);

        when(flightRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        var result = flightService.updateFlight(1L, flightDTO);

        // Assert
        assertNull(result);

        verify(flightRepository, times(1)).findById(1L);
        verify(flightRepository, never()).save(any(Flight.class));
        verify(flightMapper, never()).toDto(any(Flight.class));
    }

    @Test
    public void testDeleteFlight() {
        // Arrange
        doNothing().when(flightRepository).deleteById(1L);

        // Act
        flightService.deleteFlight(1L);

        // Assert
        verify(flightRepository, times(1)).deleteById(1L);
    }
}