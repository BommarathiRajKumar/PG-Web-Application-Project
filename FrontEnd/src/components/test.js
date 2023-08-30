import React, { useState } from 'react';

function Test() {
  const [inputValue, setInputValue] = useState('not selected');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div> 
      <input value={inputValue} onChange={handleInputChange} placeholder="Type here" />
    </div>
  );
}


export default Test;
