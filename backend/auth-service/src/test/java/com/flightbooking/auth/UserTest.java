package com.flightbooking.auth;

import com.flightbooking.auth.entity.User;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    public void testUserConstructorAndGetters() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        String role = "USER";

        // Act
        User user = new User(email, password, role);

        // Assert
        assertNull(user.getId()); // ID should be null before saving to DB
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(role, user.getRole());
    }

    @Test
    public void testUserSetters() {
        // Arrange
        User user = new User();

        // Act
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole("USER");

        // Assert
        assertEquals(1L, user.getId());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("USER", user.getRole());
    }

    @Test
    public void testDefaultConstructor() {
        // Act
        User user = new User();

        // Assert
        assertNull(user.getId());
        assertNull(user.getEmail());
        assertNull(user.getPassword());
        assertNull(user.getRole());
    }
}