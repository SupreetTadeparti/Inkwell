import React from 'react';
import '@mdxeditor/editor/style.css';
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'

const NoteEditor = () => {
  return (
    <div className='editor-container'>
      <MDXEditor markdown={'# Hello World'} plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]} />
    </div>
  );
}

export default NoteEditor;