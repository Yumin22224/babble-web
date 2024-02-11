import { positionType } from "./Context/MyLocationContext";

export const baseUrl = "http://localhost:8080";

export const clientUrl = "http://localhost:5173";

export type ChatRoomType = {
  id: number;
  roomName: string;
  location: positionType;
  hashTag: string;
  memberCount: number;
};

export const SampleChatRoomList: ChatRoomType[] = [
  {
    id: 1,
    roomName: "301동 102호",
    location: { lat: 37.5037, lng: 127.057315 },
    hashTag: "강의실",
    memberCount: 3,
  },
  {
    id: 2,
    roomName: "학생회관",
    location: { lat: 37.504, lng: 127.0585 },
    hashTag: "식당",
    memberCount: 10,
  },
  {
    id: 3,
    roomName: "관정도서관 7층",
    location: { lat: 37.5023, lng: 127.0578 },
    hashTag: "도서관",
    memberCount: 30,
  },
];
