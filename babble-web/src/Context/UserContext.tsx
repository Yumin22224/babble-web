/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext } from "react";
import { ReactNode, useState } from "react";

interface UserContextType {
    nickName: string;
    setNickName: (arg: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserContextProivder = ({ children }: { children: ReactNode }) => {
    const [nickName, setNickName] = useState("");

    return (
        <UserContext.Provider value={{nickName, setNickName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserContextProivder");
    }
    return context;
}