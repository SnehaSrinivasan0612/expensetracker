// Login.js

import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  
  const { username, password } = inputs;

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
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
        navigate("/dashboard", { replace: true });
      } else {
        setAuth(false);
        setError(parseRes.error || "Invalid Credentials");
      }

    } catch (err) {
      console.error(err.message);
      setError(err.message || "Network error");
      setAuth(false);
    }
  };

  return (
    <div>
      <h1>Expense Tracker Login</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={onChange}  
          placeholder="Username"
          required 
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        {error && <div data-testid="error-message" className="error">{error}</div>}
        <br/>
        <input className="btn" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;