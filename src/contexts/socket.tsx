/* eslint-disable react/react-in-jsx-scope */
import { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '@src/request/url';

export const socket = io(SOCKET_URL, {
  transports: ['websocket']
});

const SocketContext = createContext<Socket>(socket);
SocketContext.displayName = 'SocketContext';

export const SocketProvider = ({
  children
}: {
  children: JSX.Element;
}): JSX.Element => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};

// contexts/index.tsx
