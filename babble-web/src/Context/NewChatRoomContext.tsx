import { useState } from "react";
import { ReactNode, createContext } from "react";

type RoomSpecType = {
  hashTag: string;
  latitude: number;
  longitude: number;
  roomName: string;
};

interface NewChatRoomContextType {
  roomSpec: RoomSpecType;
  setRoomSpec: (arg: RoomSpecType) => void;
}

export const NewChatRoomContext = createContext<
  NewChatRoomContextType | undefined
>(undefined);

export const NewChatRoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomSpec, setRoomSpec] = useState<RoomSpecType>({
    hashTag: "",
    latitude: 0,
    longitude: 0,
    roomName: "",
  });

  return (
    <NewChatRoomContext.Provider value={{ roomSpec, setRoomSpec }}>
      {children}
    </NewChatRoomContext.Provider>
  );
};
