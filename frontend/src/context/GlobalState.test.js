import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { GlobalProvider, GlobalContext } from './GlobalState';
import axios from 'axios';

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

const TestComponent = () => {
  const context = React.useContext(GlobalContext);
  return (
    <div>
      <div data-testid="transactions">{JSON.stringify(context.transactions)}</div>
      <div data-testid="error">{context.error}</div>
      <div data-testid="loading">{context.loading.toString()}</div>
      <button onClick={() => context.getTransactions()}>Get Transactions</button>
      <button onClick={() => context.addTransaction({ text: 'Test', amount: 100 })}>Add Transaction</button>
      <button onClick={() => context.deleteTransaction(1)}>Delete Transaction</button>
      <button onClick={() => context.deleteAllTransactions()}>Delete All</button>
    </div>
  );
};

const renderWithContext = () => {
  return render(
    <GlobalProvider>
      <TestComponent />
    </GlobalProvider>
  );
};

describe('GlobalState Context', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('token', 'mock-token');
  });

  test('initial state is correct', () => {
    const { getByTestId } = renderWithContext();
    
    expect(getByTestId('transactions').textContent).toBe('[]');
    expect(getByTestId('error').textContent).toBe('');
    expect(getByTestId('loading').textContent).toBe('true');
  });

  test('getTransactions updates state correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: mockTransactions });
    
    const { getByTestId, getByText } = renderWithContext();
    
    await act(async () => {
      getByText('Get Transactions').click();
    });

    await waitFor(() => {
      expect(getByTestId('transactions').textContent).toBe(JSON.stringify(mockTransactions));
      expect(getByTestId('loading').textContent).toBe('false');
    });
  });

  test('addTransaction updates state correctly', async () => {
    const newTransaction = { text: 'Test', amount: 100 };
    const responseData = { id: 3, ...newTransaction };
    axios.post.mockResolvedValueOnce({ data: responseData });
    
    const { getByTestId, getByText } = renderWithContext();
    
    await act(async () => {
      getByText('Add Transaction').click();
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8082/api/expenses',
        newTransaction,
        expect.any(Object)
      );
      expect(getByTestId('transactions').textContent).toContain(JSON.stringify(responseData));
    });
  });

  test('deleteTransaction updates state correctly', async () => {
    axios.delete.mockResolvedValueOnce({});
    
    const { getByText } = renderWithContext();
    
    await act(async () => {
      getByText('Delete Transaction').click();
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:8082/api/expenses/1');
    });
  });

  test('handles errors correctly', async () => {
    const errorMessage = 'Failed to fetch transactions';
    axios.get.mockRejectedValueOnce({
      response: {
        data: {
          error: errorMessage
        }
      }
    });
    
    const { getByTestId, getByText } = renderWithContext();
    
    await act(async () => {
      getByText('Get Transactions').click();
    });

    await waitFor(() => {
      expect(getByTestId('error').textContent).toBe(errorMessage);
      expect(getByTestId('loading').textContent).toBe('false');
    });
  });
}); 