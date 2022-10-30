import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@arco-design/web-react';
import {
  IconBold,
  IconCode,
  IconCodeBlock,
  IconH1,
  IconH2,
  IconH3,
  IconItalic,
  IconNav,
  IconOrderedList,
  IconPlusCircle,
  IconQuote,
  IconRedo,
  IconStrikethrough,
  IconUndo,
  IconUnorderedList
} from '@arco-design/web-react/icon';
import styles from './menu.module.scss';
import classnames from 'classnames';

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar = (props: MenuBarProps): JSX.Element => {
  /**
   *
   * 公共区域
   */
  const { editor } = props;
  if (editor == null) {
    return <></>;
  }

  const options = [
    {
      name: 'bold',
      sign: 'bold',
      level: '',
      icon: <IconBold className={styles.icon} />,
      click: editor.chain().focus().toggleBold().run
    },
    {
      name: 'italic',
      sign: 'italic',
      level: '',
      icon: <IconItalic className={styles.icon} />,
      click: editor.chain().focus().toggleItalic().run
    },
    {
      name: 'strike',
      sign: 'strike',
      level: '',
      icon: <IconStrikethrough className={styles.icon} />,
      click: editor.chain().focus().toggleStrike().run
    },
    {
      name: 'code',
      sign: 'code',
      level: '',
      icon: <IconCode className={styles.icon} />,
      click: editor.chain().focus().toggleCode().run
    },
    {
      name: 'h1',
      sign: 'heading',
      level: { level: 1 },
      icon: <IconH1 className={styles.icon} />,
      click: editor.chain().focus().toggleHeading({ level: 1 }).run
    },
    {
      name: 'h2',
      sign: 'heading',
      level: { level: 2 },
      icon: <IconH2 className={styles.icon} />,
      click: editor.chain().focus().toggleHeading({ level: 2 }).run
    },
    {
      name: 'h3',
      sign: 'heading',
      level: { level: 3 },
      icon: <IconH3 className={styles.icon} />,
      click: editor.chain().focus().toggleHeading({ level: 3 }).run
    },
    {
      name: 'unorderedList',
      sign: 'bulletList',
      level: '',
      icon: <IconUnorderedList className={styles.icon} />,
      click: editor.chain().focus().toggleBulletList().run
    },
    {
      name: 'orderedList',
      sign: 'orderedList',
      level: '',
      icon: <IconOrderedList className={styles.icon} />,
      click: editor.chain().focus().toggleOrderedList().run
    },
    {
      name: 'taskList',
      sign: 'taskList',
      level: '',
      icon: <IconNav className={styles.icon} />,
      click: editor.chain().focus().toggleTaskList().run
    },
    {
      name: 'taskItem',
      sign: 'taskItem',
      level: '',
      icon: <IconPlusCircle className={styles.icon} />,
      click: editor.chain().focus().splitListItem('taskItem').run
    },
    {
      name: 'codeBlock',
      sign: 'codeBlock',
      level: '',
      icon: <IconCodeBlock className={styles.icon} />,
      click: editor.chain().focus().toggleCodeBlock().run
    },
    {
      name: 'quote',
      sign: 'blockquote',
      level: '',
      icon: <IconQuote className={styles.icon} />,
      click: editor.chain().focus().toggleBlockquote().run
    },
    {
      name: 'undo',
      sign: 'undo',
      level: '',
      icon: <IconUndo className={styles.icon} />,
      click: editor.chain().focus().undo().run
    },
    {
      name: 'redo',
      sign: 'redo',
      level: '',
      icon: <IconRedo className={styles.icon} />,
      click: editor.chain().focus().redo().run
    }
  ];

  return (
    <div className={styles.container}>
      {options.map((option) => {
        const btn = classnames({
          [styles.btn]: true,
          [styles.selected_btn]: editor.isActive(
            option.sign === 'heading'
              ? (option.sign, option.level)
              : option.sign
          )
        });
        return (
          <Button
            key={`option_${option.name}`}
            type="primary"
            icon={option.icon}
            className={btn}
            size="mini"
            onClick={() => option.click()}
          />
        );
      })}
    </div>
  );
};
