import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
};

// Create Context
export const GlobalContext = createContext(initialState);

// Axios interceptor setup
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    // Actions
    const getTransactions = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const res = await axios.get('http://localhost:8082/api/expenses');
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data?.error || 'Failed to fetch transactions'
            });
        }
    }, []);

    const deleteTransaction = useCallback(async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await axios.delete(`http://localhost:8082/api/expenses/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch(err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data?.error || 'Failed to delete transaction'
            });
        }
    }, []);

    const addTransaction = useCallback(async (transaction) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:8082/api/expenses', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });
        } catch(err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data?.error || 'Failed to add transaction'
            }); 
        }
    }, []);

    const deleteAllTransactions = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await axios.delete('http://localhost:8082/api/expenses/');
            dispatch({
                type: 'DELETE_ALL_TRANSACTIONS'
            });
        } catch(err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response?.data?.error || 'Failed to delete all transactions'
            });
        }
    }, []);

    // Load transactions on mount
    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    const value = {
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        deleteAllTransactions
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};