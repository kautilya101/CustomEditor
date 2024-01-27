import React, { useState, useRef } from 'react';
import {Editor, getDefaultKeyBinding ,EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

const EditorWindow = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isHeader,setIsHeader] = useState(false)

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  }
  
  const handleKeyCommand = (command,state) => {
    if(command === 'header-one'){
      console.log(RichUtils.getCurrentBlockType(editorState));
      setEditorState(RichUtils.toggleInlineStyle(editorState,'BOLD'));
      return 'handled';
    }
    return 'not-handled'
  }

  const keyBinder = (e) => {
    console.log(e.key,e.code,isHeader);
    if(e.key === '#' ){
      setIsHeader(true)
    }
    if(isHeader && e.code === 'Space'){
      setIsHeader(false);
      return 'header-one'
    }
    return getDefaultKeyBinding(e);
  }

  const handleBeforeInput = (chars,editorState) =>{
    // console.log(chars);
  }

  return (
    <div className=' border-2 border-gray-300 rounded-sm min-h-96 mt-10 mx-4 cursor-text p-2 focus-within:border-gray-400 text-gray-700 text-lg' onClick={focusEditor}>
      {/* <Button type='button' value='Bold' data-style='BOLD' onMouseDown={(e) => handleBold(e)}> */}
      <Editor
        ref={editor}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        keyBindingFn={keyBinder}
        onChange={(newEditor) => setEditorState(newEditor)}
        placeholder='try # + space'
      />
    </div>
  );
}

export default EditorWindow;
