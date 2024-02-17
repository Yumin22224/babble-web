import { positionType } from "./Context/MyLocationContext";
import { ChatType } from "./pages/ChatRoom/Components/Chat";

export const baseUrl = "http://localhost:8080";

export const clientUrl = "http://localhost:5173";

export type ChatRoomType = {
  id: number;
  roomName: string;
  location: positionType;
  hashTag: string;
  memberCount: number;
};
// 37.50376
// 37.5032203 127.039937

export const SampleChatRoomList: ChatRoomType[] = [
  {
    id: 1,
    roomName: "301동 102호",
    location: { lat: 37.50376, lng: 127.039315 },
    hashTag: "강의실",
    memberCount: 3,
  },
  {
    id: 2,
    roomName: "학생회관",
    location: { lat: 37.5033, lng: 127.0395 },
    hashTag: "식당",
    memberCount: 10,
  },
  {
    id: 3,
    roomName: "관정도서관 7층",
    location: { lat: 37.50321, lng: 127.0398 },
    hashTag: "도서관",
    memberCount: 30,
  },
];

export const SampleChats: ChatType[] = [
  {
    id: 3,
    chatterId: 1,
    chatterNickname: "yeah",
    content:
      "hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah hi my name is yeah",
    isMine: false,
    createdTimeInSec: 1707914950,
    parent: null,
  },
  {
    id: 2,
    chatterId: 2,
    chatterNickname: "nooo",
    content: "hi my name is nooo",
    isMine: true,
    createdTimeInSec: 1707914950,
    parent: null,
  },
  {
    id: 1,
    chatterId: 1,
    chatterNickname: "yeah",
    content: "hi my name is yeah",
    isMine: false,
    createdTimeInSec: 1707913942,
    parent: null,
  },
];
