import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getServerById } from "../api/server";
import MessageView from "./MessageView";
import TagIcon from "@mui/icons-material/Tag";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const ViewServer = () => {
  const { serverId, channelId } = useParams();
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  useEffect(() => {
    (async () => {
      if (serverId) {
        const response = await getServerById(serverId);

        if (response?.ok) {
          if (response.server) {
            setSelectedServer(response.server);
          }
        }
      }
    })();
  }, [serverId]);

  return (
    <div className="flex-row">
      <div className="flex-column" id="channel-list">
        <div id="server-name">{selectedServer?.name}</div>
        <div className="flex-row hover-pointer channel-name-container">
          <DashboardIcon />
          <span className="channel-name">Dashboard</span>
        </div>
        <p>Text Channels</p>
        {selectedServer?.channels?.map((channel) => {
          return (
            <Link to={`/${serverId}/${channel.id}`} key={channel.id}>
              <div
                className={`flex-row hover-pointer channel-name-container ${
                  channel.id === channelId ? "selected" : ""
                }`}
                key={channel.id}
              >
                <TagIcon />

                <span className="channel-name">{channel.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {channelId ? <MessageView /> : <div>Dashboard</div>}
    </div>
  );
};

export default ViewServer;
