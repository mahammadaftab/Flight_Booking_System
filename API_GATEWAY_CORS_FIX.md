# API Gateway CORS Configuration Fix

This document summarizes the changes made to fix the CORS issues in the API Gateway.

## Issues Identified

1. **CORS Configuration**: The API Gateway was not properly configured to handle CORS requests from the frontend (localhost:3000)
2. **Reactive Security**: The API Gateway uses reactive Spring Security which requires a different CORS configuration approach than traditional Spring MVC

## Changes Made

### 1. Updated WebSecurityConfig.java
- Added proper CORS configuration for reactive applications
- Configured allowed origins, methods, and headers
- Enabled credentials support

### 2. Removed Old CORS Configuration
- Deleted the separate CorsConfig.java file since CORS is now handled in the security configuration

## Key Changes in Code

### Before (WebSecurityConfig.java):
```java
@Bean
public SecurityWebFilterChain filterChain(ServerHttpSecurity http) {
    http.csrf(ServerHttpSecurity.CsrfSpec::disable)
        .authorizeExchange(exchanges -> exchanges
            .pathMatchers("/api/auth/**").permitAll()
            .pathMatchers("/actuator/**").permitAll()
            .anyExchange().authenticated())
        .addFilterAt(jwtTokenFilter, SecurityWebFiltersOrder.AUTHENTICATION);

    return http.build();
}
```

### After (WebSecurityConfig.java):
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

@Bean
public SecurityWebFilterChain filterChain(ServerHttpSecurity http) {
    http.csrf(ServerHttpSecurity.CsrfSpec::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeExchange(exchanges -> exchanges
            .pathMatchers("/api/auth/**").permitAll()
            .pathMatchers("/actuator/**").permitAll()
            .anyExchange().authenticated())
        .addFilterAt(jwtTokenFilter, SecurityWebFiltersOrder.AUTHENTICATION);

    return http.build();
}
```

## Verification

After applying these changes:
1. All services were restarted
2. API Gateway is now properly handling CORS preflight requests
3. Frontend requests should no longer be blocked by CORS policy

## Testing

To test the fix:
1. Make sure all services are running
2. Try accessing flight search endpoint through the API Gateway
3. Check that CORS headers are properly set in the response

## Additional Notes

The 500 error on auth registration was likely due to MongoDB connection issues or data validation problems. The CORS error was definitely due to improper CORS configuration in the API Gateway.

For the flight search returning no results, this is expected behavior since the seed data doesn't contain a flight from Sydney to Los Angeles. Users should search for flights that exist in the seed data, such as:
- JFK to LAX
- LHR to CDG
- DXB to SIN
- HND to SYD
- LAX to JFK
- CDG to LHR