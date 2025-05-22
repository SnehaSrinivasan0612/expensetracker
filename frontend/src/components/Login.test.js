import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

// Mock the fetch function
global.fetch = jest.fn();

const mockSetAuth = jest.fn();

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login setAuth={mockSetAuth} />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders login form', () => {
    renderLogin();
    
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockToken = 'mock-token';
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ accessToken: mockToken })
    });

    renderLogin();

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(true);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });
  });

  test('handles failed login', async () => {
    const errorMessage = 'Invalid credentials';
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: errorMessage })
    });

    renderLogin();

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(false);
      expect(localStorage.getItem('token')).toBeNull();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('handles network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    renderLogin();

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpass' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the async operations to complete
    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(false);
      expect(localStorage.getItem('token')).toBeNull();
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });
}); 