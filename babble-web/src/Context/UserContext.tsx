/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";
import { ReactNode, useState } from "react";

export type ColorType = {
  r: number;
  g: number;
  b: number;
};

interface UserContextType {
  nickName: string;
  setNickName: (arg: string) => void;
  color: ColorType;
  setColor: (arg: ColorType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProivder = ({ children }: { children: ReactNode }) => {
  const [nickName, setNickName] = useState("");
  const [color, setColor] = useState({ r: 12, g: 46, b: 242 });

  return (
    <UserContext.Provider value={{ nickName, setNickName, color, setColor }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProivder");
  }
  return context;
};
