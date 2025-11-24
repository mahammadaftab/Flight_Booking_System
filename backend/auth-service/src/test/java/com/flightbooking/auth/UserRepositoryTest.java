package com.flightbooking.auth;

import com.flightbooking.auth.entity.User;
import com.flightbooking.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.TestPropertySource;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindUser() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole("USER");

        // Act
        User savedUser = userRepository.save(user);
        Optional<User> foundUser = userRepository.findById(savedUser.getId());

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("test@example.com", foundUser.get().getEmail());
        assertEquals("password", foundUser.get().getPassword());
        assertEquals("USER", foundUser.get().getRole());
    }

    @Test
    public void testFindByEmail() {
        // Arrange
        User user = new User();
        user.setEmail("findbyemail@example.com");
        user.setPassword("password");
        user.setRole("USER");
        userRepository.save(user);

        // Act
        Optional<User> foundUser = userRepository.findByEmail("findbyemail@example.com");

        // Assert
        assertTrue(foundUser.isPresent());
        assertEquals("findbyemail@example.com", foundUser.get().getEmail());
    }

    @Test
    public void testExistsByEmail() {
        // Arrange
        User user = new User();
        user.setEmail("existstest@example.com");
        user.setPassword("password");
        user.setRole("USER");
        userRepository.save(user);

        // Act
        Boolean exists = userRepository.existsByEmail("existstest@example.com");
        Boolean notExists = userRepository.existsByEmail("nonexistent@example.com");

        // Assert
        assertTrue(exists);
        assertFalse(notExists);
    }
}