import { useOutletContext } from "react-router";

const Home = () => {
  const { currentUser, serverList } = useOutletContext<OutletContext>();

  if (!currentUser) {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello {currentUser.username}</h1>
      <h1>My servers:</h1>
      {serverList.map((server: Server) => {
        return server.name;
      })}
    </div>
  );
};

export default Home;
