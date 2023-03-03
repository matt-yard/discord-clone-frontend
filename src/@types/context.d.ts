interface OutletContext {
  currentUser: Me | null;
  serverList: Server[];
  setCurrentUser: React.Dispatch<React.SetStateAction<Me>>;
  setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
}
