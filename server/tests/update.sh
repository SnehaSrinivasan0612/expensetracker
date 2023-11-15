curl --request PUT  -H "Content-Type: application/json"  --data '{
      "Amount": "35.23",
      "ExpenseDescription":"Test Expense 2 Modified"
  }
  '  http://localhost:8082/api/expenses/2 | lynx -stdin --dump
curl --request PUT  -H "Content-Type: application/json"  --data '{
      "UserName": "Test User 2 Modified",
      "UserEmail":"test2modified@test.com"
  }
  '  http://localhost:8082/api/users/2 | lynx -stdin --dump