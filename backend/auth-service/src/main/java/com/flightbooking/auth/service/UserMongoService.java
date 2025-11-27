package com.flightbooking.auth.service;

import com.flightbooking.auth.entity.UserMongo;
import com.flightbooking.auth.repository.UserMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserMongoService {

    @Autowired
    private UserMongoRepository userMongoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<UserMongo> findByEmail(String email) {
        return userMongoRepository.findByEmail(email);
    }

    public Boolean existsByEmail(String email) {
        return userMongoRepository.existsByEmail(email);
    }

    public UserMongo saveUser(UserMongo user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMongoRepository.save(user);
    }

    public List<UserMongo> findAllUsers() {
        return userMongoRepository.findAll();
    }

    public Optional<UserMongo> findById(String id) {
        return userMongoRepository.findById(id);
    }

    public void deleteUser(String id) {
        userMongoRepository.deleteById(id);
    }
}