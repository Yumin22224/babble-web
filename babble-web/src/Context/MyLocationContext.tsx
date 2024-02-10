//사용자의 현재 위치를 저장하고 업데이트하는 Context

import { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

export type positionType = {
  latitude: number;
  longitude: number;
};

interface MyLocationContextType {
  curLocation: positionType;
  setCurLocation: (arg: positionType) => void;
  updateCurLocation: (arg: GeolocationPosition) => positionType;
}

export const MyLocationContext = createContext<
  MyLocationContextType | undefined
>(undefined);

export const MyLocationProvider = ({ children }: { children: ReactNode }) => {
  const [curLocation, setCurLocation] = useState<positionType>({
    latitude: 0,
    longitude: 0,
  });
  const updateCurLocation = (p: GeolocationPosition) => {
    const positionObj: positionType = {
      latitude: p.coords.latitude,
      longitude: p.coords.longitude,
    };
    setCurLocation(positionObj);
    return positionObj;
  };

  return (
    <MyLocationContext.Provider
      value={{ curLocation, setCurLocation, updateCurLocation }}
    >
      {children}
    </MyLocationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMyLocationContext = () => {
  const context = useContext(MyLocationContext);
  if (context === undefined) {
    throw new Error(
      "useMyLocationContext must be used within a MyLocationProvider"
    );
  }
  return context;
};
