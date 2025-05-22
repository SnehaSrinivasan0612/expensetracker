import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import './App.css'

import { GlobalProvider } from './context/GlobalState';
import { DeleteAll } from './components/DeleteAll';

function Dashboard() {
  return (
    <GlobalProvider>
      <div data-testid="header">
        <Header />
      </div>
      <div className="container">
        <div data-testid="balance">
          <Balance />
        </div>
        <div data-testid="income-expenses">
          <IncomeExpenses />
        </div>
        <div data-testid="transaction-list">
          <TransactionList />
        </div>
        <div data-testid="add-transaction">
          <AddTransaction />
        </div>
        <div data-testid="delete-all">
          <DeleteAll />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default Dashboard;