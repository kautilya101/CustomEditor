import React from 'react';
import '../App.css'

const Button = ({savehandler}) => {

  return (
    <div>
      <button className='px-5 py-0.5 ml-3 border-2 border-black font-semibold button-shadow rounded-sm' onClick={() => savehandler('save')}>
      Save
      </button>
    </div>
  );
}

export default Button;
