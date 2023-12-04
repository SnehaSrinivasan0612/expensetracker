// Login.js

import React, { useState } from 'react'; 
import { useHistory } from "react-router-dom";
function Login({ setAuth }) {
const history = useHistory();
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  
  const { username, password } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { UserName: username, Password: password };
      const response = await fetch(
        "http://localhost:8082/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.accessToken) {
        localStorage.setItem("token", parseRes.accessToken);
        setAuth(true);
        // Redirect to dashboard
        history.push("/dashboard"); 

      } else {
        setAuth(false);
        alert("Invalid Credentials");
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={e => onChange(e)}  
          placeholder="Username"
          required 
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          placeholder="Password"
          required
        />
        <br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;