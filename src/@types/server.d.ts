interface Channel {
  id: string;
  name: string;
  type: string;
  messages?: {
    id: string;
    createdAt: Date;
    author: {
      id: string;
      username: string;
      profileImage: string;
    };
    content: string;
  }[];
}

interface Server {
  id: string;
  name: string;
  channels?: Channel[];
  memberIds?: string[];
  members?: Member & {
    user: {
      id: string;
      username: string;
      profileImage: string;
      createdAt: Date;
    };
  };
  serverImage: string;
}
