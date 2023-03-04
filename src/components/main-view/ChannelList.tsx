import NewChannelForm from "../forms/NewChannelForm";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import TagIcon from "@mui/icons-material/Tag";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

interface ChannelListProps {
  selectedServer: Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<Server | null>>;
}

const ChannelList = ({
  selectedServer,
  setSelectedServer,
}: ChannelListProps) => {
  const [newChannel, setNewChannel] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  return (
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
  );
};

export default ChannelList;
