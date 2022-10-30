import React from 'react';
import { useParams } from 'react-router-dom';
import { LoginMobile } from '../loginMobile/loginMobile';
import { RegisterMobile } from '../registerMobile/registerMobile';

export function LoginBoxMobile(): JSX.Element {
  const { nav } = useParams();

  return <div>{nav === 'in' ? <LoginMobile /> : <RegisterMobile />}</div>;
}
