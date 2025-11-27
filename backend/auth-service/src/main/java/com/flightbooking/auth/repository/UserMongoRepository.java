package com.flightbooking.auth.repository;

import com.flightbooking.auth.entity.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMongoRepository extends MongoRepository<UserMongo, String> {
    Optional<UserMongo> findByEmail(String email);
    Boolean existsByEmail(String email);
}