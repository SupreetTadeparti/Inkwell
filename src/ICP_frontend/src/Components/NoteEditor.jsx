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

const simpleSandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
    },
  ]
}

const NoteEditor = () => {
  const ref = React.useRef(null)
  return (
    <div className='editor-container'>
      <MDXEditor
        markdown={'# Hello World'}
        ref={ref}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                {/* <InsertCodeBlock /> */}
                <CreateLink />
                <DiffSourceToggleWrapper />
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                    {
                      fallback: () => (<>
                        <InsertCodeBlock />
                        {/* <InsertSandpack /> */}
                      </>)
                    }
                  ]}
                />
              </>
            )
          })]} />
      <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
    </div>
  );
}

export default NoteEditor;