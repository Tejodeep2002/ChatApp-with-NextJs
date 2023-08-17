// User Slice
interface User {
  id: string;
  name: string;
  email: string;
  pic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//Message
interface Message {
  id: string;
  sender: User;
  content: string;
  chat: {
    id: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Chat
interface Chat {
  id: string;
  chatName: string;
  description?:string,
  groupImage?:string,
  isGroupChat: boolean;
  users: User[];
  latestMessage?: Message | null;
  groupAdmin?: User | null;
  createdAt: Date;
  updatedAt: Date;
}

// apiChatSlice

interface CreateGroup {
  name: string;
  description: string;
  groupImage: string;
  users: string[];
}

interface UpdateGroup extends CreateGroup {
  chatId: string;
  groupAdmin: string;
}

interface UpdateUser {
  chatId: string;
  userId: string;
}
