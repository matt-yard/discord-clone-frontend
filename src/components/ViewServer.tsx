import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getServerById } from "../api/server";
import MessageView from "./MessageView";
import TagIcon from "@mui/icons-material/Tag";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import MemberView from "./MemberView";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router";
import NewChannelForm from "./NewChannelForm";

const ViewServer = () => {
  const { serverId, channelId } = useParams();
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [newChannel, setNewChannel] = useState<Boolean>(false);
  const navigate = useNavigate();

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
    <div className="flex-row max-width">
      <div className="flex-column" id="channel-list">
        <div id="server-name">{selectedServer?.name}</div>
        <div className="flex-row hover-pointer channel-name-container">
          <DashboardIcon />
          <span
            className="channel-name"
            onClick={() => navigate(`/${selectedServer?.id}`)}
          >
            Dashboard
          </span>
        </div>
        <div className="flex-row space-between" id="text-channel-section">
          <p>Text Channels</p>
          <AddIcon
            className="hover-pointer"
            onClick={(e) => setNewChannel(!newChannel)}
          />
        </div>
        {newChannel && (
          <NewChannelForm
            createChannel={newChannel}
            setCreateChannel={setNewChannel}
            currentServerId={selectedServer?.id}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
          />
        )}
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

      {channelId ? <MessageView /> : <Dashboard />}
      {selectedServer?.members ? (
        <MemberView memberList={selectedServer.members} />
      ) : (
        <div>members</div>
      )}
    </div>
  );
};

export default ViewServer;
