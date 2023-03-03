interface Member {
  id: string;
  userId: string;
  serverId: string;
  joinedDate: Date;
  isOwner: boolean;
  server?: Server;
  user?: {
    id: string;
    username: string;
    profileImage: string;
    createdAt: Date;
  };
}

interface Me {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  servers?: (Member & {
    server: Server;
  })[];
}

interface CurrentUser {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: Date;
}

interface User {
  id: string;
  username: string;
  profileImage: string;
  createdAt: Date;
}
