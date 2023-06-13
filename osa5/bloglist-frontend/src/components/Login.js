import { useState } from "react";
import { login } from "../services/login";

export default function Login({ setUser, showInfo }) {
  const [username, setUserName] = useState("Author");
  const [password, setPassword] = useState("author");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      setUser(user);
      localStorage.setItem("user", user);
      setUserName("");
      setPassword("");
    } catch (error) {
      console.error(error);
      showInfo("Invalid login details.", "error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
