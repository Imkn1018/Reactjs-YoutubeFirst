import React from 'react';
import { Header } from '../Header/Header';
import Style from "./Layout.module.scss"
export const Layout = (props) => {
  const { children } = props;
  return (
    <div className={Style.wrapper}>
      <Header></Header>
      <div className={Style.wrapper}>
      {children}
      </div>
      
    </div>
  );
};
