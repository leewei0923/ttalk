import React, { useEffect } from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { MenuBar } from '../myEditorMenuBar/menuBar';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import styles from './editor.module.scss';
import './editor.scss';
import { collect_data_entry } from '@src/database/db';

interface MyEditorProps {
  onGetEditor: (editor: Editor | null) => void;
  collect?: collect_data_entry | null;
}

function MyEditor(props: MyEditorProps): JSX.Element {
  const { onGetEditor, collect } = props;

  let content;
  if (collect !== null && collect !== undefined) {
    content = JSON.parse(collect.content);
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true
      })
    ],
    content
  });

  const onGetEditorInstance = (): void => {
    if (typeof onGetEditor !== 'undefined') {
      onGetEditor(editor);
    }
  };
  onGetEditorInstance();

  useEffect(() => {}, []);

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
