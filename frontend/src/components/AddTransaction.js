import { useState, useContext } from 'react'

import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const [amount, setAmount] = useState(0);
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const { addTransaction } = useContext(GlobalContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            //id: Math.floor(Math.random() * 100000000),
            ExpenseDescription: text,
            ExpenseDate:new Date().toISOString(),
            Amount: parseInt(amount),
            CategoryName: category
        }
        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new Expense</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
            </div>
            <div className="form-control">
                <label htmlFor="category">Category</label>
                <input type="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter category..." />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount <br />
                (negative - expense, positive - income)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
            </div>
            <button className="btn">Add Expense</button>
            </form>
        </>
    )
}
