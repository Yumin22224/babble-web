import { useEffect, useState } from "react";
import { ReactNode, createContext } from "react";
import { getChatRooms } from "../API/ChatAPI";
import { useMyLocationContext } from "./MyLocationContext";
import { ChatRoomType } from "../Constants";
import { useNavigate } from "react-router-dom";

export type RoomSpecType = {
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

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const fetchedChatRooms = await getChatRooms(curLocation);
        if (fetchedChatRooms.err || fetchedChatRooms === 401) {
          alert("다시 로그인 해주세요.");
          navigate(`/login`);
        } else {
          setChatRooms(fetchedChatRooms);
          console.log("fetching chat rooms success");
        }
      } catch (error) {
        console.error("Fetching chat rooms failed:", error);
      }
    }
    fetchChatRooms();
  }, []);

  return (
    <NewChatRoomContext.Provider
      value={{ roomSpec, setRoomSpec, tag, setTag, chatRooms, setChatRooms }}
    >
      {children}
    </NewChatRoomContext.Provider>
  );
};
