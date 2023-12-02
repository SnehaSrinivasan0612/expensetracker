import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = 
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsImlhdCI6MTcwMTUxMjI2MCwiZXhwIjoxNzAxNTk4NjYwfQ.hG4EKwzirt7AkcgG7Fy1eHdjzTIc_9LTX14sFSA98p0"
        return config;
    },(error) => {
        return Promise.reject(error);
      }
);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get('http://localhost:8082/api/expenses');
            dispatch({
                type: 'GET TRANSACTIONS',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`http://localhost:8082/api/expenses/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch(err) {
            dispatch({
                type: 'TRANSACTION ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:8082/api/expenses', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });

        } catch(err) {
            dispatch({
                type: 'TRANSACTION ERROR',
                payload: err.response.data.error
            }); 
        }

    }

    // New stuff I added
    async function deleteAllTransactions() {
        try{
        await axios.delete(`http://localhost:8082/api/expenses/`);
        dispatch({
            type: 'DELETE_ALL_TRANSACTIONS'
        })
    }catch(err) {
        dispatch({
            type: 'TRANSACTION ERROR',
            payload: err.response.data.error
        });
    }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        deleteAllTransactions
    }}>
        {children}
    </GlobalContext.Provider>);
}