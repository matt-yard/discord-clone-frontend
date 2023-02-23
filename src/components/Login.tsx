import { useState } from "react";
import { getMe, loginUser } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const userInfo: ApiResponse = await loginUser(email, password);

    if (!userInfo.ok) {
      if (userInfo.error) {
        setErrorMessage(userInfo.error.message);
      }
    }

    console.log(userInfo);
  }

  async function handleGetMe(): Promise<void> {
    const result: ApiResponse = await getMe();
    console.log(result);
  }

  return (
    <div>
      <h1>Login</h1>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGetMe}>Get ME</button>
    </div>
  );
};

export default Login;
