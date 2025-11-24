package com.flightbooking.auth.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.SecretKey;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    private SecretKey secretKey;
    private String secret;
    private int expirationMs = 86400000; // 24 hours

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // Generate a proper secret key for testing
        secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        secret = io.jsonwebtoken.io.Encoders.BASE64.encode(secretKey.getEncoded());
        
        // Set the private fields using reflection
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", secret);
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", expirationMs);
    }

    @Test
    void testGenerateJwtToken() {
        // Arrange
        String username = "testuser";
        var authentication = mock(org.springframework.security.core.Authentication.class);
        var userDetails = mock(org.springframework.security.core.userdetails.UserDetails.class);
        
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(userDetails.getUsername()).thenReturn(username);

        // Act
        String token = jwtUtils.generateJwtToken(authentication);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    void testGetUserNameFromJwtToken() {
        // Arrange
        String username = "testuser";
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + expirationMs))
                .signWith(secretKey)
                .compact();

        // Act
        String extractedUsername = jwtUtils.getUserNameFromJwtToken(token);

        // Assert
        assertEquals(username, extractedUsername);
    }

    @Test
    void testValidateJwtToken_ValidToken() {
        // Arrange
        String username = "testuser";
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + expirationMs))
                .signWith(secretKey)
                .compact();

        // Act
        boolean isValid = jwtUtils.validateJwtToken(token);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void testValidateJwtToken_InvalidToken() {
        // Arrange
        String invalidToken = "invalid.token.string";

        // Act
        boolean isValid = jwtUtils.validateJwtToken(invalidToken);

        // Assert
        assertFalse(isValid);
    }

    @Test
    void testValidateJwtToken_ExpiredToken() {
        // Arrange
        String username = "testuser";
        String expiredToken = Jwts.builder()
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis() - expirationMs - 1000))
                .expiration(new Date(System.currentTimeMillis() - 1000))
                .signWith(secretKey)
                .compact();

        // Act
        boolean isValid = jwtUtils.validateJwtToken(expiredToken);

        // Assert
        assertFalse(isValid);
    }
}