import { useState } from "react";
import "../styles/NewServerForm.css";
import { createNewServer } from "../api/server";
import { useNavigate, useOutletContext } from "react-router";

interface NewServerFormProps {
  createServer: Boolean;
  setCreateServer: React.Dispatch<React.SetStateAction<Boolean>>;
}

const NewServerForm = ({
  createServer,
  setCreateServer,
}: NewServerFormProps) => {
  const [serverName, setServerName] = useState<string>("");
  const [serverImage, setServerImage] = useState<string>("");

  const { setServerList, serverList } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  function toggleCreateServer(e: any) {
    if (e.target.id === "new-server-overlay") {
      setCreateServer(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await createNewServer(serverName, serverImage);
    if (response.ok) {
      if (response.server) {
        setServerList([...serverList, response.server]);
        setCreateServer(false);
        navigate(`/${response.server.id}`);
      }
    }
  }

  return (
    <div id="new-server-overlay" onClick={toggleCreateServer}>
      <form id="new-server-form" onSubmit={handleSubmit}>
        <h1>New Server</h1>
        <div className="form-element">
          <label htmlFor="serverName">Server Name:</label>
          <input
            type="text"
            name="serverName"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          ></input>
        </div>
        <div className="form-element">
          <label htmlFor="serverImage">Server Image URL:</label>
          <input
            type="text"
            name="serverImage"
            value={serverImage}
            onChange={(e) => setServerImage(e.target.value)}
          ></input>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewServerForm;
