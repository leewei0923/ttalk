import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MenuBar } from '../myEditorMenuBar/menuBar';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import styles from './editor.module.scss';
import './editor.scss';

function MyEditor(): JSX.Element {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true
      })
    ]
  });

  return (
    <div className={styles.container}>
      <section className={styles.editor_container}>
        <MenuBar editor={editor} />

        <div className={styles.input_box}>
          <EditorContent className="input" editor={editor} />
        </div>
      </section>
    </div>
  );
}

export default MyEditor;
