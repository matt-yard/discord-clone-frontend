import { useState } from "react";
import { getMe, loginUser } from "../../api/auth";
import { useNavigate, useOutletContext } from "react-router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setCurrentUser, setServerList } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const userInfo: ApiResponse = await loginUser(email, password);
    if (!userInfo.ok) {
      if (userInfo.error) {
        setErrorMessage(userInfo.error.message);
      }
    } else {
      const newServerList: Server[] = [];
      userInfo?.user?.servers?.forEach((ele: any) => {
        newServerList.push(ele.server);
        setServerList(newServerList);
        delete userInfo?.user?.servers;
      });

      setCurrentUser({ ...(userInfo.user as Me) });
      if (newServerList.length) {
        navigate(`/${newServerList[0].id}`);
      } else {
        navigate("/");
      }
    }
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
    </div>
  );
};

export default Login;
