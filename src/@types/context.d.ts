interface OutletContext {
  currentUser: CurrentUser | null;
  serverList: Server[];
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  setServerList: React.Dispatch<React.SetStateAction<Server[]>>;
}
