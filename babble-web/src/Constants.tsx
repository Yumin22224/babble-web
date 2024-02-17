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
  {
    id: 4,
    roomName: "83동 201호",
    location: { lat: 37.5042, lng: 127.0389 },
    hashTag: "강의실",
    memberCount: 5,
  },
  {
    id: 5,
    roomName: "자하연 식당",
    location: { lat: 37.5045, lng: 127.0385 },
    hashTag: "학생 식당",
    memberCount: 15,
  },
  {
    id: 6,
    roomName: "BBQ 치킨",
    location: { lat: 37.5048, lng: 127.039 },
    hashTag: "식당",
    memberCount: 8,
  },
  {
    id: 7,
    roomName: "신양공학학술정보관 2층",
    location: { lat: 37.5041, lng: 127.0387 },
    hashTag: "도서관",
    memberCount: 20,
  },
  {
    id: 8,
    roomName: "와플스튜디오",
    location: { lat: 37.5039, lng: 127.0392 },
    hashTag: "동아리방",
    memberCount: 12,
  },
  {
    id: 9,
    roomName: "컴퓨터공학부 아랫과방",
    location: { lat: 37.5035, lng: 127.0388 },
    hashTag: "과방",
    memberCount: 7,
  },
  {
    id: 10,
    roomName: "관정 파스쿠찌",
    location: { lat: 37.5037, lng: 127.0394 },
    hashTag: "카페",
    memberCount: 9,
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
