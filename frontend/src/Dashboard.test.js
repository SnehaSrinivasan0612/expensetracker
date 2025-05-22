import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import Dashboard from './Dashboard';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() }
  }
}));

const mockTransactions = [
  { id: 1, text: 'Salary', amount: 3000 },
  { id: 2, text: 'Rent', amount: -1000 }
];

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <GlobalProvider>
        <Dashboard />
      </GlobalProvider>
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.setItem('token', 'mock-token');
  });

  test('renders dashboard components', async () => {
    renderDashboard();
    
    // Check if main components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('balance')).toBeInTheDocument();
    expect(screen.getByTestId('income-expenses')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-list')).toBeInTheDocument();
    expect(screen.getByTestId('add-transaction')).toBeInTheDocument();
  });

  test('displays transactions when loaded', async () => {
    const axios = require('axios');
    axios.get.mockResolvedValueOnce({ data: mockTransactions });

    renderDashboard();

    // Wait for transactions to be loaded
    await waitFor(() => {
      expect(screen.getByText('Salary')).toBeInTheDocument();
      expect(screen.getByText('Rent')).toBeInTheDocument();
    });
  });

  test('handles error when loading transactions', async () => {
    const axios = require('axios');
    const errorMessage = 'Failed to fetch transactions';
    axios.get.mockRejectedValueOnce({
      response: {
        data: {
          error: errorMessage
        }
      }
    });

    renderDashboard();

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    });
  });
}); 