import axios from "axios";
import { baseUrl } from "../Constants";
import { positionType } from "../Context/MyLocationContext";

//현재 위치를 기준으로 채팅방 목록을 조회한다.
export async function getChatRooms(p: positionType) {
  try {
    const urlWithQuery = `${baseUrl}/api/chat/rooms?latitude=${p.lat}&longitude=${p.lng}`;
    const res = await axios.get(urlWithQuery, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const rooms = res.data.rooms;
    const mappedRooms = rooms.map((room) => ({
      id: room.id,
      roomName: room.name,
      location: { lat: room.latitude, lng: room.longitude },
      hashTag: room.hashTag,
      memberCount: 0,
    }));
    return mappedRooms;
  } catch (err) {
    console.log(err);
    return { rooms: [] };
  }
}

/*-----------------------------------------------------------------------------------*/

type NewChatRoomType = {
  hashTag: string;
  latitude: number;
  longitude: number;
  nickname: string;
  roomName: string;
};

//로그인한 유저의 현재 위치를 기반으로 채팅방을 생성하고, 본인이 방장이 된다.
export async function makeChatRooms(newRoom: NewChatRoomType) {
  try {
    const url = baseUrl + `/api/chat/rooms`;
    const res = await axios.post(url, newRoom, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.status === 201;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/*-----------------------------------------------------------------------------------*/

//특정 채팅방에 입장하며 본인의 참여 여부와 최근 채팅들을 조회한다.
export async function getRecentChat(
  roomId: number,
  latitude: number,
  longitude: number
) {
  try {
    const urlWithQuery =
      baseUrl +
      `/api/chat/rooms/${roomId}?latitude=${latitude}&longitude=${longitude}`;
    const res = await axios.get(urlWithQuery, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return { chats: [], isChatter: false };
  }
}

/*
	
{
  "room": {
    "latitude": 37.5037,
    "longitude": 127.057315,
    "id": 1,
    "name": "관정 파스쿠찌",
    "hashTag": "카페"
  },
  "isChatter": true,
  "chatterCount": 1,
  "chats": [
    {
      "id": 1,
      "chatterId": 1,
      "chatterNickname": "heoyumin",
      "content": "string",
      "isMine": true,
      "createdTimeInSec": 1707913942
    }
  ]
}
*/

/*-----------------------------------------------------------------------------------*/

type NewChatType = {
  content: string;
  latitude: number;
  longitude: number;
};

//본인이 참여 중인 채팅방에서 채팅을 생성한다.
export async function sendChat(newChat: NewChatType, roomId: number) {
  try {
    const url = baseUrl + `/api/chat/rooms/${roomId}/chats`;
    const res = await axios.post(url, newChat, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/*
{
  "id": 1,
  "chatterId": 1,
  "chatterNickname": "heoyumin",
  "content": "string",
  "isMine": true,
  "createdTimeInSec": 1707913942
}
*/

/*-----------------------------------------------------------------------------------*/

type GetChatType = {
  latestChatId: number;
  location: positionType;
};

//가장 최근에 조회한 채팅을 기준으로 그 이후에 생성된 모든 채팅을 조회한다.
export async function getChat(getChat: GetChatType, roomId: number) {
  try {
    const url =
      baseUrl +
      `/api/chat/rooms/${roomId}?latestChatId=${getChat.latestChatId}&latitude=${getChat.location.lat}&longitude=${getChat.location.lng}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data.chats;
  } catch (err) {
    console.log("Error getting chats", err);
    return [];
  }
}

/*
{
  "chats": [
    {
      "id": 1,
      "chatterId": 1,
      "chatterNickname": "heoyumin",
      "content": "string",
      "isMine": true,
      "createdTimeInSec": 1707913942
    }
  ]
}
*/

/*-----------------------------------------------------------------------------------*/

type UserInfoType = {
  nickname: string;
  latitude: number;
  longitude: number;
};

//채팅방에 참여한다.
export async function joinChat(userInfo: UserInfoType, roomId: number) {
  try {
    const url = baseUrl + `/api/chat/rooms/${roomId}/chatters`;
    const res = await axios.post(url, userInfo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("Error joining chat room", err);
    return { id: 0, nickname: "" };
  }
}
