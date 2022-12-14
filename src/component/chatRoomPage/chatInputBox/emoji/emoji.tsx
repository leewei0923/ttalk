import React from 'react';
import styles from './emoji.module.scss';

interface EmojiType {
  onClick?: (emojo: string) => void;
}
function Emoji(props: EmojiType): JSX.Element {
  /**
   * ๅฌๅฑๅบๅ
   */
  const { onClick } = props;

  const emojis = [
    '๐',
    '๐',
    '๐',
    '๐คฃ',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐ฅฐ',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐ค',
    '๐คฉ',
    '๐ค',
    '๐คจ',
    '๐',
    '๐',
    '๐ถ',
    '๐',
    '๐',
    '๐ฃ',
    '๐ฅ',
    '๐ฎ',
    '๐ค',
    '๐ฏ',
    '๐ช',
    '๐ซ',
    '๐ฅฑ',
    '๐ด',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐คค',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐ค',
    '๐ฒ',
    'โน',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐ค',
    '๐ข',
    '๐ญ',
    '๐ฆ',
    '๐ง',
    '๐จ',
    '๐ฉ',
    '๐คฏ',
    '๐ฌ',
    '๐ฐ',
    '๐ฑ',
    '๐ฅต',
    '๐ฅถ',
    '๐ณ',
    '๐คช',
    '๐ต',
    '๐ฅด',
    '๐ ',
    '๐ก',
    '๐คฌ',
    '๐ท',
    '๐ค',
    '๐ค',
    '๐คข',
    '๐คฎ',
    '๐คง',
    '๐',
    '๐ฅณ',
    '๐ฅบ',
    '๐ค ',
    '๐คก',
    '๐คฅ',
    '๐คซ',
    '๐คญ',
    '๐ง',
    '๐ค'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {emojis.map((item, index) => {
          return (
            <span
              onClick={() =>
                typeof onClick === 'function' ? onClick(item) : ''
              }
              key={`emoji${index}`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Emoji);
