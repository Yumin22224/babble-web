import { useEffect, useState } from "react";
import { ReactNode, createContext } from "react";
import { getChatRooms } from "../API/ChatAPI";
import { useMyLocationContext } from "./MyLocationContext";
import { ChatRoomType } from "../Constants";

type RoomSpecType = {
  hashTag: string;
  latitude: number;
  longitude: number;
  roomName: string;
};

interface NewChatRoomContextType {
  roomSpec: RoomSpecType;
  setRoomSpec: (arg: RoomSpecType) => void;
  tag: string;
  setTag: (arg: string) => void;
  chatRooms: ChatRoomType[];
  setChatRooms: (arg: ChatRoomType[]) => void;
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
  const [tag, setTag] = useState("");

  const { curLocation } = useMyLocationContext();

  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);

   useEffect(() => {
     async function fetchChatRooms() {
       try {
         const fetchedChatRooms = await getChatRooms(curLocation);
         const transformedChatRooms = fetchedChatRooms.map((room) => ({
           id: room.id,
           roomName: room.name,
           location: {
             lat: room.latitude,
             lng: room.longitude,
           },
           hashTag: room.hashTag,
           memberCount: 0, // 멤버 카운트는 무시하고 기본값으로 설정
         }));
         setChatRooms(transformedChatRooms);
         console.log("fetching chat rooms success");
       } catch (error) {
         console.error("Fetching chat rooms failed:", error);
       }
     }
     fetchChatRooms();
   }, []);

  return (
    <NewChatRoomContext.Provider value={{ roomSpec, setRoomSpec, tag, setTag, chatRooms, setChatRooms }}>
      {children}
    </NewChatRoomContext.Provider>
  );
};
