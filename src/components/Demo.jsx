import React from 'react';
import Button from './Button';
import Title from './Title';
import EditorWindow from './EditorWindow';

const Demo = () => {
  return (
    <div className='mx-20 p-5'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex-2 p-3 m-auto'>
          <Title heading={'Demo Editor By Kautilya'}/>
        </div>
        <div className='p-3 mr-2'>
          <Button/>
        </div>
      </div>
      <div className=''>
        <EditorWindow/>
      </div>
    </div>
  );
}

export default Demo;
