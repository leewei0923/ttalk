import { SocketProvider } from './socket';

const SocketContextProviders = ({
  children
}: {
  children: JSX.Element;
  // eslint-disable-next-line react/react-in-jsx-scope
}): JSX.Element => <SocketProvider>{children}</SocketProvider>;

export default SocketContextProviders;
