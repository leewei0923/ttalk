import React from 'react';
import styles from './application.module.scss';

function Application(): JSX.Element {
  return (
    <div className={styles.container}>
      <iframe
        src="https://qwerty.kaiyi.cool/"
        style={{ width: 'calc(100% - 10px)', height: 'calc(100% - 10px)' }}
      ></iframe>
    </div>
  );
}

export default Application;
