import { useState } from "react";
import { login } from "../services/login";
import { setToken } from "../services/blogs";

export default function Login({ setUser, notification }) {
  const [username, setUserName] = useState("Author");
  const [password, setPassword] = useState("author");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      setToken(user.token);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setUserName("");
      setPassword("");
    } catch {
      notification("Invalid login details.", "error");
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
