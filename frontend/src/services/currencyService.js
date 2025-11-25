import api from './api';

class CurrencyService {
  // Get all exchange rates
  getExchangeRates() {
    return api.get('/api/rates');
  }

  // Get exchange rate for a specific currency pair
  getExchangeRate(fromCurrency, toCurrency) {
    return api.get(`/api/rates/${fromCurrency}/${toCurrency}`);
  }

  // Convert amount from one currency to another
  convertCurrency(amount, fromCurrency, toCurrency) {
    return api.get('/api/rates/convert', {
      params: { amount, from: fromCurrency, to: toCurrency }
    });
  }

  // Get supported currencies
  getSupportedCurrencies() {
    return api.get('/api/rates/currencies');
  }
}

export default new CurrencyService();