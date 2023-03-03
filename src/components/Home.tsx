import { useOutletContext, useParams } from "react-router";
import TopNav from "./TopNav";
import "../styles/Home.css";
import ViewServer from "./ViewServer";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

const Home = () => {
  const { currentUser, serverList } = useOutletContext<OutletContext>();
  const { serverId } = useParams();

  if (!currentUser) {
    return (
      <div>
        <TopNav />
        <h1>Home</h1>
      </div>
    );
  }

  return (
    <div className="flex-row main-container">
      <div className="flex-column space-between">
        <div className="flex-column" id="server-list">
          {serverList.map((server: Server) => {
            return (
              <Link to={`/${server.id}`} key={server.id}>
                <img
                  src={server.serverImage}
                  className="profile-img server-img"
                />
              </Link>
            );
          })}
        </div>
        <div className="flex-column utilities">
          <SettingsIcon htmlColor="#7A78FC" />
          <img src={currentUser.profileImage} className="profile-img" />
        </div>
      </div>

      {serverId && <ViewServer />}
    </div>
  );
};

export default Home;
