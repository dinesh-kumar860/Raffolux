import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

const InternetContext = createContext({ isConnected: true });

export const InternetProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo?.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <InternetContext.Provider value={{ isConnected }}>
      {children}
    </InternetContext.Provider>
  );
};

export const useInternet = () => {
  return useContext(InternetContext);
};
