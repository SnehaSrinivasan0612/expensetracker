echo "Deleting some rows"
curl --request DELETE http://localhost:8082/api/expenses/1 | lynx -stdin --dump
curl --request DELETE http://localhost:8082/api/users/2 | lynx -stdin --dump