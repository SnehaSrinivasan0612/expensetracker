echo "Retrieving all data"
curl http://localhost:8082/api/categories | jq
curl http://localhost:8082/api/users | jq
curl http://localhost:8082/api/expenses | jq