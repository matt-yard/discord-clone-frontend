import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { getMe } from "./api/auth";

function Root() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [serverList, setServerList] = useState<Server[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const userInfo = await getMe();
      if (userInfo.ok && userInfo.user) {
        const newServerList: Server[] = [];
        userInfo?.user?.servers?.forEach((ele: any) => {
          newServerList.push(ele.server);
          setServerList(newServerList);
          delete userInfo?.user?.servers;
        });

        setCurrentUser({ ...userInfo.user });
      }
    })();
  }, []);

  return (
    <div className="App">
      {/* {!currentUser && <TopNav />} */}
      <Outlet
        context={{
          currentUser,
          setCurrentUser,
          serverList,
          setServerList,
        }}
      />
    </div>
  );
}

export default Root;
