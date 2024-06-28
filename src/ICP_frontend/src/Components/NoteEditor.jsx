import React, { useEffect } from 'react';
import { useRef } from 'react';
import '@mdxeditor/editor/style.css';
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkDialogPlugin,
  linkPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink
} from '@mdxeditor/editor';


function NoteEditor({ note, setNote }) {
  const ref = useRef(null);

  const updateNoteState = () => {
    setNote(prev => ({ ...prev, content: ref.current?.getMarkdown() }));
  }

  useEffect(() => {
    ref.current?.setMarkdown(note.content)
  }, [note.content])

  return (
    <div className='editor-container'>
      <MDXEditor
        markdown={note.content}
        ref={ref}
        onChange={updateNoteState}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CreateLink />
                <CodeToggle />
              </>
            )
          })]} />
    </div>
  );
}

export default NoteEditor;