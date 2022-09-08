import React from 'react';
import styles from './home.module.scss';
import { HomeIntro } from '@src/component/home/homeIntro/homeIntro';
import { HomeHeader } from '../../component/home/homeHeader/homeHeader';

function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <HomeHeader />
      <HomeIntro />
    </div>
  );
}

export default Home;
