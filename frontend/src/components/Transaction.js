import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({transaction}) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.Amount < 0 ? '-' : '+';

    return (
        <li className={transaction.Amount < 0 ? 'minus' : 'plus'}>
            {transaction.ExpenseDescription} <span>{sign}${numberWithCommas(Math.abs(transaction.Amount))}</span><li>{transaction.CategoryName}</li> 
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}
