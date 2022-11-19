import { Button, Select } from '@arco-design/web-react';
import {
  IconBold,
  IconDown,
  IconEraser,
  IconItalic,
  IconOrderedList,
  IconStrikethrough,
  IconUnorderedList
} from '@arco-design/web-react/icon';
import { Editor } from '@tiptap/react';
import classnames from 'classnames';
import React from 'react';
import styles from './menuItems.module.scss';

const COLOROPTIONS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'magenta',
  'black'
];

interface ExpandChatBoxProps {
  editor: Editor | null;
}

export function ExpandBoxMenuItem(props: ExpandChatBoxProps): JSX.Element {
  /**
   * 公共空间
   */
  const { editor } = props;
  const Option = Select.Option;

  if (editor == null) {
    return <></>;
  }

  //   ======================

  /**
   * 配置文件
   */
  const OPTIONS = [
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
      name: 'unsetColor',
      sign: 'unsetColor',
      level: '',
      icon: <IconEraser className={styles.icon} />,
      click: editor.chain().focus().unsetColor().run
    }
  ];

  const FONTSIZEOPTIONS = [1, 2, 3, 4, 5,6];

  return (
    <div className={styles.container}>
      <Select
        placeholder="字号"
        style={{ width: 80 }}
        size="mini"
        arrowIcon={<IconDown style={{ fontSize: '20' }} />}
        onChange={(num) => editor.chain().focus().toggleHeading({ level: num}).run()}
      >
        {FONTSIZEOPTIONS.map((option, index) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>

      <Select
        style={{ maxWidth: 100 }}
        arrowIcon={<IconDown style={{ fontSize: '20' }} />}
        defaultValue={'black'}
        size="mini"
        onChange={(color) => editor.chain().focus().setColor(color).run()}
      >
        {COLOROPTIONS.map((option, index) => (
          <Option key={option} value={option}>
            <span
              style={{ backgroundColor: option, padding: '2px 10px' }}
            ></span>
            {option}
          </Option>
        ))}
      </Select>

      {OPTIONS.map((option) => {
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
}
