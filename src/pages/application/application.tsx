import MyEditor from '@src/component/NotePage/Editor/editor';
import React from 'react';
import styles from './application.module.scss';

function Application(): JSX.Element {
  return (
    <div className={styles.container}>
      <MyEditor />
    </div>
  );
}

export default Application;
