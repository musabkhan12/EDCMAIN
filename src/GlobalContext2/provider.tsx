import * as React from 'react';
import { useState } from 'react';
import UserContext from './context';

interface  ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [useHide, setHide] = useState(false);
  const [useFullscreen, setUseFullscreen] = useState(false);

  const toggleHide = () => setUseFullscreen(!useFullscreen);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  return (
    <UserContext.Provider value={{ useHide, setHide,useFullscreen, toggleHide, toggleFullscreen  }}>
      {children}
    </UserContext.Provider>
  );
};

export default Provider;