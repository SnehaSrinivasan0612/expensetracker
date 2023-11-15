echo "Adding data"
curl --request POST  -H "Content-Type: application/json"  --data '{
      "UserName":"Test User",
      "UserEmail":"test@test.com",
      "PasswordHash":"5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03"
  }
  '  http://localhost:8082/api/users | lynx -stdin --dump
curl --request POST  -H "Content-Type: application/json"  --data '{
      "UserName":"Test User 2",
      "UserEmail":"test2@test2.com",
      "PasswordHash":"9391d5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03"
  }
  '  http://localhost:8082/api/users | lynx -stdin --dump
curl --request POST  -H "Content-Type: application/json"  --data '{
      "UserID": 1,
      "CategoryID": "1",
      "Amount": "20.23",
      "ExpenseDescription":"Test Expense","ExpenseDate":"2022-01-29T10:42:57.12Z",
      "CategoryName":"Test Category"
  }
  '  http://localhost:8082/api/expenses | lynx -stdin --dump
curl --request POST  -H "Content-Type: application/json"  --data '{
      "UserID": 2,
      "CategoryID": "1",
      "Amount": "40.23",
      "ExpenseDescription":"Test Expense 2","ExpenseDate":"2022-02-29T10:42:57.12Z",
      "CategoryName":"Test Category 2"
  }
  '  http://localhost:8082/api/expenses | lynx -stdin --dump
  bash ./retrieve.sh
