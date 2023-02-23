interface Member {
  id: string;
  userId: string;
  serverId: string;
  joinedDate: Date;
  isOwner: boolean;
  server?: Server;
}

interface Me {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  servers: (Member & {
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
