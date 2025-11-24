package com.flightbooking.currency.service;

import com.flightbooking.currency.entity.ExchangeRate;
import com.flightbooking.currency.repository.ExchangeRateRepository;
import com.flightbooking.currency.dto.ExchangeRateDTO;
import com.flightbooking.currency.mapper.ExchangeRateMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CurrencyService {
    @Autowired
    private ExchangeRateRepository exchangeRateRepository;

    public List<ExchangeRateDTO> getAllExchangeRates() {
        return exchangeRateRepository.findAll().stream()
                .map(ExchangeRateMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ExchangeRateDTO> getExchangeRateById(Long id) {
        return exchangeRateRepository.findById(id).map(ExchangeRateMapper::toDTO);
    }

    public Optional<ExchangeRateDTO> getExchangeRate(String fromCurrency, String toCurrency) {
        return exchangeRateRepository.findByFromCurrencyAndToCurrency(fromCurrency, toCurrency)
                .map(ExchangeRateMapper::toDTO);
    }

    public ExchangeRateDTO createExchangeRate(ExchangeRateDTO exchangeRateDTO) {
        ExchangeRate exchangeRate = ExchangeRateMapper.toEntity(exchangeRateDTO);
        exchangeRate.setLastUpdated(LocalDateTime.now());
        ExchangeRate savedExchangeRate = exchangeRateRepository.save(exchangeRate);
        return ExchangeRateMapper.toDTO(savedExchangeRate);
    }

    public ExchangeRateDTO updateExchangeRate(Long id, ExchangeRateDTO exchangeRateDTO) {
        if (exchangeRateRepository.existsById(id)) {
            ExchangeRate exchangeRate = ExchangeRateMapper.toEntity(exchangeRateDTO);
            exchangeRate.setId(id);
            exchangeRate.setLastUpdated(LocalDateTime.now());
            ExchangeRate savedExchangeRate = exchangeRateRepository.save(exchangeRate);
            return ExchangeRateMapper.toDTO(savedExchangeRate);
        }
        return null;
    }

    public void deleteExchangeRate(Long id) {
        exchangeRateRepository.deleteById(id);
    }

    public BigDecimal convertCurrency(BigDecimal amount, String fromCurrency, String toCurrency) {
        // If from and to currencies are the same, return the amount as is
        if (fromCurrency.equals(toCurrency)) {
            return amount;
        }

        // Try to find direct exchange rate
        Optional<ExchangeRate> directRate = exchangeRateRepository
                .findByFromCurrencyAndToCurrency(fromCurrency, toCurrency);

        if (directRate.isPresent()) {
            return amount.multiply(directRate.get().getRate()).setScale(4, RoundingMode.HALF_UP);
        }

        // Try to find reverse exchange rate
        Optional<ExchangeRate> reverseRate = exchangeRateRepository
                .findByFromCurrencyAndToCurrency(toCurrency, fromCurrency);

        if (reverseRate.isPresent()) {
            return amount.divide(reverseRate.get().getRate(), 4, RoundingMode.HALF_UP);
        }

        // If no direct or reverse rate found, throw an exception
        throw new IllegalArgumentException("No exchange rate found for " + fromCurrency + " to " + toCurrency);
    }
}