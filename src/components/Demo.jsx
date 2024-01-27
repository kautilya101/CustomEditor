import React, { useState } from 'react';
import Button from './Button';
import Title from './Title';
import EditorWindow from './EditorWindow';

const Demo = () => {

  const [localData,setLocalData] = useState('');

  const setDataToLocalStorage = (data) => {
    localStorage.setItem('editor-text',data);
  }

  return (
    <div className='mx-20 p-5'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex-2 p-3 m-auto'>
          <Title heading={'Demo Editor By Kautilya'}/>
        </div>
        <div className='p-3 mr-2'>
          <Button savehandler={setLocalData} />
        </div>
      </div>
      <div>
        <EditorWindow savehandler={setDataToLocalStorage} localData={localData}   />
      </div>
    </div>
  );
}

export default Demo;
