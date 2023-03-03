import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getChannelMessages } from "../api/server";
import SendIcon from "@mui/icons-material/Send";
import TagIcon from "@mui/icons-material/Tag";
import "../styles/Home.css";
import "../styles/MessageView.css";

const MessageView = () => {
  const { channelId } = useParams();
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  console.log("current channel: ", currentChannel);
  useEffect(() => {
    (async () => {
      if (channelId) {
        const response = await getChannelMessages(channelId);

        if (response?.ok) {
          if (response.channel) {
            setCurrentChannel(response.channel);
          }
        }
      }
    })();
  }, [channelId]);

  return (
    <div className="flex-column message-view">
      <div>
        <div className="welcome-to-channel icon-container">
          <TagIcon fontSize="inherit" />
        </div>
        <h1>Welcome to #{currentChannel?.name}!</h1>
        <p>This is the start of the {currentChannel?.name} channel.</p>
      </div>

      <div className="message-container">
        {currentChannel?.messages?.map((message) => {
          return (
            <div className="message-tile" key={message.id}>
              <div className="flex-row centered">
                <img
                  src={message.author.profileImage}
                  className="profile-img-medium"
                />
                <div className="flex-column message-content">
                  <p>
                    <strong>{message.author.username}</strong>
                    <span className="date-time">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </p>

                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form id="message-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="message-input"
          placeholder={`Message #${currentChannel?.name}`}
        ></input>
        <button type="submit" id="send-message">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default MessageView;
