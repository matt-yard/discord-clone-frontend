import { useState } from "react";
import { createNewChannel } from "../api/channel";

interface NewChannelFormProps {
  createChannel: Boolean;
  setCreateChannel: React.Dispatch<React.SetStateAction<Boolean>>;
  currentServerId: string | undefined;
  selectedServer: Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<Server | null>>;
}

// For now, the when submitted, the channel form sends an HTTP POST request
// to create the channel

// This will be rewritten to use websockets, so that other server members can
// see the channel created in real time

const NewChannelForm = ({
  createChannel,
  setCreateChannel,
  currentServerId,
  selectedServer,
  setSelectedServer,
}: NewChannelFormProps) => {
  const [channelName, setChannelName] = useState<string>("");
  const [channelType, setChannelType] = useState<string>("text");

  function toggleCreateChannel(e: any) {
    if (e.target.id === "new-server-overlay") {
      setCreateChannel(false);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (currentServerId) {
      const response = await createNewChannel(
        currentServerId,
        channelName,
        channelType
      );
      if (response.ok) {
        if (response.channel && selectedServer) {
          const newServerInfo = structuredClone(selectedServer);
          if (newServerInfo.channels) {
            const newChannelList = [
              ...newServerInfo.channels,
              response.channel,
            ];
            newServerInfo.channels = newChannelList;

            setCreateChannel(false);
            setSelectedServer(newServerInfo);
          }
        }
      }
    }
  }

  return (
    <div id="new-server-overlay" onClick={toggleCreateChannel}>
      <form id="new-server-form" onSubmit={handleSubmit}>
        <h1>New Channel</h1>
        <div className="form-element">
          <label htmlFor="serverName">Channel Name:</label>
          <input
            type="text"
            name="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          ></input>
        </div>
        <div className="form-element">
          <label htmlFor="channelType">Channel Type:</label>
          <select
            value={channelType}
            onChange={(e) => setChannelType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="voice">Voice</option>
          </select>
        </div>

        <button type="submit" className="hover-pointer">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewChannelForm;
