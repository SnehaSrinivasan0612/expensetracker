echo "Adding data"
curl --request POST  -H "Content-Type: application/json"  --data '{
        "UserName":"Test User",
        "UserEmail":"test@test.com",
        "Password":"12345678"
    }
    '  http://localhost:8082/api/auth/signup | lynx -stdin --dump
curl --request POST  -H "Content-Type: application/json"  --data '{
        "UserName":"Test User 2",
      "UserEmail":"test2@test2.com",
        "Password":"34345678"
    }
    '  http://localhost:8082/api/auth/signup | lynx -stdin --dump

signin=$(curl --request POST  -H "Content-Type: application/json"  --data '{
        "UserName":"Test User",
        "Password":"12345678"
    }
    '  http://localhost:8082/api/auth/signin)
echo $signin
access_token="$(echo $signin | jq -r '.accessToken')"
curl --request POST  -H "authorization: $access_token" -H "Content-Type: application/json"  --data '{
      "CategoryID": "1",
      "Amount": "20.23",
      "ExpenseDescription":"Test Expense","ExpenseDate":"2022-01-29T10:42:57.12Z",
      "CategoryName":"Test Category"
  }
  '  http://localhost:8082/api/expenses | lynx -stdin --dump
curl --request POST  -H "authorization: $access_token" -H "Content-Type: application/json"  --data '{      
      "CategoryID": "1",
      "Amount": "40.23",
      "ExpenseDescription":"Test Expense 2","ExpenseDate":"2022-02-29T10:42:57.12Z",
      "CategoryName":"Test Category 2"
  }
  '  http://localhost:8082/api/expenses | lynx -stdin --dump

echo "Retrieving all data"
curl -H "authorization: $access_token" http://localhost:8082/api/expenses | jq

curl --request PUT -H "authorization: $access_token" -H "Content-Type: application/json"  --data '{
      "Amount": "35.23",
      "ExpenseDescription":"Test Expense 2 Modified"
  }
  '  http://localhost:8082/api/expenses/2 | lynx -stdin --dump

echo "Retrieving all data"
curl -H "authorization: $access_token" http://localhost:8082/api/expenses | jq

echo "Deleting some rows"
curl --request DELETE -H "authorization: $access_token"  http://localhost:8082/api/expenses/1 | lynx -stdin --dump
