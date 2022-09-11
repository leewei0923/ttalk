import React from 'react';
import classnames from 'classnames';
import styles from './chatCard.module.scss';

interface ChatCardPropsType {
  src: string;
  content: string;
  time: string;
  isReverse?: boolean;
}

interface ContentType {
  type: 'text' | 'img';
  value: string;
}

export function ChatCard(props: ChatCardPropsType): JSX.Element {
  const { src, content, time, isReverse } = props;
  const dataList = JSON.parse(content);
  const timeFormat = time.split(' ')[1];

  const defaultClass = {
    container: classnames({
      [styles.container]: true,
      [styles.recontainer]: isReverse === true
    }),
    innerContainer: classnames({
      [styles.innerContainer]: true,
      [styles.reverse]: isReverse === true
    })
  };

  return (
    <div className={defaultClass.container}>
      <div className={defaultClass.innerContainer}>
        <img src={src} className={styles.chat_avatar_img} />
        <div className={styles.chat_content_box}>
          {dataList.map((item: ContentType, index: number): JSX.Element => {
            switch (item.type) {
              case 'text':
                return (
                  <p
                    key={`cardtext${index}`}
                    className={styles.chat_content_text}
                  >
                    {item.value}
                  </p>
                );
              case 'img':
                return (
                  <img
                    key={`cardimg${index}`}
                    src={item.value}
                    className={styles.chat_img}
                  />
                );
              default:
                return (
                  <p
                    key={`no${index}`}
                    className={styles.chat_content_text}
                  ></p>
                );
            }
          })}
        </div>

        <div className={styles.time}>{timeFormat}</div>
      </div>
    </div>
  );
}
