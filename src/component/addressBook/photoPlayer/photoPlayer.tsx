import React, { useState } from 'react';
import styles from './photoPlayer.module.scss';

interface PhotoPlayerPropsType {
  src: string[]; // 图片地址
  autoPlay?: false | undefined; // 是否自动播放
}

export function PhotoPlayer(props: PhotoPlayerPropsType): JSX.Element {
  const { src } = props;

  const option = {
    count: src.length
  };

  const circelBox = new Array(option.count).fill(0);


  /**
   * 
   * @param i  点击小点选中的序号
   */
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const onSwitchPhoto = function (i:number):void {
    setCurrentImgIndex(i);
  }

  return (
    <div className={styles.container}>
      <section className={styles.photo_main}>
        {src.map((img, i) => {
          return (
            <img
              key={`img${i}`}
              src={img}
              className={`${styles.photo_img} ${
                i === currentImgIndex ? styles.img_selected : ''
              }`}
            />
          );
        })}
      </section>

      <section className={styles.circel_container}>
        {circelBox.map((dot, i) => {
          return (
            <span
              className={`${styles.circel} ${
                i === currentImgIndex ? styles.dot_selected : ''
              }`}
              key={`dot${i}`}
              onClick={() => onSwitchPhoto(i)}
            ></span>
          );
        })}
      </section>
    </div>
  );
}
