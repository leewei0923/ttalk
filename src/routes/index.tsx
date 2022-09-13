/* eslint-disable react/react-in-jsx-scope */
import AddressBook from '../pages/addressBook/addressBook';
import ChatPageFragment from '@src/pages/chatPageFragment/chatPageFragment';
import { RouteObject } from 'react-router-dom';
import Home from '@src/pages/home/Home';
import LoginPage from '@src/pages/login/loginPage';

export const Routes: RouteObject[] = [
  {
    path: 'home',
    element: <Home />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: '/message',
    element: <ChatPageFragment />
  },
  {
    path: '/addressBook',
    element: <AddressBook />
  },
  {
    path: '/app',
    element: ''
  },
  {
    path: '/mine',
    element: ''
  },
  {
    path: '/collect',
    element: ''
  }
];
