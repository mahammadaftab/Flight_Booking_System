package com.flightbooking.currency.mapper;

import com.flightbooking.currency.entity.ExchangeRate;
import com.flightbooking.currency.dto.ExchangeRateDTO;

public class ExchangeRateMapper {
    public static ExchangeRateDTO toDTO(ExchangeRate exchangeRate) {
        if (exchangeRate == null) {
            return null;
        }
        
        return new ExchangeRateDTO(
                exchangeRate.getId(),
                exchangeRate.getFromCurrency(),
                exchangeRate.getToCurrency(),
                exchangeRate.getRate(),
                exchangeRate.getLastUpdated()
        );
    }
    
    public static ExchangeRate toEntity(ExchangeRateDTO exchangeRateDTO) {
        if (exchangeRateDTO == null) {
            return null;
        }
        
        return new ExchangeRate(
                exchangeRateDTO.getFromCurrency(),
                exchangeRateDTO.getToCurrency(),
                exchangeRateDTO.getRate(),
                exchangeRateDTO.getLastUpdated()
        );
    }
}