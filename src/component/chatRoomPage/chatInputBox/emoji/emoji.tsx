import React from 'react';
import styles from './emoji.module.scss';

interface EmojiType {
  onClick?: (emojo: string) => void;
}
function Emoji(props: EmojiType): JSX.Element {
  /**
   * 公共区域
   */
  const { onClick } = props;

  const emojis = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '🥰',
    '😗',
    '😙',
    '😚',
    '🙂',
    '🤗',
    '🤩',
    '🤔',
    '🤨',
    '😐',
    '😑',
    '😶',
    '🙄',
    '😏',
    '😣',
    '😥',
    '😮',
    '🤐',
    '😯',
    '😪',
    '😫',
    '🥱',
    '😴',
    '😌',
    '😛',
    '😜',
    '😝',
    '🤤',
    '😒',
    '😓',
    '😔',
    '😕',
    '🙃',
    '🤑',
    '😲',
    '☹',
    '🙁',
    '😖',
    '😞',
    '😟',
    '😤',
    '😢',
    '😭',
    '😦',
    '😧',
    '😨',
    '😩',
    '🤯',
    '😬',
    '😰',
    '😱',
    '🥵',
    '🥶',
    '😳',
    '🤪',
    '😵',
    '🥴',
    '😠',
    '😡',
    '🤬',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '😇',
    '🥳',
    '🥺',
    '🤠',
    '🤡',
    '🤥',
    '🤫',
    '🤭',
    '🧐',
    '🤓'
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
