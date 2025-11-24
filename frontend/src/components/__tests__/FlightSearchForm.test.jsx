import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FlightSearchForm from '../FlightSearchForm';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('FlightSearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnSearch.mockClear();
  });

  test('renders flight search form with all fields', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('From')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Departure Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search Flights' })).toBeInTheDocument();
  });

  test('allows user to fill in form fields', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    const fromInput = screen.getByPlaceholderText('From');
    const toInput = screen.getByPlaceholderText('To');
    const dateInput = screen.getByLabelText('Departure Date');

    fireEvent.change(fromInput, { target: { value: 'JFK' } });
    fireEvent.change(toInput, { target: { value: 'LAX' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });

    expect(fromInput.value).toBe('JFK');
    expect(toInput.value).toBe('LAX');
    expect(dateInput.value).toBe('2024-12-25');
  });

  test('calls onSearch with form data when search button is clicked', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    const fromInput = screen.getByPlaceholderText('From');
    const toInput = screen.getByPlaceholderText('To');
    const dateInput = screen.getByLabelText('Departure Date');
    const searchButton = screen.getByRole('button', { name: 'Search Flights' });

    fireEvent.change(fromInput, { target: { value: 'JFK' } });
    fireEvent.change(toInput, { target: { value: 'LAX' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({
      from: 'JFK',
      to: 'LAX',
      date: '2024-12-25',
    });
  });

  test('navigates to search results page after search', () => {
    render(
      <BrowserRouter>
        <FlightSearchForm onSearch={mockOnSearch} />
      </BrowserRouter>
    );

    const fromInput = screen.getByPlaceholderText('From');
    const toInput = screen.getByPlaceholderText('To');
    const dateInput = screen.getByLabelText('Departure Date');
    const searchButton = screen.getByRole('button', { name: 'Search Flights' });

    fireEvent.change(fromInput, { target: { value: 'JFK' } });
    fireEvent.change(toInput, { target: { value: 'LAX' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search-results');
  });
});