import React from 'react';
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
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  InsertCodeBlock,
  CreateLink,
  DiffSourceToggleWrapper,
  SandpackConfig,
  ConditionalContents
} from '@mdxeditor/editor';


function NoteEditor({ note, setNote }) {
  const ref = useRef(null);

  const updateNoteState = () => {
    setNote(prevState => ({
      ...prevState, 
      content: ref.current?.getMarkdown()})
    );
    console.log(note);
  }

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
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <DiffSourceToggleWrapper />
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    {
                      fallback: () => (<>
                        <InsertCodeBlock />
                      </>)
                    }
                  ]}
                />
              </>
            )
          })]} />
    </div>
  );
}

export default NoteEditor;