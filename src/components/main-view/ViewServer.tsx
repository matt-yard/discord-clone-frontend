import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getServerById } from "../../api/server";
import MessageList from "./MessageList";
import MemberList from "./MemberList";
import Dashboard from "./Dashboard";
import ChannelList from "./ChannelList";

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
    <>
      <ChannelList
        selectedServer={selectedServer}
        setSelectedServer={setSelectedServer}
      />
      {channelId ? <MessageList /> : <Dashboard />}
      {selectedServer?.members && (
        <MemberList memberList={selectedServer.members} />
      )}
    </>
  );
};

export default ViewServer;
