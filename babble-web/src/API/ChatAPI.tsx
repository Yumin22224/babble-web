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
    return res.data.rooms;
  } catch (err) {
    console.log(err);
    return { rooms: [] };
  }
}

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
    return res.status === 200;
  } catch (err) {
    console.log(err);
    return false;
  }
}

//특정 채팅방에 입장하며 본인의 참여 여부와 최근 채팅들을 조회한다.
export async function getRecentChat( roomId:number, latitude:number, longitude:number) {
    try {
        const urlWithQuery = baseUrl + `/api/chat/rooms/${roomId}?latitude=${latitude}&longitude=${longitude}`;
        const res = await axios.get(urlWithQuery, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return { chats: [] };
}
}

//본인이 참여 중인 채팅방에서 채팅을 생성한다.
export async function sendChat(s: string, roomId:number) {
    try {
        const url = baseUrl + `/api/chat/rooms/${roomId}/chats`;
        const res = await axios.post(url, s, {
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