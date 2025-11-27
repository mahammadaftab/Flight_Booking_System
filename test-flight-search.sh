#!/bin/bash

echo "Testing flight search without authentication..."
curl -H "Origin: http://localhost:3000" \
     -w "\nHTTP Status: %{http_code}\n" \
     -s "http://localhost:8080/api/flights/search?from=JFK&to=LAX&date=2026-01-10"

echo ""
echo "Testing flight search with invalid token..."
curl -H "Origin: http://localhost:3000" \
     -H "Authorization: Bearer invalid-token" \
     -w "\nHTTP Status: %{http_code}\n" \
     -s "http://localhost:8080/api/flights/search?from=JFK&to=LAX&date=2026-01-10"

echo ""
echo "Testing flight search with valid format but expired token..."
curl -H "Origin: http://localhost:3000" \
     -H "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.invalid.payload" \
     -w "\nHTTP Status: %{http_code}\n" \
     -s "http://localhost:8080/api/flights/search?from=JFK&to=LAX&date=2026-01-10"