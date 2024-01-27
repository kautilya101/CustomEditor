import React, { useState, useRef, useEffect } from 'react';
import {Editor, getDefaultKeyBinding,Modifier,EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { colorStyleMap } from '../utils'

const EditorWindow = ({savehandler,localData}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorText,setEditorText] = useState('');
  const styles = ['BOLD','UNDERLINE','red'];

  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  }



  const removeStyling = (state) => {
    const selection = state.getSelection();
    const currentInlineStyle = state.getCurrentInlineStyle();
    const contentWithoutStyles = currentInlineStyle.reduce((content, style) => {
      return RichUtils.toggleInlineStyle(content, selection, style);
    }, state.getCurrentContent());

    // Update the editor state with the modified content
    const newEditorState = EditorState.push(state, contentWithoutStyles, 'change-inline-style');
    
    // console.log(newEditorState.getCurrentInlineStyle());
    return newEditorState;

  }
  
  const handleKeyCommand = (command,state) => {

    const selection = state.getSelection();

    if(command === 'bold'){
      const filteredContent = Modifier.replaceText(
        state.getCurrentContent(),
        selection.merge({
          anchorOffset: selection.getAnchorOffset() - 1,
          focusOffset: selection.getAnchorOffset(),
        }),
        ''
      );
      const newState = EditorState.push(editorState,filteredContent,'insert-characters');
      setEditorState(RichUtils.toggleInlineStyle(newState,'BOLD'));
      return 'handled';
    }

    if(command === 'redline'){
      const filteredContent = Modifier.replaceText(
        state.getCurrentContent(),
        selection.merge({
          anchorOffset: selection.getAnchorOffset() - 2,
          focusOffset: selection.getAnchorOffset(),
        }),
        ''
      );
      const newState = EditorState.push(editorState,filteredContent,'insert-characters');
      setEditorState(RichUtils.toggleInlineStyle(newState,'red'));
      return 'handled';
    }

    if(command === 'underline'){
      const filteredContent = Modifier.replaceText(
        state.getCurrentContent(),
        selection.merge({
          anchorOffset: selection.getAnchorOffset() - 3,
          focusOffset: selection.getAnchorOffset(),
        }),
        ''
      );
      const newState = EditorState.push(editorState,filteredContent,'insert-characters');
      setEditorState(RichUtils.toggleInlineStyle(newState,'UNDERLINE'));
      
      return 'handled';
    }

    if(command === 'heading'){
      const filteredContent = Modifier.replaceText(
        state.getCurrentContent(),
        selection.merge({
          anchorOffset: selection.getAnchorOffset() - 1,
          focusOffset: selection.getAnchorOffset(),
        }),
        ''
      );
      const newState = EditorState.push(editorState,filteredContent,'insert-characters');
      console.log(RichUtils.getCurrentBlockType(newState)); 
      setEditorState(RichUtils.toggleInlineStyle(newState,'heading1'));
      return 'handled';
    }
    
    return 'not-handled';
  }

  const keyBinding = (e) => {
    
    if (e.code === 'Space' && editorText.trim() === '*') { //Cmd+1
      console.log('inside');
      return 'bold';
    }

    if(e.code === 'Space' && editorText.trim() === '**'){
      return 'redline'
    }

    if(e.code === 'Space' && editorText.trim() === '***'){
      return 'underline'
    }

    if(e.code === 'Space' && editorText.trim() === '#'){
      return 'heading'
    }

    return getDefaultKeyBinding(e);
  }

  useEffect(() => {
    if(localData === 'save'){
      const editorData = editorState.getCurrentContent();
      const toRawData = convertToRaw(editorData);
      console.log('saving: ',toRawData);
      savehandler(JSON.stringify(toRawData,null,2))
      console.log('calling',localData);
    }
  },[localData])


  useEffect(() => {
    const editorData = localStorage.getItem('editor-text');
    
    if(editorData){
      const toContentData = JSON.parse(editorData);
      const contentState = convertFromRaw(toContentData);
      console.log(contentState);
      setEditorState(EditorState.createWithContent(contentState));
    }
  },[])
  
  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    setEditorText(currentBlock.getText());
  })

  return (
    <div className='border-2 border-gray-300 rounded-sm min-h-96 mt-10 mx-4 cursor-text p-2 focus-within:border-gray-400' onClick={focusEditor}>
      <Editor
        ref={editor}
        customStyleMap={colorStyleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBinding }
        onChange={setEditorState}
        placeholder='try * + space'
      />
    </div>
  );
}

export default EditorWindow;
