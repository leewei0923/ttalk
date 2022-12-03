import { collect_data_entry } from '@src/database/db';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import Image from '@tiptap/extension-image';
import styles from './collectShow.module.scss';

interface CollectShowProps {
  collect: collect_data_entry | null;
}

export function CollectShow(props: CollectShowProps): JSX.Element {
  const { collect } = props;

  const [content, setContent] = useState('');
  const init = (): void => {
    if (typeof collect?.content === 'string') {
      const contentHtml = generateHTML(JSON.parse(collect?.content), [
        StarterKit,
        TextStyle,
        Color,
        Image
      ]);

      setContent(contentHtml);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div className={styles.container}>
      <section className={styles.top_container}>
        <p className={styles.name}>{collect?.origin}</p>
        <p className={styles.time}>{collect?.update_time}</p>
      </section>

      <section
        className={styles.content_box}
        dangerouslySetInnerHTML={{ __html: content }}
      ></section>
    </div>
  );
}
