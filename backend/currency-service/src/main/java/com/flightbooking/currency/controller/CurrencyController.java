package com.flightbooking.currency.controller;

import com.flightbooking.currency.dto.ExchangeRateDTO;
import com.flightbooking.currency.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rates")
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @GetMapping
    public List<ExchangeRateDTO> getAllExchangeRates() {
        return currencyService.getAllExchangeRates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExchangeRateDTO> getExchangeRateById(@PathVariable Long id) {
        Optional<ExchangeRateDTO> exchangeRate = currencyService.getExchangeRateById(id);
        return exchangeRate.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/convert")
    public ResponseEntity<BigDecimal> convertCurrency(
            @RequestParam BigDecimal amount,
            @RequestParam String from,
            @RequestParam String to) {
        try {
            BigDecimal convertedAmount = currencyService.convertCurrency(amount, from, to);
            return ResponseEntity.ok(convertedAmount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{from}/{to}")
    public ResponseEntity<ExchangeRateDTO> getExchangeRate(@PathVariable String from, @PathVariable String to) {
        Optional<ExchangeRateDTO> exchangeRate = currencyService.getExchangeRate(from, to);
        return exchangeRate.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExchangeRateDTO createExchangeRate(@RequestBody ExchangeRateDTO exchangeRateDTO) {
        return currencyService.createExchangeRate(exchangeRateDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExchangeRateDTO> updateExchangeRate(@PathVariable Long id, @RequestBody ExchangeRateDTO exchangeRateDTO) {
        ExchangeRateDTO updatedExchangeRate = currencyService.updateExchangeRate(id, exchangeRateDTO);
        if (updatedExchangeRate != null) {
            return ResponseEntity.ok(updatedExchangeRate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExchangeRate(@PathVariable Long id) {
        currencyService.deleteExchangeRate(id);
        return ResponseEntity.noContent().build();
    }
}