import React from 'react';
import styles from './home.module.scss';
import { HomeHeader } from '../../component/home/homeHeader/homeHeader';
import { HomeText } from '@src/component/home/homeText/homeText';

function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <HomeHeader />
      <HomeText />
    </div>
  );
}

export default Home;
